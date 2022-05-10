
import type { Category, Contents } from '@vue-storefront/shopizer-api';
function getCategoryData (category: Category): any[] {
  // console.log(category);
  return category?.categories || [];
}
function getContentData (contents: Contents): any[] {
  // console.log(contents);
  return contents?.items || [];
}
function getFeatureItemsData (featureItems: Contents): any[] {
  // console.log(contents);
  return featureItems?.products || [];
}

export const contentGetters = {
  getCategoryData,
  getContentData,
  getFeatureItemsData
};
