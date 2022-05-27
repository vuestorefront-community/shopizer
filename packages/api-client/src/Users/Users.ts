import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function login(context: Context, body: any): Promise<object> {
  try {
    const url = new URL('api/v1/customer/login/', context.config.api.url);
    const { data } = await context.client.post(url.href, body);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function forgotPassword(context: Context, body: any): Promise<object> {
  try {
    const url = new URL('api/v1/customer/password/reset/request/', context.config.api.url);
    const { data } = await context.client.post(url.href, body);
    return data;
  } catch (error) {
    console.log(error);
  }
}
