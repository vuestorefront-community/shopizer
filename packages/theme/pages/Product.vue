<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="[{
          text: 'Home',
          route: {
            link: '/'
          }
        },
        {
          text: productGetters.getName(product)
        }]"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" class="product__gallery" />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="productGetters.getPrice(product).regular"
            :special="productGetters.getPrice(product).discounted ? productGetters.getPrice(product).special : ''"
          />
          <div>
            <div class="product__rating">
              <SfRating
                :score="product.rating"
                :max="5"
              />
              <!-- <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a> -->
            </div>
            <!-- <SfButton class="sf-button--text">{{ $t('Read all reviews') }}</SfButton> -->
          </div>
        </div>
        <div>
          <p class="product__description desktop-only" v-html="productGetters.getDescription(product)">
          </p>
          <!-- <SfButton class="sf-button--text desktop-only product__guide">
            {{ $t('Size guide') }}
          </SfButton> -->
          <p class="product__description desktop-only">
            Available Quantity: {{productGetters.getQuantity(product)}}
          </p>
          <SfSelect
            v-e2e="'size-select'"
            value=""
            v-if="properties.selectOptions.length > 0"
            :label="properties.selectOptions[0].option.name"
            class="sf-select--underlined product__select-size"
            valid
            :required="true"
            placeholder="Select Option"
          >
            <SfSelectOption
              v-for="(size, i) in properties.selectOptions"
              :key="i"
              :value="size.optionValue.code"
              @click="updateFilter({ color: size.optionValue.code })"
            >
              {{size.optionValue.name}}
            </SfSelectOption>
          </SfSelect>
          <div v-if="properties.radioOptions.length > 0" class="product__colors desktop-only">
            <p class="product__color-label">{{ properties.radioOptions[0].option.name }}:</p>
            <SfRadio
              v-for="(color, i) in properties.radioOptions"
              :key="i"
              :value="color.optionValue.code"
              :label="color.optionValue.name"
              class="product__color"
              @change="updateFilter({ size: color.optionValue.code })"
            />
          </div>
          <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="product.quantity"
            v-model="qty"
            :disabled="!product.available || !product.canBePurchased || !product.visible || product.quantity === 0 || qty === 0"
            :canAddToCart="product.quantity > 0"
            class="product__add-to-cart"
            @click="addItem({ product, quantity: parseInt(qty), customQuery: cartItem })"
          >
          <template #quantity-select-input>
            <div class="sf-add-to-cart__select-quantity sf-quantity-selector">
              <button data-testid="decrease" @click="qty > 0 && qty--" class="sf-button--pure sf-quantity-selector__button sf-button">−</button>
              <div data-testid="quantitySelector1434ce217ec1b" class="sf-input sf-quantity-selector__input has-text">
                <div class="sf-input__wrapper">
                  <input id="quantitySelector1434ce217ec1b" v-model="qty" name="quantitySelector1434ce217ec1b" type="number" data-testid="sf-quantity-selector input" class="">
                </div>
              </div>
              <button data-testid="increase" @click="qty++" class="sf-button--pure sf-quantity-selector__button sf-button">+</button>
            </div>
          </template>
          </SfAddToCart>
        </div>

      </div>
    </div>
    <LazyHydrate when-idle>
      <SfTabs :open-tab="1" class="product__tabs">
        <SfTab title="Description">
          <div class="product__description" v-html="productGetters.getDescription(product)">
              <!-- {{ productGetters.getDescription(product) }} -->
          </div>
          <SfProperty
            v-if="properties.weight"
            :name="'Weight'"
            :value="properties.weight"
            class="product__property"
          >
          </SfProperty>
          <SfProperty
            v-if="properties.length && properties.width && properties.height"
            :name="'Package size'"
            :value="`${properties.length || 0} x ${properties.width || 0} x ${properties.height || 0}`"
            class="product__property"
          >
          </SfProperty>
          <SfProperty
            v-for="(property, i) in properties.properties"
            :key="i"
            :name="property.property.name"
            :value="property.propertyValue.name"
            class="product__property"
          >
          </SfProperty>
        </SfTab>
        <SfTab title="Read reviews">
          <div v-show="reviewLoading">
            <SfLoader />
          </div>
          <div class="mainContainer">
            <div class="leftContainer">
              <div v-if="reviews.length > 0" key="reviews">
                <SfReview
                  v-for="review in reviews"
                  :key="reviewGetters.getReviewId(review)"
                  :author="reviewGetters.getReviewAuthor(review)"
                  :date="reviewGetters.getReviewDate(review)"
                  :message="reviewGetters.getReviewMessage(review)"
                  :max-rating="5"
                  :rating="reviewGetters.getReviewRating(review)"
                  :char-limit="170"
                  read-more-text="Read more"
                  hide-full-text="Read less"
                  class="product__review"
                />
              </div>
              <div v-else key="empty-cart" class="empty-cart">
                <div class="empty-cart__banner">
                  <SfImage
                    alt="Empty bag"
                    class="empty-cart__image"
                    :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
                  />
                  <SfHeading
                    title="No reivews yet"
                    :level="2"
                    class="empty-cart__heading"
                    description="There are not any reviews for this product yet!"
                  />
                </div>
              </div>
            </div>
            <div class="rightContainer form">
                <AddProductReview/>
            </div>
          </div>
        </SfTab>
        <!-- <SfTab
          title="Additional Information"
          class="product__additional-info"
        >
        <div class="product__additional-info">
          <p class="product__additional-info__title">{{ $t('Brand') }}</p>
          <p>{{ brand }}</p>
          <p class="product__additional-info__title">{{ $t('Instruction1') }}</p>
          <p class="product__additional-info__paragraph">
            {{ $t('Instruction2') }}
          </p>
          <p class="product__additional-info__paragraph">
            {{ $t('Instruction3') }}
          </p>
          <p>{{ careInstructions }}</p>
        </div>
        </SfTab> -->
      </SfTabs>
    </LazyHydrate>
    <!-- <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate> -->

    <!-- <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate> -->

  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfLoader,
  SfRadio
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed, useRoute, useRouter } from '@nuxtjs/composition-api';
import { useProduct, useCart, productGetters, useReview, reviewGetters, cartGetters } from '@vue-storefront/shopizer';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { addBasePath } from '@vue-storefront/core';
import AddProductReview from '~/components/AddProductReview.vue';
export default {
  name: 'Product',
  transition: 'fade',
  setup() {
    const qty = ref(1);
    const form = ref({});
    const route = useRoute();
    const router = useRouter();
    const { products, search } = useProduct('products');
    // const { products: relatedProducts, search: searchRelatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addItem, loading, cart } = useCart();
    const { reviews: productReviews, search: searchReviews, loading: reviewLoading } = useReview('productReviews');
    const id = computed(() => route.value.params.id);
    const cartItem = computed(() => cartGetters.getItems(cart.value));
    onSSR(async () => {
      await search({ sku: id.value, currentLanguageCode: 'en' });
      await searchReviews({ productId: products.value.id });
    });

    const product = computed(() => productGetters.getFiltered(products.value));
    const properties = computed(() => productGetters.getAttributes(products.value));
    // const options = computed(() => productGetters.getAttributes(products.value));
    // const configuration = computed(() => productGetters.getAttributes(product.value));
    // const categories = computed(() => productGetters.getCategoryIds(product.value));
    const reviews = computed(() => reviewGetters.getItems(productReviews.value));

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: addBasePath(img.imageUrl) },
      desktop: { url: addBasePath(img.imageUrl) },
      big: { url: addBasePath(img.imageUrl) },
      alt: img.imageName || img.imageName
    })));

    const updateFilter = (filter) => {
      router.push({
        path: route.value.path,
        query: {
          // ...configuration.value,
          ...filter
        }
      });
    };

    return {
      updateFilter,
      // configuration,
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() => productGetters.getAverageRating(product.value)),
      totalReviews: computed(() => productGetters.getTotalReviews(product.value)),
      // relatedProducts: computed(() => productGetters.getFiltered(relatedProducts.value, { master: true })),
      // relatedLoading,
      // options,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery,
      properties,
      cartItem,
      form,
      reviewLoading
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    LazyHydrate,
    AddProductReview,
    SfLoader,
    SfRadio
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.mainContainer{
  display: flex;
  justify-content: space-between;
  .rightContainer,
    .leftContainer{
      width: 49%;
  }
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  &__heading {
    padding: 0 var(--spacer-base);
  }
  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
  .mainContainer{
    display: flex;
  }
}
.sf-add-to-cart__select-quantity {
  --add-to-cart-select-quantity-margin: 0 var(--spacer-base) 0 0;
    flex: none;
    margin: 0 0 0 var(--spacer-xs);
    margin: var(--add-to-cart-select-quantity-margin, 0 0 0 var(--spacer-xs));
}
.sf-quantity-selector {
  position: relative;
    display: flex;
    align-items: center;
    justify-content: var(--quantity-selector-justify-content);
    box-sizing: border-box;
    height: 3.25rem;
    height: var(--quantity-selector-height, 3.25rem);
    width: 6.75rem;
    width: var(--quantity-selector-width, 6.75rem);
    background: var(--c-light);
    background: var(--quantity-selector-background, var(--c-light));
    font: var(--font-weight--normal) var(--font-size--lg)/1.6 var(--font-family--primary);
    font: var(--quantity-selector-font, var(--quantity-selector-font-weight, var(--font-weight--normal)) var(--quantity-selector-font-size, var(--font-size--lg))/var(--quantity-selector-font-line-height, 1.6) var(--quantity-selector-font-family, var(--font-family--primary)));
    border: solid var(--c-light);
    border: var(--quantity-selector-border, var(--quantity-selector-border-style, solid) var(--quantity-selector-border-color, var(--c-light)));
    border-width: 0;
    border-width: var(--quantity-selector-border-width, 0);
}
.sf-quantity-selector__button {
  --button-height: 100%;
  --button-padding: var(--spacer-2xs) var(--spacer-xs) 0;
  --button-background: transparent;
  --button-color: var(--c-text);
}
.sf-input.has-text {
    --input-label-top: 0;
    --input-label-font-size: var(--font-size--xs);
}
.sf-quantity-selector__input {
  --input-bar-display: none;
  --input-height: var(--quantity-selector-height, 3.25rem);
  --input-padding: 0;
  --input-margin: 0;
  --input-border: 0;
  --input-text-align: center;
}
.sf-input__wrapper {
    position: relative;
    margin: var(--input-margin, 0 0 var(--spacer-xs) 0);
    border-radius: 0;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
