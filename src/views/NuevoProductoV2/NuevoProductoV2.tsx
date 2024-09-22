import React from 'react';
import { Box, Button, FormControl, Grid, InputAdornment, MenuItem, Select, SxProps, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import productService from '../../Services/ProductService.ts';
import categoriaService from '../../Services/CategoriasService.ts';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const inputStyles: SxProps = {
  px: 2,
  py: 1,
};

const initialValues = {
  nombreProducto: '',
  cantidadPaquetes: 0,
  unidadesPorPaquete: 0,
  costoPaquete: 0,
  precioVenta: 0,
  categoria: 'Seleccione una categoria',
};

const validationSchema = Yup.object().shape({
  nombreProducto: Yup.string().required('El nombre del producto es requerido'),
  cantidadPaquetes: Yup.number()
    .typeError('Debe ser un numero')
    .required('La cantidad de paquetes es requerida')
    .positive('La cantidad debe ser mayor que cero'),
  unidadesPorPaquete: Yup.number()
    .typeError('Debe ser un numero')
    .required('Las unidades por paquete son requeridas')
    .positive('Las unidades por paquete deben ser mayor que cero'),
  costoPaquete: Yup.number()
    .typeError('Debe ser un numero')
    .required('El costo por paquete es requerido')
    .positive('El costo por paquete debe ser mayor que cero'),
  precioVenta: Yup.number()
    .typeError('Debe ser un numero')
    .required('El precio de venta es requerido')
    .positive('El precio de venta debe ser mayor que cero'),
  categoria: Yup.string()
    .notOneOf(['Seleccione una categoria'], 'Por favor, seleccione una categoría')
    .required('La categoría es requerida'),
});

export default function NuevoProductoV2() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const intitlaRequests = async () => {
    productService
      .getVigentes()
      .then((productos) => setProductos(productos))
      .catch();
    categoriaService
      .getAll()
      .then((categorias) => setCategorias(categorias))
      .catch();
  };

  const createProduct = async () => {};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar el envío del formulario
      console.log(values);
    },
  });

  const { cantidadPaquetes, unidadesPorPaquete, costoPaquete, precioVenta } = formik.values;

  const calcularTotalUnidades = () => {
    return cantidadPaquetes * unidadesPorPaquete || 'Invalid';
  };

  const calcularCostoPorUnidad: any = () => {
    return costoPaquete / unidadesPorPaquete || 'Invalid';
  };

  const calcularCostoTotalEntrada = () => {
    return cantidadPaquetes * unidadesPorPaquete * calcularCostoPorUnidad() || 'Invalid';
  };

  const calcularPorcentajeGanancia = () => {
    return Math.round(((precioVenta - calcularCostoPorUnidad()) / precioVenta) * 100) || 'Invalid';
  };

  const calcularGananciaPorUnidad = () => {
    return precioVenta - calcularCostoPorUnidad() || 'Invalid';
  };

  useEffect(() => {
    intitlaRequests();
  }, []);

  return (
    <FormControl>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={inputStyles}>
            <TextField
              fullWidth
              id="nombreProducto"
              name="nombreProducto"
              label="Nombre del producto a crear"
              value={formik.values.nombreProducto}
              onChange={formik.handleChange}
              error={formik.touched.nombreProducto && Boolean(formik.errors.nombreProducto)}
              helperText={formik.touched.nombreProducto && formik.errors.nombreProducto}
            />
          </Grid>
          <Grid item xs={4} sx={inputStyles}>
            <TextField
              fullWidth
              id="cantidadPaquetes"
              name="cantidadPaquetes"
              label="Cantidad de paquetes"
              value={formik.values.cantidadPaquetes}
              onChange={formik.handleChange}
              error={formik.touched.cantidadPaquetes && Boolean(formik.errors.cantidadPaquetes)}
              helperText={formik.touched.cantidadPaquetes && formik.errors.cantidadPaquetes}
              InputProps={{
                endAdornment: <InputAdornment position="end">Paquetes</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4} sx={inputStyles}>
            <TextField
              fullWidth
              id="unidadesPorPaquete"
              name="unidadesPorPaquete"
              label="Unidades por paquete"
              value={formik.values.unidadesPorPaquete}
              onChange={formik.handleChange}
              error={formik.touched.unidadesPorPaquete && Boolean(formik.errors.unidadesPorPaquete)}
              helperText={formik.touched.unidadesPorPaquete && formik.errors.unidadesPorPaquete}
              InputProps={{
                endAdornment: <InputAdornment position="end">Unidades</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={4} sx={inputStyles}>
            <TextField
              fullWidth
              id="costoPaquete"
              name="costoPaquete"
              label="Costo por paquete"
              value={formik.values.costoPaquete}
              onChange={formik.handleChange}
              error={formik.touched.costoPaquete && Boolean(formik.errors.costoPaquete)}
              helperText={formik.touched.costoPaquete && formik.errors.costoPaquete}
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={inputStyles}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                id="precioVenta"
                name="precioVenta"
                label="Precio de venta"
                value={formik.values.precioVenta}
                onChange={formik.handleChange}
                error={formik.touched.precioVenta && Boolean(formik.errors.precioVenta)}
                helperText={formik.touched.precioVenta && formik.errors.precioVenta}
                InputProps={{
                  endAdornment: <InputAdornment position="end">$</InputAdornment>,
                }}
              />
              <Box>
                <Select
                  title="Seleccione una categoria"
                  name="categoria"
                  value={formik.values.categoria}
                  onChange={formik.handleChange}
                  error={formik.touched.categoria && Boolean(formik.errors.categoria)}
                >
                  <MenuItem disabled value="Seleccione una categoria">
                    Seleccione una categoria
                  </MenuItem>
                  {categorias.map((categoria, index) => (
                    <MenuItem value={categoria.nombre} key={index}>
                      {categoria.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sx={inputStyles}>
            <TextField
              label="Costo por unidad: "
              variant="standard"
              value={calcularCostoPorUnidad()}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />
            <TextField
              label="Costo total de la entrada: "
              variant="standard"
              value={calcularCostoTotalEntrada()}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={inputStyles}>
            <TextField
              label="Total unidades a entrar: "
              variant="standard"
              value={calcularTotalUnidades()}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">Unidades</InputAdornment>,
              }}
            />
            <TextField
              label="Ganancia por unidad: "
              variant="standard"
              value={calcularGananciaPorUnidad()}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />
            <TextField
              label="Porcentaje de ganancia: "
              variant="standard"
              value={calcularPorcentajeGanancia()}
              InputProps={{
                readOnly: true,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit">Crear Producto</Button>
      </form>
    </FormControl>
  );
}
