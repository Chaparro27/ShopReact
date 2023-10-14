import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import ProductsListCard from '../components/Modals/ProductsListCard';
import { useProducts } from '../context/ProductsContex';

export default function ProductPage() {
  const { products, getProducts } = useProducts();
  
  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ margin: '16px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              No products yet, please add a new product
            </Typography>
          </Grid>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardContent style={{ flex: 1, margin: 0, padding: 0 }}>
                  <ProductsListCard product={product} />
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
