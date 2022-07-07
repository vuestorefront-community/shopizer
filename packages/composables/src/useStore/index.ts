import {
  Context,
  useStoreFactory,
  UseStoreFactoryParams
} from '@vue-storefront/core';
import type { Store } from '@vue-storefront/shopizer-api';

const params: UseStoreFactoryParams<Store> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: useUser.load');
    const response = await context.$shopizer.api.getStore(context);
    console.log('storeResponse -> ', response);
    return response;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(context: Context, params) {
    console.log('Mocked: useStore.change');

    return Promise.resolve({});
  }
};

export const useStore = useStoreFactory<Store>(params);
