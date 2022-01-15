import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { OwnUserProfileStore } from '../../stores';

const OwnUserProfile = observer(() => {
  const store = useInjection<OwnUserProfileStore>(IoCTypes.ownUserProfileStore);
  const { t } = useTranslation(['profile']);

  useEffect(() => {
    const getUser = async () => {
      await store.init();
    };
    getUser();
  }, [store]);

  return (
    <Grid container justifyContent="center">
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>{t('me_title')}</h1>
          <Row>
            <Col>
              <Image src={store.user?.avatar} />
            </Col>
            <Col>
              <Row>
                <Col>
                  <span>{t('user_info.email')}:</span>
                </Col>
                <Col>{store.user?.email}</Col>
              </Row>
              <Row>
                <Col>
                  <span>{t('user_info.first_name')}:</span>
                </Col>
                <Col>{store.user?.first_name}</Col>
              </Row>
              <Row>
                <Col>
                  <span>{t('user_info.last_name')}:</span>
                </Col>
                <Col>{store.user?.last_name}</Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Grid>
  );
});

export default OwnUserProfile;
