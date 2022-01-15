import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';
import { ProductsStore } from '../../stores/components';

const Products = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<ProductsStore>(IoCTypes.productsStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['products']);

  useEffect(() => {
    const getProducts = async () => {
      await store.init();
    };
    getProducts();
  }, [store, store.currentPage]);

  return (
    <Grid container spacing={4} justifyContent="center" mt={4}>
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Grid container justifyContent="center">
            <h1>{t('title')}</h1>
          </Grid>
          {store.products?.map((product, key) => (
            <Grid item key={key}>
              <ProductCard productInfo={{ ...product, count: cartStore.getItemCount(product.id) }} />
            </Grid>
          ))}
        </>
      )}
      <Grid container justifyContent="center" mt={4}>
        <Pagination
          total={store.totalPages}
          active={store.currentPage}
          onChange={(ev, val) => {
            const lim = store.pageLimit;
            store.changePage(val);
            navigate(`/products?_page=${val}&_limit=${lim}`, { replace: true });
          }}
        />
      </Grid>
    </Grid>
  );
});

export default Products;
