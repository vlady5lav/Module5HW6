import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from '../../components/ProductCard';
import { IoCTypes, useInjection } from '../../ioc';
import { CartStore } from '../../stores';
import { ProductStore } from '../../stores/components';

const Product = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<ProductStore>(IoCTypes.productStore);
  const cartStore = useInjection<CartStore>(IoCTypes.cartStore);
  const { t } = useTranslation(['product']);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      store.queryString = id ?? '1';
      await store.search();
    };
    getProduct();
  }, [store, id]);

  return (
    <Grid container justifyContent="center">
      <Grid>
        {store.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Grid>
            <Grid item textAlign="center">
              <h1>{t('title')}</h1>
            </Grid>
            <Grid item>
              <InputGroup>
                <FormControl
                  type="number"
                  value={store.queryString}
                  onChange={(ev) => {
                    store.changeQueryString(ev.target.value);
                  }}
                  isInvalid={!!store.error}
                  placeholder={t('placeholder')}
                />

                <ButtonSpinner
                  isLoading={store.isLoading}
                  disabled={!store.queryString}
                  onClick={() => {
                    store.search();
                    navigate(`/product/${store.queryString}`, { replace: true });
                  }}
                  onChange={() => {
                    null;
                  }}
                  type="button"
                  text={t('submit')}
                />
              </InputGroup>

              {!!store.error && <ErrorMessage error={store.error} />}

              {!!store.product && <ProductCard productInfo={{ ...store.product, count: cartStore.getItemCount(store.product.id) }} />}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
});

export default Product;
