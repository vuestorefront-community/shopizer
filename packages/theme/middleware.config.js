module.exports = {
  integrations: {
    shopizer: {
      location: '@vue-storefront/shopizer-api/server',
      configuration: {
        store: "DEFAULT",
        api: {
          url: 'https://rest-api.shopizer.com/' // URL of your e-commerce platform
        }
      }
    }
  }
};
