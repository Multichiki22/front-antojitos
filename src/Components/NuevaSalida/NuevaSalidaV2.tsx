import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import productService from '../../Services/ProductService.ts';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import salidasHoyService from '../../Services/SalidasService.ts';
import formatNumbers from '../../utilities/formatNumbers.js';
import theme from '../../theme/theme.js';
import Cargando from '../Cargando/Cargando.jsx';

interface Productos {
  nombre: string;
  precioDeVenta: number;
  categoria: {
    id: number;
    nombre: string;
  };
  id: number;
  linkFoto: string;
  cantidad: number;
}

const salidaDefault = {
  nombreProducto: '',
  cantidadSaliente: '',
  motivo: 'Venta',
  nota: '',
};

const NuevaSalidaV2 = () => {
  const { showError, showSuccess } = useSnackBar();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Productos[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Productos | null>(null);

  const fetchData = () => {
    setLoading(true);
    productService
      .getProductosActuales()
      .then((result) => {
        setAllProducts(result);
        showSuccess('Success');
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

  useEffect(() => {
    if (id !== undefined && allProducts.length > 0) {
      const productoEncontrado = allProducts.find((producto) => producto.id.toString() === id);
      if (productoEncontrado !== undefined) {
        formik.setFieldValue('nombreProducto', productoEncontrado.nombre);
        setSelectedProduct(productoEncontrado);
      }
    }
  }, [id, allProducts]);

  const validationSchema = Yup.object().shape({
    nombreProducto: Yup.string()
      .required('El nombre del producto es requerido')
      .oneOf(
        allProducts.map((product) => product.nombre),
        'El producto debe estar en la lista de productos'
      ),
    cantidadSaliente: Yup.number().required('La cantidad es requerida').min(1, 'La cantidad debe ser mayor a 0'),
  });

  const formik = useFormik({
    initialValues: salidaDefault,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      salidasHoyService
        .crearSalida(values)
        .then((result) => {
          showSuccess('Salida creada');
          setSelectedProduct(null);
          formik.resetForm();
        })
        .catch((error) => {
          showError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleAutocompleteChange = (producto: Productos | null) => {
    if (producto == null) {
      formik.setFieldValue('nombreProducto', '');
    } else {
      formik.setFieldValue('nombreProducto', producto.nombre);
    }
    setSelectedProduct(producto);
  };

  const costoTotal = () => {
    return parseInt(formik.values.cantidadSaliente) * (selectedProduct?.precioDeVenta ? selectedProduct?.precioDeVenta : 0);
  };

  const formControlStyles: SxProps = {
    width: '100%',
    px: { xs: 1, sm: 2 },
    py: 1,
  };

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
            Nueva salida
          </Typography>
          {/* Place here the searchBar */}
        </Toolbar>
        <form onSubmit={formik.handleSubmit}>
          <Grid container sx={{ pb: 2 }}>
            <Grid item xs={12} sm={12}>
              <FormControl variant="filled" sx={formControlStyles}>
                <Autocomplete
                  disablePortal
                  id="AutoCompleteProduct"
                  contentEditable
                  options={allProducts}
                  getOptionLabel={(option) => option.nombre}
                  value={selectedProduct}
                  onChange={(event: any, newValue: any) => {
                    handleAutocompleteChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      {...params}
                      label="Producto:"
                      InputProps={{
                        ...params.InputProps,
                      }}
                      error={formik.touched.nombreProducto && Boolean(formik.errors.nombreProducto)}
                      helperText={formik.touched.nombreProducto && formik.errors.nombreProducto}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={5} sm={4}>
              <FormControl variant="filled" sx={formControlStyles} id="motivo">
                <InputLabel id="motivo-salida" sx={{ px: 2, py: 1 }}>
                  Motivo salida:
                </InputLabel>
                <Select
                  labelId="motivo-salida"
                  name="motivo"
                  value={formik.values.motivo}
                  onChange={formik.handleChange}
                  defaultValue="Venta"
                >
                  <MenuItem value={'Venta'}>Venta</MenuItem>
                  <MenuItem value={'Perdida'}>Perdida</MenuItem>
                  <MenuItem value={'Robo'}>Robo</MenuItem>
                  <MenuItem value={'Daño'}>Daño</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={7} sm={8}>
              <FormControl sx={formControlStyles}>
                <TextField
                  id="notas"
                  label="Información adicional"
                  placeholder="Información adicional:"
                  variant="filled"
                  value={formik.values.nota}
                  name="nota"
                  onChange={formik.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl sx={formControlStyles}>
                <TextField
                  label="Cantidad a salir:"
                  id="cantidadSaliente"
                  name="cantidadSaliente"
                  value={formik.values.cantidadSaliente}
                  onChange={formik.handleChange}
                  variant="filled"
                  type="number"
                  error={formik.touched.cantidadSaliente && Boolean(formik.errors.cantidadSaliente)}
                  helperText={formik.touched.cantidadSaliente && formik.errors.cantidadSaliente}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl variant="filled" sx={formControlStyles}>
                <InputLabel sx={{ px: 2, py: 1 }} shrink id="PrecioIndividual">
                  Precio Individual:
                </InputLabel>

                <TextField
                  variant="filled"
                  disabled
                  value={'$' + (formatNumbers(selectedProduct?.precioDeVenta) || '')}
                  InputProps={{
                    sx: {
                      '& .Mui-disabled': {
                        WebkitTextFillColor: theme.palette.grey[300],
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" sx={formControlStyles}>
                <InputLabel sx={{ px: 2, py: 1 }} shrink id="ValorTotalSalida">
                  Valor total salida:
                </InputLabel>
                <TextField
                  variant="filled"
                  disabled
                  value={'$ ' + formatNumbers(costoTotal())}
                  InputProps={{
                    sx: {
                      '& .Mui-disabled': {
                        WebkitTextFillColor: theme.palette.success.main,
                      },
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ px: 2, py: 1 }}>
                <Button variant="contained" type="submit">
                  {loading ? <Cargando /> : ' Generar salida'}
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default NuevaSalidaV2;
