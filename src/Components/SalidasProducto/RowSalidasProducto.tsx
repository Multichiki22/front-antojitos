import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EventNoteIcon from '@mui/icons-material/EventNote';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import formatNumbers from '../../utilities/formatNumbers.ts';
import { salidasType } from '../../types/salidasType';


function RowSalidasProducto(props: { salida: salidasType }) {
  const { salida } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {salida.producto.nombre}
        </TableCell>
        <TableCell>{salida.cantidad + ' Und'}</TableCell>
        <TableCell>{formatNumbers(salida.valorSalida) + ' $'}</TableCell>
        <TableCell>{new Date(salida.fecha).toLocaleString()}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              const fechaSalida = dayjs(salida.fecha).format('YYYY-MM-DD');
              navigate(`/salidasFecha/${fechaSalida}`);
            }}
          >
            <EventNoteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Información adicional
              </Typography>

              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>ID salida</TableCell>
                    <TableCell>Motivo</TableCell>
                    <TableCell>Ganancia/Pérdida</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Nota</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{salida.id}</TableCell>
                    <TableCell>{salida.motivo.nombre}</TableCell>
                    <TableCell>{formatNumbers(salida.gananciaOPerdida) + ' $'}</TableCell>
                    <TableCell>{salida.usuario}</TableCell>
                    <TableCell>{salida.nota || '-'}</TableCell>
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

export default RowSalidasProducto;