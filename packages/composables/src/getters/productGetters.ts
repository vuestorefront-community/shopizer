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
function getSlug(): string {
  return 'slug';
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
function getCoverImage(): string {
  return 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFiltered(products: any): Product[] {
  return products || {};
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getAttributes(products: any | Product): Record<string, AgnosticAttribute | string> {
  return {
    properties: products?.properties || [],
    radioOptions: products?.options ? products?.options.filter((option) => {
      return option.type === 'radio';
    }) : [],
    selectOptions: products?.options ? products?.options.filter((option) => {
      return option.type === 'select';
    }) : [],
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
function getId(): string {
  return '1';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  return 0;
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
  getAverageRating
};
