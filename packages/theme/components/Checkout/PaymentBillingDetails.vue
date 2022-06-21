<template>
  <form name="form" @submit="submit" class="form">
    <div class="sf-heading--left sf-heading--no-underline title sf-heading form__element">
      <h2 class="sf-heading__title h2">
        Payment methods
      </h2>
    </div>
    <div class="form sf-shipping form__element sf-payment">
      <PaymentOptions :cardData="paymentData" />
    </div>
    <div
      class="sf-heading--left sf-heading--no-underline title sf-heading"
    >
      <h2 data-v-25c4ffa6="" class="sf-heading__title h2">Billing address</h2>
    </div>
    <div class="form">
      <SfCheckbox
        name="copy-address"
        label="Copy address data from shipping"
        :required="false"
        valid
        class="form__element"
        :disabled="false"
        :selected="false"
        v-model="paymentData.sameAsShipping"
        @change="fillPaymentData"
      />
      <SfInput
        :value="paymentData.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        type="text"
        error-message="Please type your name"
        @blur="firstNameBlur = false"
        :required="false"
        v-model="paymentData.firstName"
      />
      <SfInput
        :value="paymentData.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        type="text"
        error-message="Please type your last name. Your name should have at least one character."
        @blur="lastNameBlur = false"
        :required="false"
        v-model="paymentData.lastName"
      />
      <SfInput
        :value="paymentData.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        type="text"
        error-message="Please type your street name"
        @blur="streetNameBlur = false"
        :required="false"
        v-model="paymentData.streetName"
      />
      <SfInput
        :value="paymentData.city"
        label="City"
        name="city"
        type="text"
        class="form__element form__element--half"
        error-message="Please type your city."
        @blur="cityBlur = false"
        :required="false"
        v-model="paymentData.city"
      />
      <SfComponentSelect
        v-model="paymentData.state"
        label="State/Province"
        name="state"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        :required="false"
        error-message="Please type your state."
        @blur="stateBlur = false"
      >
        <SfComponentSelectOption
          v-for="(stateOption, index) in statesList"
          :key="index"
          :value="stateOption.code"
        >
          {{ stateOption.name }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfInput
        :value="paymentData.zipCode"
        label="Zip- code"
        name="zip-code"
        class="form__element form__element--half"
        type="text"
        error-message="Please type your zip code. Zipcode should have only numbers."
        @blur="zipCodeBlur = false"
        :required="false"
        v-model="paymentData.zipCode"
      />
      <SfComponentSelect
        v-model="paymentData.country"
        label="Country"
        :default="countries[0]"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        :required="false"
        error-message="Please choose your country."
        @blur="countryBlur = false"
      >
        <SfComponentSelectOption
          v-for="(countryOption, index) in countriesList"
          :key="index"
          :value="countryOption.code"
        >
          {{ countryOption.name }}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfInput
        v-model="paymentData.phoneNumber"
        label="Phone number"
        name="phone"
        type="number"
        class="form__element"
        :required="false"
        error-message="Please type your phone number."
        @blur="phoneNumberBlur = false"
      />
    </div>
    <div class="actions">
      <SfButton
        class="sf-button--full-width actions__button"
        data-testid="next-button"
        type="submit"
        >{{ currentStep }}</SfButton
      >
    </div>
  </form>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfShipping,
  SfComponentSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import PaymentOptions from './PaymentOptions.vue';
export default {
  name: 'PaymentBillingDetails',
  props: {
    currentStep: String,
    shippingData: Object,
    countriesList: Array,
    statesList: Array
  },
  components: {
    SfInput,
    SfButton,
    SfShipping,
    SfComponentSelect,
    SfCheckbox,
    PaymentOptions
  },
  data() {
    return {
      countries: ['Austria', 'Azerbaijan', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'],
      states: ['Lower Austria', 'Upper Austria', 'Styria', 'Bern/Berne', 'Luzern'],
      paymentData: {
        sameAsShipping: false,
        firstName: '',
        lastName: '',
        streetName: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
        cardNumber: '',
        cardHolder: '',
        cardMonth: '',
        cardYear: '',
        cardCVC: '',
        cardKeep: false
      },
      valid: false
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const isValidate = this.validate();
      if (isValidate) {
        this.$emit('submitPaymentForm', this.paymentData);
      }
    },
    validate() {
      let validRes = false;
      if (
        this.validCardNumber(this.paymentData.cardNumber) &&
        this.validCardHolder(this.paymentData.cardHolder) &&
        this.validCardCVC(this.paymentData.cardCVC) &&
        this.validCardExpMonth(this.paymentData.cardMonth) &&
        this.validCardExpYear(this.paymentData.cardYear)
      ) {
        this.valid = true;
        validRes = true;
      }
      return validRes;
    },
    validCardNumber(cardNumber) {
      return cardNumber.length > 2;
    },
    validCardHolder(cardHolder) {
      return cardHolder.length > 2;
    },
    validCardCVC(cardCVC) {
      return cardCVC.length > 2;
    },
    validCardExpMonth(expMonth) {
      return Boolean(expMonth);
    },
    validCardExpYear(expYear) {
      return Boolean(expYear);
    },
    fillPaymentData(event) {
      if (event === true) {
        this.paymentData.firstName = this.shippingData.firstName;
        this.paymentData.lastName = this.shippingData.lastName;
        this.paymentData.streetName = this.shippingData.streetName;
        this.paymentData.city = this.shippingData.city;
        this.paymentData.country = this.shippingData.country;
        this.paymentData.state = this.shippingData.state;
        this.paymentData.phoneNumber = this.shippingData.phoneNumber;
        this.paymentData.zipCode = this.shippingData.zipCode;
      } else {
        this.paymentData.firstName = '';
        this.paymentData.lastName = '';
        this.paymentData.streetName = '';
        this.paymentData.city = '';
        this.paymentData.country = '';
        this.paymentData.state = '';
        this.paymentData.phoneNumber = '';
        this.paymentData.zipCode = '';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
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
#form-template {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 870px;
    margin: 0 auto;
  }
}
.checkout__main .sf-steps__content {
  .sf-step .form {
    margin: 0;
  }
}
.form {
  padding: var(--spacer-sm) 0;
  &__group {
    display: flex;
    align-items: flex-start;
  }
  &__action-button {
    &:first-child {
      margin: var(--spacer-sm) 0 0 0;
    }
    &--secondary {
      margin: var(--spacer-sm) 0 var(--spacer-sm) var(--spacer-base);
    }
  }
  &__button {
    --button-width: 100%;
  }
  @include for-mobile {
    .sf-button {
      --button-width: auto;
      margin-top: var(--spacer-xs);
    }
    .actions .actions__button {
      width: 100%;
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 var(--spacer-2xl) 0 0;
    &:last-of-type {
      margin: 0 calc(var(--spacer-2xl) - var(--spacer-sm)) 0 0;
    }
    &__element {
      margin: 0 0 var(--spacer-sm) 0;
      flex: 0 0 100%;
      &--half {
        flex: 1 1 50%;
        &-even {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
    &__action {
      flex: 0 0 100%;
      display: flex;
    }
    &__button {
      --button-width: auto;
    }
  }
}
</style>
