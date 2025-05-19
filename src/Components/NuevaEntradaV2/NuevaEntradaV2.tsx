import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import Cargando from '../Cargando/Cargando';
import formatNumbers from '../../utilities/formatNumbers.ts';
import { initialValues as initialNuevaEntradaValues, nuevaEntradaValidationSchema } from '../../schemas/entradaProductoSchema.ts';
import Producto from '../../entities/producto.ts';
import productService from '../../Services/ProductService.ts';
import EntradaFormValues from '../../entities/entradaFormValues.ts';
import entradasService from '../../Services/EntradasService.ts';


const NuevaEntradaV2: React.FC = () => {
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState<boolean>(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loadingProductos, setLoadingProductos] = useState<boolean>(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const formControlStyles: SxProps = {
    width: '100%',
    px: { xs: 1, sm: 2 },
    py: 1,
  };



  const formik = useFormik<EntradaFormValues>({
    initialValues: initialNuevaEntradaValues,
    validationSchema: nuevaEntradaValidationSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });


  const getProductos = async () => {
    setLoadingProductos(true);
    try {
      const response = await productService.getVigentes()
      setProductos(response);
    } catch (error: any) {
      showError(`Error al cargar productos: ${error.message}`);
    } finally {
      setLoadingProductos(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);


  const handleSubmit = async (values: EntradaFormValues) => {
    setLoading(true);
    try {
      await entradasService.crearNuevaEntrada(values);
      showSuccess('Entrada generada exitosamente');
      formik.resetForm();
      setProductoSeleccionado(null);
    } catch (error: any) {
      showError(error.response?.data?.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };


  const calculateResults = () => {
    const { cantidadPorPaquete, costoPorPaquete, cantidadDePaquetes, nuevoPrecio } = formik.values;
    
    const costoUnidad = cantidadPorPaquete > 0 ? costoPorPaquete / cantidadPorPaquete : 0;
    const valorEntrada = costoPorPaquete * cantidadDePaquetes;
    const cantidadTotalAEntrar = cantidadDePaquetes * cantidadPorPaquete;
    const gananciaUnidad = nuevoPrecio - costoUnidad;
    const porcentajeGanancia = nuevoPrecio > 0 ? 
      Math.round(((nuevoPrecio - costoUnidad) / nuevoPrecio) * 100) : 0;

    return {
      costoUnidad,
      valorEntrada,
      cantidadTotalAEntrar,
      gananciaUnidad,
      porcentajeGanancia,
    };
  };

  const { costoUnidad, valorEntrada, cantidadTotalAEntrar, gananciaUnidad, porcentajeGanancia } = calculateResults();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom sx={{ pb: 2 }}>
          Nueva Entrada
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Autocomplete para productos */}
            <Grid item xs={12}>
              <FormControl sx={formControlStyles}>
                <Autocomplete
                  loading={loadingProductos}
                  options={productos}
                  getOptionLabel={(option) => option.nombre}
                  value={productos?.find(p => p.nombre === formik.values.nombreProducto) || null}
                  onChange={(_, newValue) => {
                    formik.setFieldValue('nombreProducto', newValue?.nombre || '');
                    setProductoSeleccionado(newValue);
                  }}
                  onBlur={() => formik.setFieldTouched('nombreProducto', true)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nombre del producto a entrar"
                      variant="outlined"
                      error={formik.touched.nombreProducto && Boolean(formik.errors.nombreProducto)}
                      helperText={formik.touched.nombreProducto && formik.errors.nombreProducto}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Campos de entrada */}
            <Grid item xs={12} sm={4}>
              <FormControl sx={formControlStyles}>
                <TextField
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
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl sx={formControlStyles}>
                <TextField
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
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl sx={formControlStyles}>
                <TextField
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
              </FormControl>
            </Grid>

            {/* Resumen de cálculos automáticos */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: 'background.default' }}>
                <Typography variant="h6" gutterBottom>
                  Resumen de Entrada
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Valor de la entrada:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${formatNumbers(valorEntrada)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Costo de cada unidad:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${formatNumbers(costoUnidad)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Cantidad total a entrar:</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {cantidadTotalAEntrar} unidades
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2">Precio del producto:</Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary.main">
                      ${formatNumbers(productoSeleccionado?.precioDeVenta || 0)}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Switch para cambio de precio */}
            <Grid item xs={12}>
              <FormControl sx={formControlStyles}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.cambioDePrecio}
                      onChange={(event) => {
                        formik.setFieldValue('cambioDePrecio', event.target.checked);
                        if (!event.target.checked) {
                          formik.setFieldValue('nuevoPrecio', 0);
                        }
                      }}
                      name="cambioDePrecio"
                    />
                  }
                  label="Cambio de precio"
                />
              </FormControl>
            </Grid>

            {/* Campos de cambio de precio condicionales */}
            {formik.values.cambioDePrecio && (
              <>
                <Grid item xs={12}>
                  <FormControl sx={formControlStyles}>
                    <TextField
                      label="Nuevo precio de venta del producto"
                      name="nuevoPrecio"
                      type="number"
                      value={formik.values.nuevoPrecio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      error={formik.touched.nuevoPrecio && Boolean(formik.errors.nuevoPrecio)}
                      helperText={formik.touched.nuevoPrecio && formik.errors.nuevoPrecio}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.default' }}>
                    <Typography variant="h6" gutterBottom>
                      Análisis de Rentabilidad
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2">Ganancia por unidad:</Typography>
                        <Typography variant="body1" fontWeight="bold" color="success.main">
                          ${formatNumbers(gananciaUnidad)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Porcentaje de ganancia:</Typography>
                        <Typography variant="body1" fontWeight="bold" color="success.main">
                          {formatNumbers(porcentajeGanancia)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </>
            )}

            {/* Botón de envío */}
            <Grid item xs={12}>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  disabled={loading}
                
                >
                  {loading ? <Cargando /> : 'Generar Entrada'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default NuevaEntradaV2;