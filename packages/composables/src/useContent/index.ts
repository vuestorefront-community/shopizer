import { computed } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';

export const useContent = (): any => {
  const context = useVSFContext();

  const categoryresult = sharedRef(null, 'category');
  const contentresult = sharedRef(null, 'content');
  const featureItemResult = sharedRef(null, 'features');
  const manufactureItemResult = sharedRef(null, 'manufacture');
  const variantsItemResult = sharedRef(null, 'variants');
  const categoryDetails = sharedRef(null, 'details');

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

  const getManufacturers = async (params: any) => {
    console.log('Mocked: useFacet.Manufacturers');
    const manufacture: any = await context.$shopizer.api.getManufacturers(params);
    manufactureItemResult.value = manufacture;
    return manufacture;
  };
  const getVariants = async (params: any) => {
    console.log('Mocked: useFacet.Variants');
    const variants: any = await context.$shopizer.api.getVariants(params);
    variantsItemResult.value = variants;
    return variants;
  };
  const getCategoryDetails = async (params: any) => {
    console.log('Mocked: useFacet.categorydetails');
    const details: any = await context.$shopizer.api.getCategoryDetails(params);
    categoryDetails.value = details;
    return details;
  };
  return {
    getCategoryHierarchy,
    getContent,
    getFeaturedItem,
    getManufacturers,
    getVariants,
    getCategoryDetails,
    categoryData: computed(() => categoryresult.value),
    contentData: computed(() => contentresult.value),
    featuredItemData: computed(() => featureItemResult.value),
    manufactureData: computed(() => manufactureItemResult.value),
    variantsData: computed(() => variantsItemResult.value),
    categoryDetails: computed(() => categoryDetails.value)
  };
};
