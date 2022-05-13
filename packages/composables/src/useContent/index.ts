import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';

export const useContent = (): any => {
  const context = useVSFContext();

  const categoryresult = sharedRef(null, 'category');
  const contentresult = sharedRef(null, 'content');
  const featureItemResult = sharedRef(null, 'features');

  const getCategoryHierarchy = async(params: any) => {
    console.log('load: getCategoryHierarchy');
    const category: any = await context.$shopizer.api.getCategoryHierarchy(params);
    // console.log(category);
    categoryresult.value = category;
    return category;
  };
  const getContent = async(params: any) => {
    console.log('load: getContent');
    const contents: any = await context.$shopizer.api.getContent(params);
    contentresult.value = contents;
    return contents;
  };

  const getFeaturedItem = async () => {
    console.log('load: getFeaturedItem');
    const featuredItems: any = await context.$shopizer.api.getFeaturedItems();
    featureItemResult.value = featuredItems;
    // console.log(featuredItems);
    return featuredItems;
  };

  return {
    getCategoryHierarchy,
    getContent,
    getFeaturedItem,
    categoryData: computed(() => categoryresult.value),
    contentData: computed(() => contentresult.value),
    featuredItemData: computed(() => featureItemResult.value)
  };
};
