import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import type { Review, ReviewItem } from '@vue-storefront/shopizer-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getItems(review: any): ReviewItem[] {
  return review || [];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getReviewId(item: any): string {
  return item?.id || 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getReviewAuthor(item: any): string {
  return item?.customer?.firstName + ' ' + item?.customer?.lastName || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getReviewMessage(item: any): string {
  return item?.description || '';
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getReviewRating(item: any): number {
  console.log(item);
  return item?.rating || 0;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getReviewDate(item: any): string {
  return item?.date || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRatesCount(review: Review): AgnosticRateCount[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewsPage(review: Review): number {
  return 0;
}

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
