import type { Store } from '@vue-storefront/shopizer-api';
function getStoreLogo (store: Store): string {
  return store?.logo.path || '';
}
function getStoreData (store: Store): string {
  return store || '';
}

export const marketGetters = {
  getStoreLogo,
  getStoreData
};
