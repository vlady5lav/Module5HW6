import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { ProductDetailsStore } from '../../stores';

const ProductDetails = observer(() => {
  const store = useInjection<ProductDetailsStore>(IoCTypes.productDetailsStore);
  const { t } = useTranslation(['productDetails']);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      await store.init(id);
    };
    getProduct();
  }, [store, id]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>{t('product')}</h1>
          <Row>
            <Col>
              <Image src={`${process.env.PUBLIC_URL}/${store.product?.image}`} />
            </Col>
            <Col>
              <Row>
                <Col>
                  <span>{t('manufacturer')}:</span>
                </Col>
                <Col>{store.product?.manufacturer}</Col>
              </Row>
              <Row>
                <Col>
                  <span>{t('model')}:</span>
                </Col>
                <Col>{store.product?.model}</Col>
              </Row>
              <Row>
                <Col>
                  <span>{t('modelDescription')}:</span>
                </Col>
                <Col>{store.product?.modelDescription}</Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Grid>
  );
});

export default ProductDetails;
