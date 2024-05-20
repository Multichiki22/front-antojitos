import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import entradasService from '../../Services/EntradasService.ts';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import RowEntradasProducto from './RowEntradasProducto.tsx';
import { useParams } from 'react-router-dom';
import Cargando from '../Cargando/Cargando.jsx';
import theme from '../../theme/theme.js';

const EntradasProducto = () => {
  const [entradas, setEntradas] = useState([]);
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const productId = id || '1';

  const fetchData = async () => {
    setLoading(true);
    entradasService
      .getHistoricoProductos(productId)
      .then((result) => {
        setEntradas(result);
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

  return (
    <>
      <Container
        sx={{ backgroundColor: theme.palette.background.default, color: 'white', borderRadius: 2, mt: 2, pb: 2, px: { xs: 0, sm: 2 } }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%', py: 3 }} variant="h5" id="title" component="div">
            Entradas del producto:
          </Typography>
        </Toolbar>
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
                      <TableCell>Entradas producto</TableCell>
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
