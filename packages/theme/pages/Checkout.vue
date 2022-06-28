<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps :active="currentStep" @change="updateStep($event)">
          <SfStep name="Details">
            <!-- <SfPersonalDetails
              :value="personalDetails"
              @input="personalDetails = $event"
              :buttonText="logInButtonText"
              logInInfo="or fill the details below:"
              headingTitle="Personal details"
              :headingTitleLevel="2"
              :inputsLabels='["First name","Last name","Your email"]'
              additionalDetails=""
              :characteristics="null"
              transition="sf-fade"
              createAccountCheckboxLabel="I want to create an account"
              createAccountInputLabel="Create Password"
              @log-in="logInUser(personalDetails)"
            /> -->
            <div id="form-template">
            <form class="form sf-personal-details" data-v-6c22c3b3="" data-v-9e2f90d0="" @submit="detailsSubmit">
              <div class="log-in" v-if="!isAuthenticated" data-v-6c22c3b3="">
                <button @click="logInUser" data-testid="login-button" class="log-in__button sf-button--full-width color-secondary sf-button" data-v-6c22c3b3="">{{logInButtonText}}</button>
                <p class="log-in__info" data-v-6c22c3b3="">or fill the details below:</p>
              </div>
              <div class="sf-heading--left sf-heading--no-underline title sf-heading" data-v-6c22c3b3="">
                <h2 class="sf-heading__title h2" data-v-6c22c3b3=""> Personal details </h2>
                <div class="sf-heading__description display-none" data-v-6c22c3b3=""></div>
              </div>
              <ProfileDetails
                :isAuthenticated="isAuthenticated"
                :personalDetails="personalDetails"
               />
              <div class="actions form__action">
                <SfButton
                  type="submit"
                  class="sf-button--full-width actions__button"
                  data-testid="next-button"
                  >{{ steps[currentStep] }}</SfButton
                >
              </div>
            </form>
            </div>
          </SfStep>
          <SfStep name="Shipping">
            <ShippingMethodDetails
            :currentStep="steps[currentStep]"
            :countriesList="countriesList"
            :statesList="statesList"
            v-on:submitShippingForm="submitShippingForm"
            v-on:setStateListCountry="setStateListCountry"
            :shippingSubmittedData="shippingSubmittedData"
            />
          </SfStep>
          <SfStep name="Payment">
            <PaymentBillingDetails
            :shippingData="shippingSubmittedData"
            :currentStep="steps[currentStep]"
            :countriesList="countriesList"
            :statesList="statesList"
            :paymentSubmittedData="paymentSubmittedData"
            v-on:submitPaymentForm="submitPaymentForm"
            />
          </SfStep>
          <SfStep name="Review" v-if="cartData">
            <div data-v-68eea69a="" data-v-9e2f90d0="" class="sf-confirm-order">
              <div data-v-68eea69a="" class="sf-heading--left sf-heading--no-underline sf-confirm-order__heading sf-heading">
                <h2 data-v-68eea69a="" class="sf-heading__title h2"> Order details </h2>
                <div data-v-68eea69a="" class="sf-heading__description display-none"></div>
              </div>
              <table data-v-68eea69a="" class="sf-table sf-table--bordered sf-confirm-order__table" style="--_table-column-width:3;">
                <thead data-v-68eea69a="" class="sf-confirm-order__table-row">
                  <tr class="sf-table__heading">
                    <th data-v-68eea69a="" class="sf-table__header sf-confirm-order__table-header sf-confirm-order__table-image">Item</th>
                    <th data-v-68eea69a="" class="sf-table__header sf-confirm-order__table-header sf-confirm-order__table-description">Description </th>
                    <th data-v-68eea69a="" class="sf-table__header sf-confirm-order__table-header">Quantity </th>
                    <th data-v-68eea69a="" class="sf-table__header sf-confirm-order__table-header">Amount </th>
                  </tr>
                </thead>
                <tbody data-v-68eea69a="" data-testid="product-table-row" class="sf-confirm-order__table-row" v-for="(product, i) in cartData.products" :key="i">
                  <tr class="sf-table__row">
                    <td data-v-68eea69a="" class="sf-table__data sf-confirm-order__table-image">
                      <span data-v-68eea69a="" data-testid="product-image-table-data" class="sf-image--wrapper" style="--image-width:82px; --image-height:124px;">
                        <img loading="lazy" :src="cartGetters.getItemImage(product)" srcset="" sizes="" width="82" height="124" alt="Cream Beach Bag" data-testid="product-image-table-data" class="sf-image sf-image-loaded">
                        <img src="" alt="Placeholder" width="82" height="124" class="sf-image--placeholder display-none">
                        <span class="sf-image--overlay display-none"></span>
                        <noscript></noscript>
                      </span>
                    </td>
                    <td data-v-68eea69a="" class="sf-table__data sf-confirm-order__table-description" data-testid="product-description-table-data">
                      <div data-v-68eea69a="" class="sf-confirm-order__product-title">{{cartGetters.getItemName(product)}}</div>
                      <div data-v-68eea69a="" class="sf-confirm-order__product-sku">{{cartGetters.getItemSku(product)}}</div>
                    </td>
                    <td data-v-68eea69a="" class="sf-table__data sf-confirm-order__table-data">{{cartGetters.getItemQty(product)}}</td>
                    <td data-v-68eea69a="" class="sf-table__data sf-confirm-order__table-data">
                      <div data-v-68eea69a="" class="sf-confirm-order__product-price sf-price">
                        <span data-v-68eea69a="" class="sf-price__regular">{{cartGetters.getItemQty(product)}}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div data-v-68eea69a="" class="sf-confirm-order__totals">
                <div data-v-68eea69a="" class="
                      sf-property--full-width
                      sf-confirm-order__property sf-confirm-order__property-subtotal
                    sf-property">
                  <span data-v-68eea69a="" class="sf-property__name"> Subtotal </span>
                  <span data-v-68eea69a="" class="sf-property__value">{{ shippingQuote && shippingQuote.subTotal }}</span>
                </div>
                <div data-v-68eea69a="" class="sf-property--full-width sf-confirm-order__property sf-property">
                  <span data-v-68eea69a="" class="sf-property__name"> Shipping </span>
                  <span data-v-68eea69a="" class="sf-property__value"> $5.99 </span>
                </div>
                <hr data-v-68eea69a="" class="sf-confirm-order__divider sf-divider">
                <div data-v-68eea69a="" class="
                      sf-property--full-width sf-property--large
                      sf-confirm-order__property-total
                    sf-property">
                  <span data-v-68eea69a="" class="sf-property__name"> Total price </span>
                  <span data-v-68eea69a="" class="sf-property__value">{{ shippingQuote && shippingQuote.total }}</span>
                </div>
                <SfCheckbox
                  name="terms-and-conditions"
                  :required="false"
                  valid
                  class="form__element checkbox-card"
                  :disabled="false"
                  :selected="false"
                  v-model="agreeTAndC"
                >
                <template #label>
                  <div class="sf-checkbox__label"> I agree to <a data-v-68eea69a="" href="#" class="sf-link">Terms and conditions</a>
                    </div>
                </template>
                </SfCheckbox>
                <!-- <div data-v-68eea69a="" data-testid="terms" class="sf-checkbox sf-confirm-order__totals-terms">
                  <label class="sf-checkbox__container">
                    <input type="checkbox" name="terms" class="sf-checkbox__input" value="">
                    <span class="sf-checkbox__checkmark is-active">
                      <span class="sf-icon color-white">
                        <svg viewBox="0 0 24 24" preserveAspectRatio="none" class="sf-icon-path">
                          <defs class="">
                            <linearGradient id="linearGradient-271" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="1" stop-color="var(--icon-color)"></stop>
                              <stop offset="0" stop-color="var(--icon-color-negative, var(--c-gray-variant))"></stop>
                            </linearGradient>
                          </defs>
                          <path d="M10.7136 17C10.3594 17 10.0181 16.8476 9.76516 16.5711L6.38899 12.8793C5.87034 12.3122 5.87034 11.3859 6.38899 10.8194C6.90765 10.2522 7.75481 10.2522 8.27289 10.8194L10.6755 13.4465L15.6833 7.47328C16.1762 6.87859 17.0239 6.837 17.5672 7.3901C18.111 7.92914 18.1491 8.85607 17.6432 9.45009L11.7 16.5301C11.4599 16.8207 11.1057 17 10.7387 17L10.7136 17Z" fill="var(--icon-color)" style="height: 100%;"></path>
                        </svg>
                      </span>
                    </span>
                    <div data-v-68eea69a="" class="sf-checkbox__label"> I agree to <a data-v-68eea69a="" href="#" class="sf-link">Terms and conditions</a>
                    </div>
                  </label>
                  <div class="sf-checkbox__message">
                    <div class=""></div>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="actions">
              <SfButton
                class="sf-button--full-width actions__button"
                data-testid="next-button"
                @click="currentStep++"
                >{{ steps[currentStep] }}</SfButton
              >
            </div>
          </SfStep>
        </SfSteps>
      </div>
    </div>
    <div class="actions">
      <SfButton
        class="
          sf-button--full-width sf-button--underlined
          actions__button
          smartphone-only
        "
        @click="currentStep--"
        >Go back</SfButton
      >
    </div>
  </div>
