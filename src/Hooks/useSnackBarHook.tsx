import { useContext } from 'react';
import { SnackBarContext, SnackBarContextType } from '../Providers/SnackBarProvider.tsx';

export const useSnackBar = (): SnackBarContextType => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBar debe usarse dentro de un SnackBarProvider');
  }
  return context;
};