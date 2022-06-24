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
  const countryData = sharedRef(null, 'country');
  const stateData = sharedRef(null, 'state');
  const userCartData = sharedRef(null, 'userCartData');
  const shippingQuote = sharedRef(null, 'shippingQuote');
  const shippingOptions = sharedRef(null, 'shippingOptions');

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
  const getCountry = async (params: any) => {
    console.log('Mocked: useFacet.country', params);
    const country: any = await context.$shopizer.api.getCountry(params);
    countryData.value = country;
    return country;
  };
  const getState = async (code: any) => {
    console.log('Mocked: useFacet.state', code);
    const state: any = await context.$shopizer.api.getState(code);
    stateData.value = state;
    return state;
  };
  const getUserCartData = async (currentLanguageCode: any) => {
    console.log('Mocked: useFacet.getUserCartData');
    const cartData: any = await context.$shopizer.api.getUserCartData({currentLanguageCode, isLogin: localStorage.getItem('token')});
    userCartData.value = cartData;
    return cartData;
  };

  const getShippingQuote = async (params: any) => {
    console.log('Mocked: useFacet.getUserCartData', params);
    const quoteData: any = await context.$shopizer.api.getShippingQuote(params);
    console.log(quoteData);
    shippingQuote.value = quoteData;
    return quoteData;
  };

  const getShippingOptions = async (params: any) => {
    console.log('Mocked: useFacet.getShippingOptions', params);
    const optionData: any = await context.$shopizer.api.getShippingOptions(params);
    shippingOptions.value = optionData;
    return optionData;
  };
  return {
    getCategoryHierarchy,
    getContent,
    getFeaturedItem,
    getManufacturers,
    getVariants,
    getCategoryDetails,
    getCountry,
    getState,
    getUserCartData,
    getShippingQuote,
    getShippingOptions,
    categoryData: computed(() => categoryresult.value),
    contentData: computed(() => contentresult.value),
    featuredItemData: computed(() => featureItemResult.value),
    manufactureData: computed(() => manufactureItemResult.value),
    variantsData: computed(() => variantsItemResult.value),
    categoryDetails: computed(() => categoryDetails.value),
    countryData: computed(() => countryData.value),
    stateData: computed(() => stateData.value),
    userCartData: computed(() => userCartData.value),
    shippingQuote: computed(() => shippingQuote.value),
    shippingOptions: computed(() => shippingOptions.value)
  };
};
