import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import formatNumbers from '../../utilities/formatNumbers.js';

const hasChangedValidation = ( oldValue, newValue, type)=>{
if (type !== 'price'){
   return oldValue !== newValue
}
return formatNumbers(oldValue) !== formatNumbers(newValue)
};

const CompareValues = ({ label, oldValue, newValue, type }) => {
 const hasChanged = hasChangedValidation(oldValue, newValue, type)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', width: '25%',  minWidth: '150px' }}>{label}</Typography>
      <Typography variant="body1" sx={{ color: hasChanged ? 'orange' : 'inherit', width: '35%' }}>
        {type === 'price' ? "$ " + formatNumbers(oldValue) : oldValue}
      </Typography>
      <Typography variant="body1" sx={{ color: hasChanged ? 'green' : 'inherit', width: '35%' }}>
        {type === 'price' ?  "$ " +  formatNumbers(newValue) : newValue}
      </Typography>
    </Box>
  );
};

const ConfirmationDialog = ({ open, onClose, onConfirm, oldValues, newValues }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{}}>
      <DialogTitle>Confirmar Actualización</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ width: '25%',  minWidth: '150px'}}></Typography>
          <Typography variant="subtitle1" sx={{ width: '35%' , fontWeight: "bold" }}>Valor Anterior</Typography>
          <Typography variant="subtitle1" sx={{ width: '35%', fontWeight: "bold"  }}>Valor Nuevo</Typography>
        </Box>
        <CompareValues label="Nombre" oldValue={oldValues?.nombre} newValue={newValues?.nombre} type={"text"} />
        <CompareValues label="Cantidad" oldValue={oldValues?.cantidad} newValue={newValues?.cantidad} type={"number"} />
        <CompareValues label="Precio de Venta" oldValue={oldValues?.precioDeVenta} newValue={newValues?.precioDeVenta} type={"price"} />
      </DialogContent>
      <DialogActions>
      <Button onClick={onConfirm} color="primary">
          Aceptar
        </Button>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;