import {
  Context,
  useFacetFactory
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params) => {
    console.log('Mocked: useFacet.search');
    const result: any = await context.$shopizer.api.getProductList(params.input);
    return result;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
