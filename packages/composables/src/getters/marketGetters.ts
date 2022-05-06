import type { Store } from '@vue-storefront/shopizer-api';
function getStoreLogo (store: Store): string {
  return store?.logo.path || '';
}

export const marketGetters = {
  getStoreLogo
};
