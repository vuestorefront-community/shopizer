import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCategoryHierarchy(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/category/?count=20&page=0&store=${context.config.store}&lang=${params?.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getContent(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/content/pages/?page=0&count=20&store=${context.config.store}&lang=${params?.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCategoryDetails(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/category/${params.categoryid}?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}
