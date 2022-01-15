import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import app from './en/app.json';
import cart from './en/cart.json';
import header from './en/header.json';
import home from './en/home.json';
import product from './en/product.json';
import products from './en/products.json';
import profile from './en/profile.json';
import signIn from './en/signIn.json';
import signUp from './en/signUp.json';
import user from './en/user.json';
import users from './en/users.json';

export const resources = {
  en: {
    app,
    cart,
    header,
    home,
    signIn,
    product,
    products,
    profile,
    signUp,
    user,
    users,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['app', 'cart', 'header', 'home', 'signIn', 'product', 'products', 'profile', 'signUp', 'user', 'users'],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
