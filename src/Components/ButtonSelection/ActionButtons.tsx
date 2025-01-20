import { IconButton } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate } from 'react-router-dom';

interface actionButtonsProps {
  productId: number;
  multiButton: boolean
}

export default function ActionButtons(props: actionButtonsProps) {
  const { productId, multiButton } = props;



  const navigate = useNavigate();

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
          <IconButton>
            <PlaylistRemoveIcon
              onClick={() => {
                navigate(`/salidasProducto/${productId}`);
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
