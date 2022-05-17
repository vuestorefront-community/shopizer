import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addToCart(context: Context, {product, cartId, quantity}: any): Promise<object> {
  let url: any;
  const param = { product: product.id, quantity: quantity };
  try {
    if (cartId) {
      url = new URL(`api/v1/cart/${cartId.code}?store=DEFAULT`, context.config.api.url);
      const { data } = await context.client.put(url.href, param);
      return data;
    } else {
      url = new URL('api/v1/cart?store=DEFAULT', context.config.api.url);
      const { data } = await context.client.post(url.href, param);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCart(context: Context, cartID: any): Promise<object> {
  try {
    const url = new URL(`api/v1/cart/${cartID}?lang=en`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}
