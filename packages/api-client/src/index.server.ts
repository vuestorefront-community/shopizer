import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import { getStore } from './Store/Store';
import { getCategoryHierarchy, getContent } from './Category/Category';
import { getFeaturedItems } from './Products/Products';
import axios from 'axios';

function onCreate(settings) {
  const client = axios.create({
    baseURL: settings.api.url
  });
  return {
    config: settings,
    client: client
  };
}

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    getStore,
    getCategoryHierarchy,
    getContent,
    getFeaturedItems
  }
});

export {
  createApiClient
};
