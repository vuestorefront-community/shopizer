import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';

export const useContent = (): any => {
  const context = useVSFContext();

  const categoryresult = sharedRef(null, 'category');
  const contentresult = sharedRef(null, 'content');

  const getCategoryHierarchy = async() => {
    console.log('load: getCategoryHierarchy');
    const category: any = await context.$shopizer.api.getCategoryHierarchy(context.$shopizer);
    // console.log(category);
    categoryresult.value = category;
    return category;
  };
  const getContent = async() => {
    console.log('load: getContent');
    const contents: any = await context.$shopizer.api.getContent(context.$shopizer);
    // console.log(contents);
    contentresult.value = contents;
    return contents;
  };
  return {
    getCategoryHierarchy,
    getContent,
    categoryData: computed(() => categoryresult.value),
    contentData: computed(() => contentresult.value)
  };
};
