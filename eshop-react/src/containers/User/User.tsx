import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserCard from '../../components/UserCard';
import { IoCTypes, useInjection } from '../../ioc';
import { UserStore } from '../../stores/components';

const User = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<UserStore>(IoCTypes.userStore);
  const { t } = useTranslation(['user']);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      store.queryString = id ?? '1';
      await store.search();
    };
    getUser();
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
                    navigate(`/user/${store.queryString}`, { replace: true });
                  }}
                  onChange={() => {
                    null;
                  }}
                  type="button"
                  text={t('submit')}
                />
              </InputGroup>

              {!!store.error && <ErrorMessage error={store.error} />}

              {!!store.user && <UserCard user={store.user} />}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
});

export default User;
