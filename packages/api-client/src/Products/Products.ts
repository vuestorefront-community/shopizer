
import { Context } from '@vue-storefront/core';

export async function getFeaturedItems(context: Context): Promise<object> {
  const url = new URL('api/v1/products/group/FEATURED_ITEM', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProductDetails(context: Context, params: any): Promise<object> {
  const url = new URL(`api/v1/products/${params.id}?store=${params.defaultStore}&lang=${params.currentLanguageCode}`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
