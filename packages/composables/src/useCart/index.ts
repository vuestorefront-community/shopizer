import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product
} from '@vue-storefront/shopizer-api';

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, {customQuery}) => {
    console.log('Mocked: useCart.load');
    const cart = await context.$shopizer.api.getCart({customQuery});
    if (cart) {
      localStorage.setItem('cartId', cart.code);
    }
    return cart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }: any) => {
    console.log('Mocked: useCart.addItem');
    let qty = 0;
    if (customQuery) {
      const item = customQuery?.products.find(cart => cart.id === product?.id);
      if (item === undefined) {
        qty = quantity;
      } else {
        qty = item.quantity + quantity;
      }
    } else {
      qty = quantity;
    }
    const token = localStorage.getItem('token');
    const response: any = await context.$shopizer.api.addToCart({product, cartId: customQuery, qty, token});
    await params.load(context, {customQuery: { cartId: response.code, currentLanguageCode: 'en', isLogin: localStorage.getItem('token') }});
    localStorage.setItem('cartId', response.code);
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }: any) => {
    console.log('Mocked: useCart.removeItem');
    await context.$shopizer.api.deleteFromCart({productId: product.id, cartId: currentCart.code});
    const data = await context.$shopizer.api.getCart({customQuery: { cartId: currentCart.code, currentLanguageCode: 'en', isLogin: localStorage.getItem('token') }});
    if (data) {
      return data;
    } else {
      localStorage.removeItem('cartId');
      return '';
    }
    // return currentCart;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    const qty = quantity;
    const response: any = await context.$shopizer.api.addToCart({product, cartId: currentCart, qty});
    console.log('Mocked: useCart.updateItemQty');
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: useCart.clear');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: {},
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    console.log('Mocked: useCart.isInCart');
    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
