// import type { Store } from '@vue-storefront/shopizer-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getStoreLogo (store: any): string {
  return store?.logo.path || '';
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getStoreData (store: any): string {
  return store || '';
}

export const marketGetters = {
  getStoreLogo,
  getStoreData
};
