
// import type { Category, Contents } from '@vue-storefront/shopizer-api';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategoryData (category: any): any[] {
  // console.log(category);
  return category?.categories || [];
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getContentData (contents: any): any[] {
  // console.log(contents);
  return contents?.items || [];
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFeatureItemsData (featureItems: any): any[] {
  // console.log(contents);
  return featureItems?.products || [];
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getManufactures (items: any): any {
  return items ? items : [];
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getvariants (items: any): any {
  return items ? items : [];
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategoryDetail (items: any): any {
  return items ? items?.children : [];
}

export const contentGetters = {
  getCategoryData,
  getContentData,
  getFeatureItemsData,
  getManufactures,
  getvariants,
  getCategoryDetail
};
