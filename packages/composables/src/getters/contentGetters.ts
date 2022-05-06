
import type { Category, Contents } from '@vue-storefront/shopizer-api';
function getCategoryData (category: Category): any[] {
  // console.log(category);
  return category?.categories || [];
}
function getContentData (contents: Contents): any[] {
  // console.log(contents);
  return contents?.items || [];
}

export const contentGetters = {
  getCategoryData,
  getContentData
};
