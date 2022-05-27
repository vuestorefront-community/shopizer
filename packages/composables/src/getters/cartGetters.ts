import {
  CartGetters,
  AgnosticTotals,
  AgnosticDiscount,
  AgnosticAttribute
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@vue-storefront/shopizer-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItems(cart: any): CartItem[] {
  return cart || null;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemName(item: any): string {
  return item?.description?.name || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemImage(item: any): string {
  return item.images && item.images.length > 0 ? item?.images[0].imageUrl : '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemPrice(item: any): any {
  return {
    regular: item?.originalPrice || 0,
    special: item?.finalPrice || 0,
    discounted: item?.discounted || false
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemQty(item: any): number {
  return item?.quantity || 1;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemAttributes(): Record<string, AgnosticAttribute | string> {
  return {
    color: 'red'
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItemSku(item: any): string {
  return item?.sku || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getTotals(cart: any): AgnosticTotals {
  return {
    total: 12,
    subtotal: 12,
    special: 10,
    displayTotal: cart?.displayTotal || 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart: Cart): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getTotalItems(cart: any): number {
  return cart?.quantity || 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getFormattedPrice(cart: any): any {
  return {
    displaySubTotal: cart?.displaySubTotal || 0,
    displayTotal: cart?.displayTotal || 0
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCoupons(cart: any): any {
  return cart?.promoCode || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart: Cart): AgnosticDiscount[] {
  return [];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getFormattedPrice,
  getTotalItems,
  getCoupons,
  getDiscounts
};
