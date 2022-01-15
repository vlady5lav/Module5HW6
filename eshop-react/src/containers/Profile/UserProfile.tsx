import { Avatar, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IoCTypes, useInjection } from '../../ioc';
import { UserProfileStore } from '../../stores/';

const UserProfile = observer(() => {
  const store = useInjection<UserProfileStore>(IoCTypes.userProfileStore);
  const { t } = useTranslation(['profile']);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      await store.init(id);
    };
    getUser();
  }, [store, id]);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Grid container>
      {store.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid container>
          <Grid container textAlign="center" justifyContent="center">
            <h1>{t('user_title')}</h1>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item m={5}>
              {store.user?.avatar ? (
                <Avatar alt={store.user?.email} src={store.user?.avatar} sx={{ width: 128, height: 128 }} />
              ) : (
                <Avatar {...stringAvatar(`${store.user?.first_name} ${store.user?.last_name}`)} sx={{ width: 128, height: 128 }} />
              )}
            </Grid>
            <Grid item m={5}>
              <Grid container>
                <Grid item>
                  <span>{t('user_info.first_name')}:</span>
                </Grid>
                <Grid item>{store.user?.first_name}</Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <span>{t('user_info.last_name')}:</span>
                </Grid>
                <Grid item>{store.user?.last_name}</Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <span>{t('user_info.email')}:</span>
                </Grid>
                <Grid item>{store.user?.email}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
});

export default UserProfile;
