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
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import RowEntradasFecha from './RowEntradasFecha.tsx';
import entradasService from '../../Services/EntradasService.ts';
import dayjs from 'dayjs';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import { useParams, useNavigate } from 'react-router-dom';
import theme from '../../theme/theme.js';
import Cargando from '../Cargando/Cargando.jsx';

const EntradasFecha = () => {
  const [entradas, setEntradas] = useState([]);
  const [fechaBusqueda, setFechaBusqueda] = useState(dayjs());
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const { fecha } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    entradasService
      .getHistoricoFecha(fechaBusqueda.format('YYYY-MM-DD'))
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

  const handleDateChange = (date) => {
    navigate(`/entradasFecha/${date}`);
  };

  useEffect(() => {
    if (fecha !== 'undefined') {
      if (dayjs(fecha, 'YYYY-MM-DD').isValid()) {
        setFechaBusqueda(dayjs(fecha));
      }
    }
  }, [fecha]);

  useEffect(() => {
    fetchData();
  }, [fechaBusqueda]);

  return (
    <>
      <Container
        sx={{ backgroundColor: theme.palette.background.default, color: 'white', borderRadius: 2, mt: 2, pb: 2, px: { xs: 0, sm: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, gap: 1 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography sx={{ flex: '1 1 100%' }} variant="h5" id="title" component="div">
              Historico entradas
            </Typography>
            {/* Place here the seatchBar */}
          </Toolbar>
          <DatePicker
            label="Fecha"
            format="YYYY-MM-DD"
            value={fechaBusqueda}
            onChange={handleDateChange}
            maxDate={dayjs()}
            sx={{
              borderColor: '#2196f3',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white', // Cambia el color del icono del calendario a blanco
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00e4f3', // Cambia el color del borde a blanco
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'aqua', // Cambia el color del borde al pasar el mouse a blanco
              },
            }}
          />
          {/* <Button sx={{ height: '2.4rem' }} variant="contained" onClick={fetchData}>
          {loading ? <CircularProgress size={'1.5rem'} color="secondary" /> : 'Buscar'}
        </Button> */}
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
                      <TableCell>Producto</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entradas.map((entrada) => (
                      <RowEntradasFecha entrada={entrada} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6">
                  <u>No se encontraon entradas ese dia</u>
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};
export default EntradasFecha;
