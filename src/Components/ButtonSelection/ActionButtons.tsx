import { IconButton } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router-dom';

interface actionButtonsProps {
  productId: number;
}

export default function ActionButtons(props: actionButtonsProps) {
  const { productId } = props;
  const [multiButton, setMultiButton] = useState(false);
  const aprovedRoles = ['SuperAdmin', 'Admin'];

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      if (aprovedRoles.includes(role)) {
        setMultiButton(true);
      }
    }
  }, []);

  return (
    <>
      {multiButton ? (
        <>
          <IconButton
            onClick={() => {
              navigate(`/vender/${productId}`);
            }}
          >
            <PointOfSaleIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigate(`/producto/editar/${productId}`);
            }}
          >
            <EditNoteIcon />
          </IconButton>
          <IconButton>
            <PlaylistAddIcon
              onClick={() => {
                navigate(`/entradasProducto/${productId}`);
              }}
            />
          </IconButton>
        </>
      ) : (
        <IconButton
          onClick={() => {
            navigate(`/vender/${productId}`);
          }}
        >
          <PointOfSaleIcon />
        </IconButton>
      )}
    </>
  );
}
