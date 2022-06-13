import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  // AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import type { Product, ProductFilter } from '@vue-storefront/shopizer-api';
// import { option } from 'yargs';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getName(product: any): string {
  return product?.description?.name || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getSlug(product: any): string {
  return product?.description.friendlyUrl || '/';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getPrice(product: any): any {
  return {
    regular: product?.originalPrice || 0,
    special: product?.finalPrice || 0,
    discounted: product?.discounted || false
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getGallery(product: any): AgnosticMediaGalleryItem[] {
  return product?.images || [];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCoverImage(products: any): string {
  return products.images && products.images.length > 0 ? products?.images[0].imageUrl : '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFiltered(products: any): Product[] {
  return products || {};
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getAttributes(products: any | Product): Record<string, AgnosticAttribute | string> {
  return {
    properties: products?.properties || [],
    radioOptions: products?.variants?.length > 0 ? products?.variants.filter((option, index, self) => {
      return self.map(x => x.variantValue.optionValue.code).indexOf(option.variantValue.optionValue.code) === index;
    }).map(item => item.variantValue) : [],
    selectOptions: products?.variants?.length > 0 ? products?.variants.filter((option, index, self) => {
      return self.map(x => x.variant.optionValue.code).indexOf(option.variant.optionValue.code) === index;
    }).map(item => item.variant) : [],
    weight: products?.productSpecifications?.weight || '',
    length: products?.productSpecifications?.length || '',
    width: products?.productSpecifications?.width || '',
    height: products?.productSpecifications?.height || ''
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getDescription(product: any): string {
  // console.log(product);
  return product?.description?.description || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategoryIds(): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getId(product: any): string {
  return product?.id || 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getSku(product: any): string {
  return product?.sku || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getAverageRating(product: any): number {
  return product?.rating || 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getQuantity(product: any): number {
  return product?.quantity || 0;
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
  getSku,
  getQuantity
};
