import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../../components';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';

const Cart = observer(() => {
  const store = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['cart']);

  useEffect(() => {
    const getProductsCart = async () => {
      await store.getProductsCart();
    };
    getProductsCart();
  }, [store]);

  return (
    <Grid container spacing={4} justifyContent="center" mt={4}>
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid container justifyContent="center">
            <h1>{t('title')}</h1>
          </Grid>
          {store.productsCart?.length > 0 ? (
            store.productsCart?.map((productCart, key) => (
              <Grid item key={key}>
                <ProductCard productInfo={{ ...productCart.product, count: productCart.count }} />
              </Grid>
            ))
          ) : (
            <Grid>
              <Typography>Your cart is empty...</Typography>
              <Typography>Add some products to be happy =)</Typography>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
});

export default Cart;
