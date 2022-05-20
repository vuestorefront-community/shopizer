
import { Context } from '@vue-storefront/core';

export async function getFeaturedItems(context: Context): Promise<object> {
  const url = new URL('api/v1/products/group/FEATURED_ITEM', context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProductDetails(context: Context, params: any): Promise<object> {
  const url = new URL(`api/v1/products/${params.id}?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProductList(context: Context, params: any): Promise<object> {
  const url = new URL(`api/v1/products?store=${context.config.store}&lang=${params.currentLanguageCode}&category=${params.categoryid}&page=0&count=15`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getManufacturers(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/category/${params.categoryid}/manufacturers/?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    return [];
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getVariants(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/category/${params.categoryid}/variants/?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    return [];
  }
}
