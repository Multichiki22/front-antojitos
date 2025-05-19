import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import entradasService from '../../Services/EntradasService.ts';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import RowEntradasProducto from './RowEntradasProducto.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import Cargando from '../Cargando/Cargando.jsx';
import theme from '../../theme/theme.js';
import { productoOriginal } from '../../types/productoType.ts';
import productService from '../../Services/ProductService.ts';
import ProductSearch from '../ProductSearch/ProductSearch.tsx';

const EntradasProducto = () => {
  const [entradas, setEntradas] = useState([]);
  const [allProducts, setAllProducts] = useState<productoOriginal[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<productoOriginal | null>(null);
  const navigate = useNavigate();
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const productId = id || '0';

  const fetchData = async () => {
    if (id == '0') {
      return;
    }
    setLoading(true);
    entradasService
      .getHistoricoProductos(productId)
      .then((result) => {
        setEntradas(result);
         console.log('%c Entradas cargads con exito ', 'color:#2e7d32');
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchProducts = () => {
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
    fetchProducts();
    fetchData();
  }, []);

  const handleProductChange = (product: productoOriginal | null) => {
    setSelectedProduct(product);
    if (product) {
      navigate(`/entradasProducto/${product.id}`);
    }
  };

  return (
    <>
      <Container
        sx={{ backgroundColor: theme.palette.background.default, color: 'white', borderRadius: 2, mt: 2, pb: 2, px: { xs: 0, sm: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pl: 0, width: '100%' }}>
          <Grid container sx={{ md: { px: 6 } }}>
            <Grid item xs={12} sm={5} sx={{ px: { xs: 2, sm: 0 }, display: 'flex', alignContent: 'center', py: 2 }}>
              <Typography sx={{ flex: '100%' }} variant="h5" id="title" component="div">
                Entradas del producto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ px: { xs: 2, sm: 0 }, display: 'flex', alignContent: 'center', py: 2 }}>
              <ProductSearch
                products={allProducts}
                value={selectedProduct}
                onChange={(event, newValue) => handleProductChange(newValue)}
                loading={loading}
              />
            </Grid>
            <Grid item xs={4} sm={2} sx={{ display: 'flex', alignContent: 'center', py: {xs: 0, sm: 2 },px:{xs:2,sm:0}, justifyContent: { xs: 'start', sm: 'end' } }}>
              <Button variant="contained" onClick={fetchData} disabled={loading} sx={{ minWidth: '100px' }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {loading ? (
          <Cargando />
        ) : (
          <>
            {entradas.length > 0 ? (
              <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Producto</TableCell>
                      <TableCell>Total entrados</TableCell>
                      <TableCell>Costo individual</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entradas.map((entrada) => (
                      <RowEntradasProducto entrada={entrada} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h4">No se encontro ese producto</Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};
export default EntradasProducto;
