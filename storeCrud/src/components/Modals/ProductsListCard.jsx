import React, { useState }  from 'react';
import {useNavigate } from "react-router-dom";

import { Card, CardContent, Typography, Button, CardMedia, CardActions } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useProducts } from '../../context/ProductsContex';

import ModalAction from '../Cards/ModalAction';

export default function ProductsListCard({ product }) {

  const { deleteProduct } = useProducts();
  const { id, title, description, price, images } = product;
  const navigate = useNavigate();

//****/
//Logic for the modal
//****/

const [openModal, setOpenModal] = useState(false);
const [modalAction, setModalAction] = useState(null);
const [modalItemId, setModalItemId] = useState(null);

const handleOpenModal = (action, id) => {
  setModalAction(action);
  setModalItemId(id);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setModalAction(null);
  setModalItemId(null);
};

const handleConfirmAction = (action, itemId) => {
  if (action === 'delete') {
    deleteProduct(itemId)
  } else if (action === 'edit') {
    navigate(`/products/${itemId}`);
  }

  handleCloseModal();
};

  return (
    <Card sx={{ height: '100%',margin:0, display: 'flex', flexDirection: 'column', backgroundColor:'#f5f5f5' }}>
      <Carousel>
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            alt={`Image ${index + 1}`}
            height="160"
            image={image}
            sx={{
              margin: '8px', 
            }}
          />
        ))}
      </Carousel>
      <CardContent style={{ flex: 1, margin: '0', display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary">
         Price ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => handleOpenModal('edit', id)}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleOpenModal('delete', id)}
        >
          delete
        </Button>
        <ModalAction
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        action={modalAction}
        itemId={modalItemId}
      />
      </CardActions>
    </Card>
  );
}
