import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';


const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    packageCount: 0,
    unitsPerPackage: 0,
    packageCost: 0,
    sellingPrice: 0,
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateResults = () => {
    const { packageCount, unitsPerPackage, packageCost, sellingPrice } = formData;
    const costPerUnit = packageCost / unitsPerPackage || 0;
    const totalCost = packageCount * packageCost || 0;
    const totalUnits = packageCount * unitsPerPackage || 0;
    const profitPerUnit = sellingPrice - costPerUnit || 0;
    const profitPercentage = ((sellingPrice - costPerUnit) / sellingPrice) * 100 || 0;

    return { costPerUnit, totalCost, totalUnits, profitPerUnit, profitPercentage };
  };

  const { costPerUnit, totalCost, totalUnits, profitPerUnit, profitPercentage } = calculateResults();

  return (

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, bgcolor: 'background.default' }}>
          <Typography variant="h4" gutterBottom sx={{pb: 1}}>
            Nuevo Producto
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del producto"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cantidad de paquetes"
                name="packageCount"
                type="number"
                value={formData.packageCount}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unidades por paquete"
                name="unitsPerPackage"
                type="number"
                value={formData.unitsPerPackage}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Costo por paquete"
                name="packageCost"
                type="number"
                value={formData.packageCost}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio de venta"
                name="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Categoría"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>Seleccione una categoría</em>
                </MenuItem>
                {/* Add category options here */}
              </TextField>
            </Grid>
          </Grid>

          <Paper elevation={8} sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
            <Typography variant="h6" gutterBottom sx={{pb: 2}}>
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
            <Button variant="contained" color="primary" fullWidth size="large">
              Crear Producto
            </Button>
          </Box>
        </Paper>
      </Container>

  );
};

export default ProductForm;