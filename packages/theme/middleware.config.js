module.exports = {
  integrations: {
    shopizer: {
      location: '@vue-storefront/shopizer-api/server',
      configuration: {
        store: "DEFAULT",
        api: {
          url: 'http://aws-demo.shopizer.com:8080' // URL of your e-commerce platform
        }
      }
    }
  }
};
