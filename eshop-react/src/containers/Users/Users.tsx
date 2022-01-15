import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import UserCard from '../../components/UserCard';
import { IoCTypes, useInjection } from '../../ioc';
import { UsersStore } from '../../stores/components';

const Users = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<UsersStore>(IoCTypes.usersStore);
  const { t } = useTranslation(['users']);

  useEffect(() => {
    const getUsers = async () => {
      await store.init();
    };
    getUsers();
  }, [store, store.currentPage]);

  return (
    <Grid justifyContent="center">
      <Grid container justifyContent="center">
        {store.isLoading ? (
          <LoadingSpinner />
        ) : (
          <Grid container justifyContent="center">
            <Grid container justifyContent="center">
              <h1>{t('title')}</h1>
            </Grid>
            <Grid container justifyContent="center">
              {store.users?.map((user, key) => (
                <Grid item key={key} style={{ margin: 20 }}>
                  <UserCard user={user} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="center" mt={5}>
        <Pagination
          total={store.totalPages}
          active={store.currentPage}
          onChange={(ev, val) => {
            store.changePage(val);
            navigate(`/users?_page=${val}`, { replace: true });
          }}
        />
      </Grid>
    </Grid>
  );
});

export default Users;
