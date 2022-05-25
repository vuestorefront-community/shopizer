// import type { Store } from '@vue-storefront/shopizer-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getStoreLogo (store: any): string {
  return store?.logo.path || '';
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getStoreData (store: any): string {
  return store || '';
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getPhoneNumber (store: any): string {
  return store.phone || '-';
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getLanguages (store: any): string {
  return store.supportedLanguages || [];
}

export const marketGetters = {
  getStoreLogo,
  getStoreData,
  getPhoneNumber,
  getLanguages
};
