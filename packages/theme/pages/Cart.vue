<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="[
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'Cart'
        }
      ]"
    />
    <div class="detailed-cart">
      <div data-v-c5d9551c="" class="detailed-cart__aside">
		<div data-v-30fc7773="" data-v-c5d9551c="" class="sf-order-summary" total-items="2">
			<div data-v-30fc7773="" class="
				sf-heading--left sf-heading--no-underline
				sf-order-summary__heading
			sf-heading">
			<h2 data-v-30fc7773="" class="sf-heading__title h2"> Order review </h2>
			<div data-v-30fc7773="" class="sf-heading__description display-none"></div>
			</div>
			<div data-v-30fc7773="" class="highlighted highlighted--total">
			<div data-v-30fc7773="" class="
				sf-property--full-width sf-property--large
				sf-order-summary__property
				sf-property">
				<span data-v-30fc7773="" class="sf-property__name"> Subtotal </span>
				<span data-v-30fc7773="" class="sf-property__value">{{cartGetters.getFormattedPrice(cartData).displaySubTotal}}</span>
			</div>
			<hr data-v-30fc7773="" class="sf-order-summary__divider sf-divider">
			<div data-v-30fc7773="" class="
				sf-property--full-width sf-property--large
				sf-order-summary__property
				sf-property">
				<span data-v-30fc7773="" class="sf-property__name">Total price</span>
				<span data-v-30fc7773="" class="sf-property__value">{{cartGetters.getFormattedPrice(cartData).displayTotal}}</span>
			</div>
			</div>
      <div data-v-30fc7773="" class="sf-property--full-width sf-property--large sf-order-summary__property sf-property" v-if="cartGetters.getCoupons(cartData)">
        <span data-v-30fc7773="" class="sf-property__name">Your coupon code has been applied!</span>
        <span data-v-30fc7773="" class="sf-property__value">{{cartGetters.getCoupons(cartData)}}</span>
			</div>
			<div data-v-30fc7773="" class="highlighted sf-order-summary__promo-code" v-else>
          <div data-v-30fc7773="" data-testid="promoCode" class="sf-input sf-input--filled sf-order-summary__promo-code-input">
            <div class="sf-input__wrapper">
            <input id="promoCode" name="promoCode" type="text" class="">
            <span class="sf-input__bar"></span>
            <label for="promoCode" class="sf-input__label">Enter promo code</label>
            <button type="button" aria-label="switch-visibility-password" aria-pressed="false" class="display-none sf-input__password-button sf-button">
              <span class="sf-input__password-icon sf-icon hidden" style="--icon-size:1.5rem;">
              <svg viewBox="0 0 24 24" preserveAspectRatio="none" class="sf-icon-path">
                <defs class="">
                <linearGradient id="linearGradient-434" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="1" stop-color="var(--icon-color)"></stop>
                  <stop offset="0" stop-color="var(--icon-color-negative, var(--c-gray-variant))"></stop>
                </linearGradient>
                </defs>
                <path d="M11.974 17.727c3.815 0 7.425-2.052 9.903-5.63a.41.41 0 000-.466C19.399 8.051 15.789 6 11.974 6 8.16 6 4.55 8.053 2.073 11.631a.409.409 0 000 .466c2.477 3.577 6.086 5.63 9.901 5.63zm0-10.909c3.46 0 6.749 1.836 9.065 5.046-2.316 3.21-5.606 5.045-9.065 5.045-3.46 0-6.749-1.834-9.064-5.045 2.314-3.211 5.604-5.046 9.064-5.046z" fill="var(--icon-color)" style="height: 100%;"></path>
                <path d="M11.974 16.257a4.399 4.399 0 004.395-4.394 4.399 4.399 0 00-4.395-4.394 4.399 4.399 0 00-4.394 4.395 4.399 4.399 0 004.394 4.393zm0-7.97a3.58 3.58 0 013.576 3.576 3.58 3.58 0 01-3.576 3.576 3.58 3.58 0 01-3.576-3.576 3.58 3.58 0 013.576-3.576z" fill="var(--icon-color)" style="height: 100%;"></path>
                <path d="M11.974 14.43a2.57 2.57 0 002.568-2.567 2.57 2.57 0 00-3.734-2.285.41.41 0 00-.21.468l.265 1.005-.876-.188a.41.41 0 00-.478.287 2.57 2.57 0 002.465 3.28z" fill="var(--icon-color)" style="height: 100%;"></path>
              </svg>
              </span>
            </button>
            </div>
            <div class="sf-input__error-message">
            <div class="display-none"></div>
            </div>
          </div>
          <button data-v-30fc7773="" data-testid="apply-button" class="sf-order-summary__promo-code-button sf-button"> Apply </button>
      </div>
      <nuxt-link :to="localePath({ name: 'shipping' })">
          <SfButton
            class="sf-button--full-width color-primary"
          >
            {{ $t('Go to checkout') }}
          </SfButton>
      </nuxt-link>
		</div>
		</div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="cartData"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <SfCollectedProduct
                v-for="product in cartData.products"
                :key="product.id"
                :image="addBasePath(cartGetters.getItemImage(product))"
                :title="cartGetters.getItemName(product)"
                :regular-price="cartGetters.getItemPrice(product).special"
                class="sf-collected-product--detailed collected-product"
                @click:remove="removeItem({ product: { id: product.id } })"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      :key="product.id"
                      name="SUBTOTAL"
                      :value="product.displaySubTotal"
                    />
                  </div>
                </template>
				<template #input>
                  <div class="sf-collected-product__quantity-wrapper">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateQuantity({ product: { id: product.id }, quantity: Number($event) })"
                    />
                  </div>
                </template>
                <template #actions>
                  <div class="actions desktop-only">
                    <!-- <SfButton class="sf-button--text actions__button"
                      >Edit</SfButton
                    >
                    <SfButton class="sf-button--text actions__button"
                      >Save for later</SfButton
                    >
                    <SfButton class="sf-button--text actions__button"
                      >Add to compare</SfButton
                    >
                    <SfButton class="sf-button--text actions__button"
                      >Add message or gift wrap</SfButton
                    > -->
                    <!-- <span class="actions__description">
                      Usually arrives in 5-13 business days. A shipping timeline
                      specific to your destination can be viewed in Checkout.
                    </span> -->
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
          <div v-else key="empty-cart" class="empty-cart">
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
              :width="140"
              :height="200"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
            />
            <SfButton
              class="sf-button--full-width color-primary empty-cart__button"
              >Start shopping</SfButton
            >
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfCollectedProduct,
  SfButton,
  SfImage,
  SfProperty,
  SfHeading,
  SfBreadcrumbs,
  SfOrderSummary,
  SfQuantitySelector
} from '@storefront-ui/vue';
import { useCart, cartGetters } from '@vue-storefront/shopizer';
import { computed } from '@nuxtjs/composition-api';
import { addBasePath } from '@vue-storefront/core';
import debounce from 'lodash.debounce';
export default {
  name: 'DetailedCart',
  components: {
    SfCollectedProduct,
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
    SfProperty,
    SfOrderSummary,
    SfQuantitySelector
  },
  setup() {
    const { cart, removeItem, updateItemQty, loading } = useCart();
    const cartData = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const updateQuantity = debounce(async ({ product, quantity }) => {
      await updateItemQty({ product, quantity });
    }, 500);
    return {
      updateQuantity,
      cartData,
      totalItems,
      addBasePath,
      cartGetters,
      removeItem,
      loading
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    box-sizing: border-box;
    width: 100%;
    background: var(--c-light);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;
    &__main {
      flex: 1;
    }
    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      padding: var(--spacer-xl);
    }
  }
}
.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:first-of-type {
    border-top: none;
  }
  &__properties {
    --property-value-font-weight: var(--font-weight--normal);
    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}
.actions {
  &__button {
    display: block;
    margin: 0 0 var(--spacer-xs) 0;
    color: var(--c-text);
    &:hover {
      color: var(--c-text-muted);
    }
  }
  &__description {
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
    color: var(--c-text-muted);
    position: absolute;
    bottom: 0;
    padding-bottom: var(--spacer-lg);
  }
}
.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__image {
    --image-width: 13.1875rem;
    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }
    &__button {
      --button-width: 20.9375rem;
    }
  }
}
</style>
