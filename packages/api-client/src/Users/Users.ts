import { Context } from '@vue-storefront/core';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function login(context: Context, body: any): Promise<object> {
  try {
    const url = new URL('api/v1/customer/login/', context.config.api.url);
    const { data } = await context.client.post(url.href, body);
    return {code: 200, message: 'You have successfully logged in to this website', data: data};
  } catch (error) {
    return {code: 401, message: 'The provided credentials are invalid', data: ''};
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function forgotPassword(context: Context, body: any): Promise<object> {
  try {
    const url = new URL('api/v1/customer/password/reset/request/', context.config.api.url);
    const { data } = await context.client.post(url.href, body);
    return data;
  } catch (error) {
    return {code: 400, message: 'The provided credentials are invalid', data: ''};
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function register(context: Context, body: any): Promise<object> {
  try {
    const url = new URL('api/v1/customer/register', context.config.api.url);
    const { data } = await context.client.post(url.href, body);
    return {code: 200, message: 'You have successfully registerd in to this website.', data: data};
  } catch (error) {
    return {code: 400, message: 'Registering customer already exist', data: error};
  }
}
