import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [salidaInfo, setSalidaInfo] = useState(salidaDefault);

  const [allProducts, setAllProducts] = useState<Productos[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Productos | null>(null);

  const fetchData = () => {
    setLoading(true);
    productService
      .getProductosActuales()
      .then((result) => {
        setAllProducts(result);
        showSuccess('Succes');
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const crearSalida = () => {
    setLoading(true);
    salidasHoyService
      .crearSalida(salidaInfo)
      .then((result) => {
        showSuccess('Salida creada');
        setSelectedProduct(null);
        setSalidaInfo(salidaDefault);
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
        setSalidaInfo({ ...salidaInfo, nombreProducto: productoEncontrado.nombre });
        setSelectedProduct(productoEncontrado);
      }
    }
  }, [id, allProducts]);

  const handleAutocompleteChange = (producto: Productos | null) => {
    if (producto == null) setSalidaInfo({ ...salidaInfo, nombreProducto: '' });
    else setSalidaInfo({ ...salidaInfo, nombreProducto: producto.nombre });

    setSelectedProduct(producto);
  };

  const handleInputsChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setSalidaInfo({ ...salidaInfo, [key]: value });
  };

  const costoTotal = () => {
    return parseInt(salidaInfo.cantidadSaliente) * (selectedProduct?.precioDeVenta ? selectedProduct?.precioDeVenta : 0);
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
          <Typography sx={{ flex: '1 1 100%', pb:0 }} variant="h6" id="title" component="div">
            Nueva salida
          </Typography>
          {/* Place here the seatchBar */}
        </Toolbar>
        <Grid container sx={{ pb: 2 }}>
          <Grid item xs={12} sm={12}>
            <FormControl variant="filled" sx={formControlStyles}>
              <Autocomplete
                disablePortal
                id="AutoCompleteProduct"
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
                value={salidaInfo.motivo}
                onChange={(event) => {
                  handleInputsChange(event);
                }}
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
                label="Informacion adicional"
                placeholder="Informacion adicional:"
                variant="filled"
                value={salidaInfo.nota}
                name="nota"
                onChange={handleInputsChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl sx={formControlStyles}>
              <TextField
                label="Cantidad a salir:"
                id="cantidadSaliente"
                name="cantidadSaliente"
                value={salidaInfo.cantidadSaliente}
                onChange={(event) => {
                  handleInputsChange(event);
                }}
                variant="filled"
                type="number"
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
              <Button
                variant="contained"
                onClick={() => {
                  crearSalida();
                }}
              >
                {loading ? <Cargando /> : ' Generar salida'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NuevaSalidaV2;
