import { observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthorizedOutlet, NonAuthorizedOutlet } from '.';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout } from '../containers';
import '../locales/config';

const Cart = React.lazy(() => import('../containers/Cart'));
const ProductDetails = React.lazy(() => import('../containers/ProductDetails'));
const SignIn = React.lazy(() => import('../containers/SignIn'));
const OwnUserProfile = React.lazy(() => import('../containers/Profile/OwnUserProfile'));
const Product = React.lazy(() => import('../containers/Product'));
const Products = React.lazy(() => import('../containers/Products'));
const SignUp = React.lazy(() => import('../containers/SignUp'));
const User = React.lazy(() => import('../containers/User'));
const UserProfile = React.lazy(() => import('../containers/Profile/UserProfile'));
const Users = React.lazy(() => import('../containers/Users'));

const AppRoutes = observer(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="product" element={<Product />}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="user" element={<User />}>
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="/" element={<NonAuthorizedOutlet />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="profile" element={<AuthorizedOutlet />}>
              <Route path="me" element={<OwnUserProfile />} />
              <Route path=":id" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
});

export default AppRoutes;
