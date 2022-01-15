import { observer } from 'mobx-react';
import React from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/types';
import AuthStore from '../../stores/AuthStore';

const Header = observer(() => {
  const navigate = useNavigate();
  const store = useInjection<AuthStore>(ownTypes.authStore);
  const { t } = useTranslation(['header']);

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>
            <Image src={`${process.env.PUBLIC_URL}/logo192.png`} width="30" height="30" rounded />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="dark" className="mx-2" onClick={() => navigate(`/products?_page=1`, { replace: true })}>
              {t('home')}
            </Button>
            <Button variant="dark" className="mx-2" onClick={() => navigate(`/product`, { replace: true })}>
              {t('product')}
            </Button>
            <Button variant="dark" className="mx-2" onClick={() => navigate(`/user`, { replace: true })}>
              {t('user')}
            </Button>
            <Button variant="dark" className="mx-2" onClick={() => navigate(`/users?_page=1`, { replace: true })}>
              {t('users')}
            </Button>
          </Nav>
          <Nav>
            <Button variant="dark" className="mx-2" onClick={() => navigate(`/cart`, { replace: true })}>
              {t('cart')}
            </Button>
            {!store.isAuthorized && (
              <Button variant="dark" className="mx-2" onClick={() => navigate(`/signin`, { replace: true })}>
                {t('signIn')}
              </Button>
            )}
            {!store.isAuthorized && (
              <Button variant="dark" className="mx-2" onClick={() => navigate(`/signup`, { replace: true })}>
                {t('signUp')}
              </Button>
            )}
            {store.isAuthorized && (
              <Button variant="dark" className="mx-2" onClick={() => navigate(`/profile/me`, { replace: true })}>
                {t('profile')}
              </Button>
            )}
            {store.isAuthorized && (
              <Button
                variant="dark"
                className="mx-2"
                onClick={() => {
                  store.signOut();
                  navigate(`/`, { replace: true });
                }}
              >
                {t('signOut')}
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
});

export default Header;
