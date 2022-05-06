
import { Context } from '@vue-storefront/core';

export async function getStore(context: Context): Promise<object> {
  const url = new URL('api/v1/store/DEFAULT', context.config.api.url);
  const { data } = await context.client.get(url.href);

  return data;
}
