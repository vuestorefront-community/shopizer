import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getReviews(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/products/${params.productId}/reviews?store=${context.config.store}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function addReview(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/auth/products/${params.productId}/reviews`, context.config.api.url);
    const { data } = await context.client.post(url.href, params, { headers: { Authorization: `Bearer ${params.token}` } });
    return {code: 200, message: 'Your review has been posted', data: data};
  } catch (error) {
    return {code: 400, message: 'A review already exist for this customer and product', data: error};
  }
}
