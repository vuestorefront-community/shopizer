module.exports = {
  integrations: {
    shopizer: {
      location: '@vue-storefront/shopizer-api/server',
      configuration: {
        api: {
          url: 'http://aws-demo.shopizer.com:8080/' // URL of your e-commerce platform
        }
      }
    }
  }
};
