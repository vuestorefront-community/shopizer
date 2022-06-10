import { Context } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getCountry(context: Context, params: any): Promise<object> {
  try {
    const url = new URL(`api/v1/shipping/country?store=${context.config.store}&lang=${params.currentLanguageCode}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getState(context: Context, code: any): Promise<object> {
  try {
    const url = new URL(`api/v1/zones?code=${code}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    // console.log(error);
  }
}
