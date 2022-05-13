import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/shopizer-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    console.log('Mocked: useProduct.productsSearch');
    const products: any = await context.$shopizer.api.getProductDetails(params);
    return products;
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
