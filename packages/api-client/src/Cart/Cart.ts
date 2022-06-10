import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addToCart(context: Context, {product, cartId, qty, token}: any): Promise<object> {
  let url: any;
  const param = { product: product.sku, quantity: qty };
  try {
    if (cartId) {
      url = new URL(`api/v1/cart/${cartId.code}?store=${context.config.store}`, context.config.api.url);
      let data;
      if (token) {
        data = await context.client.put(url.href, param, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        data = await context.client.put(url.href, param);
      }
      // console.log(data, 'jaimin');
      // const { data } = await context.client.put(url.href, param);
      return data.data;
    } else {
      url = new URL(`api/v1/cart?store=${context.config.store}`, context.config.api.url);
      // const { data } = await context.client.post(url.href, param);
      let data;
      if (token) {
        data = await context.client.post(url.href, param, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        data = await context.client.post(url.href, param);
      }
      return data.data;
    }
  } catch (error) {
    // console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCart(context: Context, params: any): Promise<object> {
  try {
    const {customQuery} = params;
    let url;
    if (customQuery.isLogin) {
      if (customQuery.cartId) {
        url = new URL(`api/v1/auth/customer/cart?cart=${customQuery.cartId}&lang=${customQuery.currentLanguageCode}`, context.config.api.url);
      } else {
        url = new URL(`api/v1/auth/customer/cart?lang=${customQuery.currentLanguageCode}`, context.config.api.url);
      }
    } else {
      url = new URL(`api/v1/cart/${customQuery.cartId}?lang=${customQuery.currentLanguageCode}`, context.config.api.url);
    }
    let data;
    if (customQuery.isLogin) {
      data = await context.client.get(url.href, { headers: { Authorization: `Bearer ${customQuery.isLogin}` } });
    } else {
      data = await context.client.get(url.href);
    }
    return data.data;
  } catch (error) {
    // console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function deleteFromCart(context: Context, {productId, cartId} : any): Promise<object> {
  try {
    const url = new URL(`api/v1/cart/${cartId}/product/${productId}?store=${context.config.store}`, context.config.api.url);
    const { data } = await context.client.delete(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getUserCartData(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/auth/customer/cart?lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href, { headers: { Authorization: `Bearer ${params.isLogin}` } });
    return data;
  } catch (error) {
    // console.log(error);
  }
}