</template>
<script>
import {
  SfSteps,
  SfButton,
  SfPersonalDetails,
  SfShipping,
  SfPayment,
  SfConfirmOrder,
  SfOrderSummary,
  SfOrderReview,
  SfInput,
  SfCheckbox
} from '@storefront-ui/vue';
import { useCart, cartGetters, useContent, useUser, userGetters } from '@vue-storefront/shopizer';
import { computed } from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import ProfileDetails from '~/components/Checkout/ProfileDetails';
import ShippingMethodDetails from '~/components/Checkout/ShippingMethodDetails';
import PaymentBillingDetails from '~/components/Checkout/PaymentBillingDetails';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Checkout',
  setup() {
    const { cart } = useCart();
    const { getShippingQuote, shippingQuote, getCountry, countryData, getState, stateData, getShippingOptions, shippingOptions} = useContent();
    const { toggleLoginModal } = useUiState();
    const { isAuthenticated, user } = useUser();
    onSSR(async () => {
      await Promise.all([
        getCountry({ currentLanguageCode: 'en' })
      ]);
    });
    const cartData = computed(() => cartGetters.getItems(cart.value));
    const userData = computed(() => userGetters.getUserData(user.value));
    const shipCountryData = computed(() => countryData.value);
    if (typeof window !== 'undefined') {
      getShippingQuote({ cartId: localStorage.getItem('cartId') });
      getShippingOptions({ cartId: localStorage.getItem('cartId'), postalCode: 'R8A', countryCode: 'CA' });
    }
    console.log('shippingOptions', shippingOptions);

    const logInUser = (e) => {
      e.preventDefault();
      if (isAuthenticated.value === false) {
        toggleLoginModal();
      }
    };

    const setStateListCountry = (country) => {
      getState(country);
    };
    const StateData = computed(() => stateData.value);

    return {
      cartData,
      cartGetters,
      logInUser,
      isAuthenticated,
      userData,
      shipCountryData,
      setStateListCountry,
      StateData,
      shippingQuote
    };
  },
  mounted() {
    if (this.shipCountryData.length > 0) {
      this.countriesList = [...this.shipCountryData];
    }
  },
  components: {
    SfSteps,
    SfPersonalDetails,
    SfShipping,
    SfPayment,
    SfConfirmOrder,
    SfOrderSummary,
    SfOrderReview,
    SfButton,
    SfInput,
    ProfileDetails,
    ShippingMethodDetails,
    PaymentBillingDetails,
    SfCheckbox
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        'Go to shipping',
        'Go to payment',
        'Pay for order',
        'Confirm and pay'
      ],
      personalDetails: {
        firstName: this.isAuthenticated ? this.userData.firstName : '',
        lastName: this.isAuthenticated ? this.userData.lastName : '',
        email: this.isAuthenticated ? this.userData.emailAddress : '',
        password: '',
        checkCreateAccount: false
      },
      shipping: {
        firstName: '',
        lastName: '',
        streetName: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
        shippingMethod: {
          price: '$0.00'
        }
      },
      order: {
        password: '',
        createAccount: false,
        firstName: 'John',
        lastName: 'Dog',
        email: 'john.dog@gmail.com'
      },
      paymentMethods: [
        {
          label: 'Visa Debit',
          value: 'debit'
        },
        {
          label: 'MasterCard',
          value: 'mastercard'
        },
        {
          label: 'Visa Electron',
          value: 'electron'
        },
        {
          label: 'Cash on delivery',
          value: 'cash'
        },
        {
          label: 'Check',
          value: 'check'
        }
      ],
      shippingMethods: [
        {
          isOpen: false,
          price: 'Free',
          delivery: 'Delivery from 3 to 7 business days',
          label: 'Pickup in the store',
          value: 'store',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Delivery to home',
          value: 'home',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Paczkomaty InPost',
          value: 'inpost',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          price: '$11.00',
          delivery: 'Delivery within 48 hours',
          label: '48 hours coffee',
          value: 'coffee',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          price: '$14.00',
          delivery: 'Delivery within 24 hours',
          label: 'Urgent 24h',
          value: 'urgent',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        }
      ],
      buttonNames: [
        { name: 'Go to shipping' },
        { name: 'Go to payment' },
        { name: 'Review Order' },
        { name: 'Place my order' }
      ],
      logInButtonText: 'Log into your account',
      shippingSubmittedData: {},
      paymentSubmittedData: {},
      countriesList: [],
      statesList: [],
      agreeTAndC: false
    };
  },
  watch: {
    shipping(newVal, oldVal) {
      if (newVal.shippingMethod !== oldVal.shippingMethod) {
        const method = this.shippingMethods.find(
          (method) => method.value === newVal.shippingMethod
        );
        return method
          ? (newVal.shippingMethod = method)
          : (newVal.shippingMethod = { price: '$0.00' });
      }
    },
    isAuthenticated(nV) {
      if (nV === true) {
        this.logInButtonText = 'Logged in';
      }
    },
    userData(nV) {
      this.personalDetails = {
        firstName: nV.firstName,
        lastName: nV.lastName,
        email: nV.emailAddress
      };
    },
    StateData(nV, oV) {
      console.log('state data', nV, oV);
      if (nV.length > 0) {
        this.statesList = [...nV];
      }
    }
  },
  methods: {
    updateStep(next) {
      // prevent to move next by SfStep header
      if (next < this.currentStep) {
        this.currentStep = next;
      }
    },
    detailsSubmit(e) {
      e.preventDefault();
      const nextStep = this.currentStep;
      this.currentStep = nextStep + 1;
    },
    createAccCheckbox(e) {
      this.createAccountCheck = e.target.checked;
    },
    submitShippingForm(data) {
      this.shippingSubmittedData = data;
      const nextStep = this.currentStep;
      this.currentStep = nextStep + 1;
    },
    submitPaymentForm(data) {
      this.paymentSubmittedData = data;
      const nextStep = this.currentStep;
      this.currentStep = nextStep + 1;
    },
    submit() {
      console.log('submit');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.checkout {
  --steps-content-padding: 0 var(--spacer-sm);
  @include for-desktop {
    --steps-content-padding: 0;
    display: flex;
  }
  &__main {
    ::v-deep .sf-steps__step.is-done {
      --steps-step-color: var(--c-primary);
    }
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }
  &__aside {
    @include for-desktop {
      flex: 0 0 26.8125rem;
      margin: 0 0 0 var(--spacer-base);
    }
    &-order {
      box-sizing: border-box;
      width: 100%;
      background: var(--c-light);
      padding: var(--spacer-base) var(--spacer-sm) var(--spacer-xl);
      @include for-desktop {
        padding: var(--spacer-xl);
      }
    }
  }
}
.actions {
  background: var(--c-white);
  padding: var(--spacer-sm);
  box-shadow: 0px -2px 10px rgba(154, 154, 154, 0.15);
  text-align: center;
  position: sticky;
  bottom: 0;
  &__button {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    position: relative;
    box-shadow: none;
    padding: 0;
    width: 25rem;
    &__button {
      margin: 0;
    }
  }
}
</style>
