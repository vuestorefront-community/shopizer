
import { Context } from '@vue-storefront/core';
import { isCheckValueAndSetParams } from '../helper';
export async function getFeaturedItems(context: Context): Promise<object> {
  try {
    const url = new URL('api/v1/products/group/FEATURED_ITEM', context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProductDetails(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/products/${params.id}?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getProductList(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/products?${isCheckValueAndSetParams('&store=', context.config.store)}${isCheckValueAndSetParams('&lang=', params.currentLanguageCode)}${isCheckValueAndSetParams('&category=', params.categoryid)}${isCheckValueAndSetParams('&page=', 0)}${isCheckValueAndSetParams('&count=', 15)}${isCheckValueAndSetParams('&manufacturer=', params.selectedManufature.join())}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
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
