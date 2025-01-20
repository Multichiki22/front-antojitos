import React from 'react';
import { Autocomplete, TextField, Box, Typography, FormControl } from '@mui/material';

const ProductSearch = ({ products, value, onChange, loading }) => {
  const filterOptions = (options, { inputValue }) => {
    const searchTerm = inputValue.toLowerCase().trim();

    if (!searchTerm) return options;

    if (!isNaN(searchTerm)) {
      const exactMatch = options.filter((option) => option.id.toString() === searchTerm);
      if (exactMatch.length > 0) return exactMatch;

      return options.filter((option) => option.id.toString().includes(searchTerm));
    }

    return options.filter((option) => option.nombre.toLowerCase().includes(searchTerm) || option.id.toString().includes(searchTerm));
  };

  return (
    <FormControl sx={{ flex: 1 }}>
      <Autocomplete
        options={products}
        getOptionLabel={(option) => option.nombre}
        filterOptions={filterOptions}
        value={value}
        onChange={onChange}
        loading={loading}
        size='small'
        renderOption={(props, option) => (
          <Box component="li" {...props}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Typography color="text.primary">{option.nombre}</Typography>
            <Typography color="text.secondary" sx={{ ml: 2 }}>
              ID: {option.id}
            </Typography>
          </Box>
        </Box>
        )}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Buscar producto"/>}
      />
    </FormControl>
  );
};

export default ProductSearch;
