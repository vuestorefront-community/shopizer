import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import { getStore } from './Store/Store';
import { getCategoryHierarchy, getContent, getCategoryDetails } from './Category/Category';
import { getFeaturedItems, getProductDetails, getProductList, getManufacturers, getVariants } from './Products/Products';
import { addToCart, getCart, deleteFromCart, getUserCartData } from './Cart/Cart';
import { login, forgotPassword, register } from './Users/Users';
import { getCountry, getState} from './Comman/Comman';
import { getShippingQuote } from './Checkout/Checkout';
import axios from 'axios';

function onCreate(settings) {
  const client = axios.create({
    baseURL: settings.api.url
  });
  return {
    config: settings,
    client: client
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    getStore,
    getCategoryHierarchy,
    getContent,
    getFeaturedItems,
    getProductDetails,
    addToCart,
    getCart,
    deleteFromCart,
    getProductList,
    getManufacturers,
    getVariants,
    getCategoryDetails,
    login,
    forgotPassword,
    register,
    getCountry,
    getState,
    getUserCartData,
    getShippingQuote
  }
});

export {
  createApiClient
};
