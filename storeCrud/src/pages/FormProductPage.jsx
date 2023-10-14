import React,{ useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from '../context/ProductsContex';
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button} from '@mui/material';

const FormProductPage = () => {
    const {createProduct, getProduct, updateProduct} = useProducts();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm();

    useEffect(() => {
        async function loadTask() {
          if (params.id) {
            const products = await getProduct(params.id);
            setValue('title', products.title);
            setValue('description', products.description);
            setValue('price', products.price);
          } else {
            setValue('title', '');
            setValue('description', '');
            setValue('price', '');
          }
        }
        loadTask();
      }, [params.id]);
    
      const onSubmit = handleSubmit((data) => {
        if(params.id){
        //console.log(params.id, {...data})
        updateProduct(params.id, {...data});
        }else{
            //console.log({...data})
         createProduct({...data});
        }
        navigate('/productslist');
      });

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
        }
    };

    

    return (
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            width: 300,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            marginTop: '10vh',
            backgroundColor: '434E8F'
          }}
        >
        <form onSubmit={onSubmit}>
          <CardContent>
            <Typography
             variant="h6"
             component="div"
             sx={{
                textAlign: 'center', 
                marginBottom: '20px', 
              }}
              >
              Agregar producto
            </Typography>
            {errors.title && (
            <p style={{ color: 'red' }}>*Title is required*</p>
            )}
            <TextField
              label="Title of product"
              variant="outlined"
              fullWidth
              {...register("title", { required: true })}
              sx={{
                display: 'block',
                margin: '20px auto',
              }}
              InputLabelProps={{
                shrink: true, // Esto hará que la etiqueta flotante se muestre correctamente
              }}
            />
            {errors.description && 
            <p style={{ color: 'red' }}>*description is required</p>}
            <TextField           
              multiline
              label="Description"
              variant="outlined"
              fullWidth
              maxRows={4}
              {...register("description", { required: true })}
              sx={{
                display: 'block',
                margin: '20px auto', 
              }}
              InputLabelProps={{
                shrink: true, // Esto hará que la etiqueta flotante se muestre correctamente
              }}
            />
            {errors.price && 
            <p style={{ color: 'red' }}>*price is required</p>}
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price", { required: true,pattern: {
                value: /^[0-9]+$/, 
                message: 'Invalid price', 
              }, })}
              onChange={handlePriceChange}
              sx={{
                display: 'block',
                margin: '20px auto',
              }}
              InputLabelProps={{
                shrink: true, // Esto hará que la etiqueta flotante se muestre correctamente
              }}
            />
            <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            type="submit"
            style={{
                display: 'block',
                margin: '20px auto',
            }}
            >
            Save
            </Button>
          </CardContent>
          </form>
        </Card>
      </div>
      );
}

export default FormProductPage;