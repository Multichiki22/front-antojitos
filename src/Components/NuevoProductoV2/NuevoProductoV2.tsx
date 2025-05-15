import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, Grid, MenuItem, Paper, SxProps, TextField, Typography } from '@mui/material';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import categoriaService from '../../Services/CategoriasService.ts';
import productService from '../../Services/ProductService.ts';
import { useFormik } from 'formik';
import Categoria from '../../entities/categorias.ts';
import { initialProductValues, nuevoProductoValidationSchema } from '../../schemas/productSchema.ts';

const NuevoProductoV2 = () => {
  const formControlStyles: SxProps = {
    width: '100%',
    px: { xs: 1, sm: 2 },
    py: 1,
  };

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { showError, showSuccess } = useSnackBar();

  useEffect(() => {
    setLoading(true);
    categoriaService
      .getAll()
      .then((result) => {
        setCategories(result);
        showSuccess('Categorías cargadas exitosamente');
      })
      .catch((error) => {
        showError('Algo salió mal obteniendo las categorías: ' + error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Configuración de Formik
  const formik = useFormik({
    initialValues: initialProductValues,
    validationSchema: nuevoProductoValidationSchema,
    onSubmit: (values) => {
      console.log("Values",values);
      
      handleCreateProduct(values);
    },
  });

  const handleCreateProduct = (data) => {
    setLoading(true);
    productService
      .crearProducto(data)
      .then((result) => {
        showSuccess('Producto creado con éxito');
        formik.resetForm();
      })
      .catch((error) => {
        showError('Algo salió mal creando el producto: ' + error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Usar valores de formik para los cálculos
  const calculateResults = () => {
    const { cantidadDePaquetes, cantidadPorPaquete, costoPorPaquete, precioDeVenta } = formik.values;
    const costPerUnit = costoPorPaquete / cantidadPorPaquete || 0;
    const totalCost = cantidadDePaquetes * costoPorPaquete || 0;
    const totalUnits = cantidadDePaquetes * cantidadPorPaquete || 0;
    const profitPerUnit = precioDeVenta - costPerUnit || 0;
    const profitPercentage = ((precioDeVenta - costPerUnit) / precioDeVenta) * 100 || 0;

    return { costPerUnit, totalCost, totalUnits, profitPerUnit, profitPercentage };
  };

  const { costPerUnit, totalCost, totalUnits, profitPerUnit, profitPercentage } = calculateResults();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom sx={{ pb: 1 }}>
          Nuevo Producto
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl variant="filled" sx={formControlStyles}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del producto"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cantidad de paquetes"
                  name="cantidadDePaquetes"
                  type="number"
                  value={formik.values.cantidadDePaquetes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.cantidadDePaquetes && Boolean(formik.errors.cantidadDePaquetes)}
                  helperText={formik.touched.cantidadDePaquetes && formik.errors.cantidadDePaquetes}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unidades por paquete"
                  name="cantidadPorPaquete"
                  type="number"
                  value={formik.values.cantidadPorPaquete}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.cantidadPorPaquete && Boolean(formik.errors.cantidadPorPaquete)}
                  helperText={formik.touched.cantidadPorPaquete && formik.errors.cantidadPorPaquete}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Costo por paquete"
                  name="costoPorPaquete"
                  type="number"
                  value={formik.values.costoPorPaquete}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.costoPorPaquete && Boolean(formik.errors.costoPorPaquete)}
                  helperText={formik.touched.costoPorPaquete && formik.errors.costoPorPaquete}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio de venta"
                  name="precioDeVenta"
                  type="number"
                  value={formik.values.precioDeVenta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.precioDeVenta && Boolean(formik.errors.precioDeVenta)}
                  helperText={formik.touched.precioDeVenta && formik.errors.precioDeVenta}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Categoría"
                  name="categoria"
                  value={formik.values.categoria}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  error={formik.touched.categoria && Boolean(formik.errors.categoria)}
                  helperText={formik.touched.categoria && formik.errors.categoria}
                >
                  <MenuItem value="">
                    <em>Seleccione una categoría</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.nombre}>
                      {category.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Paper elevation={8} sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom sx={{ pb: 2 }}>
                Resumen
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">Costo por unidad:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${costPerUnit.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Costo total de entrada:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${totalCost.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Total unidades a entrar:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {totalUnits}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Ganancia por unidad:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ${profitPerUnit.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Porcentaje de ganancia:</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {profitPercentage.toFixed(2)}%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Box mt={4}>
              <Button variant="contained" color="primary" fullWidth size="large" type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Producto'}
              </Button>
            </Box>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default NuevoProductoV2;
