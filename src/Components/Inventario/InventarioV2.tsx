import React, { useState, useEffect, memo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSnackBar } from '../../Hooks/useSnackBarHook.tsx';
import productService from '../../Services/ProductService.ts';
import ActionButtons from '../ButtonSelection/ActionButtons.tsx';
import formatNumbers from '../../utilities/formatNumbers.ts';
import Spinner from 'react-bootstrap/esm/Spinner';

interface Data {
  id: number;
  nombre: string;
  cantidad: number;
  precioDeVenta: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  width?: string;
}

const headCells: readonly HeadCell[] = [
  { id: 'id', label: 'Id', width: '5px', align: 'left' },
  { id: 'nombre', label: 'Nombre', width: '250px', align: 'left' },
  { id: 'cantidad', label: 'Cantidad', width: '100px' },
  { id: 'precioDeVenta', label: 'Precio de Venta', width: '200px' },
  { id: 'id', label: 'Acciones', width: 'fit-content', align: 'center' },
];

type Order = 'asc' | 'desc';

function comparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy];
  const bValue = b[orderBy];
  
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    // Usando localeCompare para un mejor manejo de strings y caracteres especiales
    return aValue.toLowerCase().localeCompare(bValue.toLowerCase(), 'es', { 
      sensitivity: 'base',
      ignorePunctuation: true 
    });
  }
  
  // Para valores no string
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => comparator(a, b, orderBy) : (a, b) => -comparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  onSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onSort: onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ maxWidth: headCell.width }}
          >
            {/* Si es la columna de acciones, solo mostrar el texto */}
            {headCell.label === 'Acciones' ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{ display: 'flex' }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const InventarioV2Memo = memo(function InventarioV2() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('cantidad');
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [multiButton, setMultiButton] = useState(false);
  const { showError, showSuccess } = useSnackBar();
  const aprovedRoles = ['SuperAdmin', 'Admin'];

  const fetchData = async () => {
    setLoading(true);
    productService
      .getProductosActuales()
      .then((result) => {
        setData(result);
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
    const role = localStorage.getItem('role');
    if (role) {
      if (aprovedRoles.includes(role)) {
        setMultiButton(true);
      }
    }
    fetchData();
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(() => stableSort(data, getComparator(order, orderBy)), [order, orderBy, data]);

  return (
    <Box sx={{ overflow: 'auto', width: '100%', display: 'flex', justifyContent: 'center', py: 2, px: 0 }}>
      <Paper sx={{ overflow: 'auto', minWidth: '90%' }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%', color: 'black ' }} variant="h6" id="tableTitle" component="div">
            Productos
          </Typography>
          {/* Place here the searchBar */}
        </Toolbar>
        {loading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table aria-labelledby="tableTitle" size="small" sx={{ minWidth: '100%' }}>
              <EnhancedTableHead order={order} orderBy={orderBy} onSort={handleRequestSort} />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.id} sx={{ cursor: 'pointer' }}>
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.id}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        {row.cantidad}
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        $ {formatNumbers(row.precioDeVenta)}
                      </TableCell>
                      <TableCell align="center" padding="normal">
                        <ActionButtons productId={row.id} multiButton={multiButton}></ActionButtons>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
});

export default InventarioV2Memo;
