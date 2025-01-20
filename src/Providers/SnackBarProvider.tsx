import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

export enum  SnackBarType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

interface SnackBarData {
  text: string;
  severity: SnackBarType;
}

export interface SnackBarContextType {
  showInfo: (text: string) => void;
  showError: (text: string) => void;
  showSuccess: (text: string) => void;
}

export const SnackBarContext = createContext<SnackBarContextType | undefined>(undefined);

interface SnackBarProviderProps {
  children: React.ReactNode;
}

// Componente proveedor que envuelve toda la aplicación
export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const [snackData, setSnackData] = useState<SnackBarData | null>(null);

  const showInfo = (text: string) => {
    setSnackData({ text, severity: SnackBarType.INFO });
  };

  const showError = (text: string) => {
    setSnackData({ text, severity: SnackBarType.ERROR });
  };

  const showSuccess = (text: string) => {
    setSnackData({ text, severity: SnackBarType.SUCCESS });
  };

  return (
    <SnackBarContext.Provider value={{ showInfo, showError, showSuccess }}>
      {children}
      {snackData && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSnackData(null)}>
          <Alert elevation={6} variant="filled" severity={snackData.severity}>
            {snackData.text}
          </Alert>
        </Snackbar>
      )}
    </SnackBarContext.Provider>
  );
};
