import {
  Context,
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import type { Review } from '@vue-storefront/shopizer-api';
import type {
  UseReviewSearchParams as SearchParams,
  UseReviewAddParams as AddParams
} from '../types';

const params: UseReviewFactoryParams<Review, SearchParams, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    console.log('Mocked: useReview.searchReviews', params);
    const reviews: any = await context.$shopizer.api.getReviews(params);
    return reviews;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    console.log('Mocked: useReview.addReview');
    params.token = localStorage.getItem('token');
    const reviewResponse: any = await context.$shopizer.api.addReview(params);
    console.log(reviewResponse, '--------');
    return reviewResponse;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);
