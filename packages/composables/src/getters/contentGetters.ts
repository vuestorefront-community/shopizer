
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

export const contentGetters = {
  getCategoryData,
  getContentData,
  getFeatureItemsData
};
