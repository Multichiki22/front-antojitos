import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import formatNumbers from '../../utilities/formatNumbers';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router-dom';

interface Entrada {
  id: number;
  producto: {
    id: string;
    nombre: string;
  };
  totalDeProuctosComprados: number;
  costoIndividual: number;
  costoTotalEntrada: number;
  gananciaIndividual: number;
  cantidadDePaquetes: number;
  cantidadPorPaquete: number;
  costoPorPaquete: number;
  cantidadRestante: number;
  fecha: string;
  usuario: string;
}

function RowEntradasFecha(props: { entrada: Entrada }) {
  const { entrada } = props;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ p: { xs: 0, sm: 2 } }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} sx={{ p: { xs: 1, sm: 2 } }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {entrada.producto.nombre}
        </TableCell>
        <TableCell>{entrada.totalDeProuctosComprados + ' Und'}</TableCell>
        <TableCell>{formatNumbers(entrada.costoIndividual) + ' $'}</TableCell>
        <TableCell>{new Date(entrada.fecha).toLocaleString()}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              navigate(`/entradasProducto/${entrada.producto.id}`);
            }}
          >
            <PlaylistAddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informacion adicional
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>id entrada</TableCell>
                    <TableCell>Cantidad de paquetes</TableCell>
                    <TableCell>Unidades por paquete</TableCell>
                    <TableCell>Costo por paquetes</TableCell>
                    <TableCell>Costo total entrada</TableCell>
                    <TableCell>Ganancia individual</TableCell>
                    <TableCell>Cantidad restante</TableCell>
                    <TableCell>Usuario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{entrada.id}</TableCell>
                    <TableCell>{entrada.cantidadDePaquetes + ' Paquetes'}</TableCell>
                    <TableCell>{entrada.cantidadPorPaquete + ' Und'}</TableCell>
                    <TableCell>{formatNumbers(entrada.costoPorPaquete) + ' $'}</TableCell>
                    <TableCell>{formatNumbers(entrada.costoTotalEntrada) + ' $'}</TableCell>
                    <TableCell>{formatNumbers(entrada.gananciaIndividual) + ' $'}</TableCell>
                    <TableCell>{entrada.cantidadRestante + ' Und'}</TableCell>
                    <TableCell>{entrada.usuario}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RowEntradasFecha;