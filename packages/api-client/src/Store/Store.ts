
import { Context } from '@vue-storefront/core';

export async function getStore(context: Context): Promise<object> {
  try {
    const url = new URL(`api/v1/store/${context.config.store}`, context.config.api.url);
    const { data } = await context.client.get(url.href);
    return data;
  } catch (error) {
    console.log(error);
  }
}

