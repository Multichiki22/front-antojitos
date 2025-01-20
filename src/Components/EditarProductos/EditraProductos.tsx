import React, { useEffect, useState } from 'react';
import theme from '../../theme/theme';
import {
  Button,
  Container,
  FormControl,
  Grid,
  SxProps,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import productService from '../../Services/ProductService.ts';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import { useParams } from 'react-router-dom';
import { productoOriginal } from '../../types/productoType.ts';
import Cargando from '../Cargando/Cargando.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import extractNumberFromFormat from '../../utilities/extractNumbreFromFormat.ts';
import ConfirmationDialog from './ConfirmationDialog.tsx';

export default function EditarProductos() {
  const { id } = useParams();
  const [producto, setProducto] = useState<productoOriginal>();
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<productoOriginal>();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const fetchData = async () => {
    if (id == undefined) {
      showError('Id for product not found');
      return;
    }
    setLoading(true);
    productService
      .getProductosById(id)
      .then((result) => {
        setProducto(result);
        setUpdateInfo(result);
        formik.setValues(result);

        showSuccess('Succes');
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmUpdate = () => {
    setLoading(true);
    productService
      .updateProducto(formik.values)
      .then(async () => {
        showSuccess('Información actualizada');
        await fetchData()
        setOpenConfirmDialog(false);
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formControlStyles: SxProps = {
    width: '100%',
    px: { xs: 1, sm: 2 },
    py: 1,
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre del producto es requerido'),
    cantidad: Yup.number().required('La cantidad es requerida').min(0, 'La cantidad debe ser mayor o igual a 0'),
    precioDeVenta: Yup.number()
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string') {
          return extractNumberFromFormat(originalValue);
        }
        return value;
      })
      .typeError('El precio de venta debe ser un número válido')
      .required('El precio de venta es obligatorio')
      .min(0, 'El precio de venta debe ser mayor o igual a 0'),
  });

  const formik = useFormik({
    initialValues: updateInfo || {
      id: 0,
      nombre: '',
      cantidad: 0,
      precioDeVenta: 0,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setOpenConfirmDialog(true);
    },
  });

  const handleReset = ()=>{
    if (producto) formik.setValues(producto);
  }

  return (
    <>
      <Container sx={{ backgroundColor: theme.palette.background.default, color: 'white', borderRadius: 2, mt: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%', pb: 0 }} variant="h6" id="title" component="div">
            Editar producto
          </Typography>
        </Toolbar>
        <form onSubmit={formik.handleSubmit} onReset={handleReset}>
          <Grid container sx={{ pb: 2 }}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={formControlStyles}>
                <TextField
                  label="Nombre"
                  id="nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  variant="filled"
                  type="string"
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl sx={formControlStyles}>
                <TextField
                  label="Cantidad:"
                  id="cantidad"
                  name="cantidad"
                  value={formik.values.cantidad}
                  onChange={formik.handleChange}
                  variant="filled"
                  type="number"
                  error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                  helperText={formik.touched.cantidad && formik.errors.cantidad}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl sx={formControlStyles}>
                <TextField
                  label="Precio nuevo:"
                  id="precio"
                  name="precioDeVenta"
                  value={formik.values.precioDeVenta}
                  onChange={formik.handleChange}
                  variant="filled"
                  type="string"
                  error={formik.touched.precioDeVenta && Boolean(formik.errors.precioDeVenta)}
                  helperText={formik.touched.precioDeVenta && formik.errors.precioDeVenta}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ px: 2, py: 1 }}>
                <Button variant="contained" type="submit">
                  {loading ? <Cargando /> : 'Actualizar'}
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
              <FormControl sx={{ px: 2, py: 1 }}>
                <Button variant="contained" type="reset" color="error">
                  {loading ? <Cargando /> : 'Cancelar'}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ConfirmationDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmUpdate}
        oldValues={producto}
        newValues={formik.values}
      />
    </>
  );
}
