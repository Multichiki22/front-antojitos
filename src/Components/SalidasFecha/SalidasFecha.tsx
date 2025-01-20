
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
import salidasService from '../../Services/SalidasService.ts';
import dayjs from 'dayjs';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import { useParams, useNavigate } from 'react-router-dom';
import theme from '../../theme/theme.js';
import Cargando from '../Cargando/Cargando.jsx';
import RowSalidasFecha from './RowsSalidaFecha.tsx';
import { salidasType } from '../../types/salidasType.ts';

const SalidasFecha = () => {
  const [salidas, setSalidas] = useState<salidasType[]>([]);
  const [fechaBusqueda, setFechaBusqueda] = useState(dayjs());
  const { showError, showSuccess } = useSnackBar();
  const [loading, setLoading] = useState(false);
  const { fecha } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    salidasService
      .getHistoricoFecha(fechaBusqueda.format('YYYY-MM-DD'))
      .then((result) => {
        setSalidas(result);
        showSuccess('Success');
      })
      .catch((error) => {
        showError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDateChange = (date) => {
    navigate(`/salidasFecha/${date}`);
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
              Histórico salidas
            </Typography>
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
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00e4f3',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'aqua',
              },
            }}
          />
        </Box>
        {loading ? (
          <Cargando />
        ) : (
          <>
            {salidas.length > 0 ? (
              <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Producto</TableCell>
                      <TableCell>Cantidad salida</TableCell>
                      <TableCell>Valor salida</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Producto</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salidas.map((salida) => (
                      <RowSalidasFecha key={salida.id} salida={salida} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6">
                  <u>No se encontraron salidas ese día</u>
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default SalidasFecha;