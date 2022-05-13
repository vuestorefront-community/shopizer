import { Context } from '@vue-storefront/core';
export async function getCategoryHierarchy(context: Context, params: object): Promise<object> {
  const url = new URL(`api/v1/category/?count=20&page=0&store=${params.defaultStore}&lang=${params.currentLanguageCode}`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}

export async function getContent(context: Context, params: object): Promise<object> {
  const url = new URL(`api/v1/content/pages/?page=0&count=20&store=${params.defaultStore}&lang=${params.currentLanguageCode}`, context.config.api.url);
  const { data } = await context.client.get(url.href);
  return data;
}
