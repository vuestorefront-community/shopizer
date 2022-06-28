<template>
  <form name="form" @submit="submit" class="form">
    <div
      class="sf-heading--left sf-heading--no-underline title sf-heading"
    >
      <h2 data-v-25c4ffa6="" class="sf-heading__title h2">Shipping</h2>
    </div>
    <div class="form">
      <SfInput
        :value="shippingData.firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        type="text"
        :valid="firstNameBlur || validFirstName(shippingData.firstName)"
        error-message="Please type your name"
        @blur="firstNameBlur = false"
        :required="true"
        v-model="shippingData.firstName"
      />
      <SfInput
        :value="shippingData.lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        type="text"
        :valid="lastNameBlur || validLastName(shippingData.lastName)"
        error-message="Please type your last name. Your name should have at least one character."
        @blur="lastNameBlur = false"
        :required="true"
        v-model="shippingData.lastName"
      />
      <SfInput
        :value="shippingData.streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        type="text"
        :valid="streetNameBlur || validStreetName(shippingData.streetName)"
        error-message="Please type your street name"
        @blur="streetNameBlur = false"
        :required="true"
        v-model="shippingData.streetName"
      />
      <SfInput
        :value="shippingData.city"
        label="City"
        name="city"
        type="text"
        class="form__element form__element--half"
        :valid="cityBlur || validCity(shippingData.city)"
        error-message="Please type your city."
        @blur="cityBlur = false"
        :required="true"
        v-model="shippingData.city"
      />
      <SfComponentSelect
        v-model="shippingData.state"
        label="State/Province"
        name="state"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        :required="true"
        :valid="stateBlur || validState(shippingData.state)"
        error-message="Please type your state."
        :disabled="statesList.length > 0 ? false : true"
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
        :value="shippingData.zipCode"
        label="Zip- code"
        name="zip-code"
        class="form__element form__element--half"
        type="text"
        :valid="zipCodeBlur || validZipCode(shippingData.zipCode)"
        error-message="Please type your zip code. Zipcode should have only numbers."
        @blur="zipCodeBlur = false"
        :required="true"
        v-model="shippingData.zipCode"
      />
      <SfComponentSelect
        v-model="shippingData.country"
        label="Country"
        :default="countries[0]"
        class="
          form__element
          form__element--half
          form__element--half-even
          form__select
          sf-component-select--underlined
        "
        :required="true"
        :valid="countryBlur || validCountry(shippingData.country)"
        error-message="Please choose your country."
        @blur="countryBlur = false"
        @change="onCountrySelect"
      >
        <SfComponentSelectOption
          v-for="(countryOption, index) in countriesList"
          :key="index"
          :value="countryOption.code"
        >
          {{ countryOption.name}}
        </SfComponentSelectOption>
      </SfComponentSelect>
      <SfInput
        v-model="shippingData.phoneNumber"
        label="Phone number"
        name="phone"
        type="number"
        class="form__element"
        required
        :valid="phoneNumberBlur || validPhoneNumber(shippingData.phoneNumber)"
        error-message="Please type your phone number."
        @blur="phoneNumberBlur = false"
      />
    </div>
    <div class="sf-heading--left sf-heading--no-underline title sf-heading">
      <h2 class="sf-heading__title h2">
        Shipping method
      </h2>
    </div>
    <div class="form sf-shipping">
      <div class="form__element" v-for="method in shippingMethods" :key="method.value">
        <RadioSelect
        v-on:checkEvent="shippingCheckRadio"
        :method="method" />
      </div>
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
  SfComponentSelect
} from '@storefront-ui/vue';
import RadioSelect from './RadioSelect';
export default {
  name: 'ShippingMethodDetails',
  props: {
    currentStep: String,
    countriesList: Array,
    statesList: Array,
    shippingSubmittedData: Object
  },
  components: {
    SfInput,
    SfButton,
    SfShipping,
    SfComponentSelect,
    RadioSelect
  },
  data() {
    return {
      shippingMethods: [
        {
          isOpen: false,
          selected: false,
          price: 'Free',
          delivery: 'Delivery from 3 to 7 business days',
          label: 'Pickup in the store',
          value: 'store',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          selected: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Delivery to home',
          value: 'home',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,

          selected: false,
          price: '$9.90',
          delivery: 'Delivery from 4 to 6 business days',
          label: 'Paczkomaty InPost',
          value: 'inpost',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          selected: false,
          price: '$11.00',
          delivery: 'Delivery within 48 hours',
          label: '48 hours coffee',
          value: 'coffee',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        },
        {
          isOpen: false,
          selected: false,
          price: '$14.00',
          delivery: 'Delivery within 24 hours',
          label: 'Urgent 24h',
          value: 'urgent',
          description:
            'Novelty! From now on you have the option of picking up an order in the selected InPack parceled. Just remember that in the case of orders paid on delivery, only the card payment will be accepted.'
        }
      ],
      countries: [{
        name: 'Austria',
        code: 'AU'
      }, {
        name: 'Canada',
        code: 'CA'
      }, {
        name: 'Switzerland',
        code: 'SW'
      }],
      states: ['Lower Austria', 'Upper Austria', 'Styria', 'Bern/Berne', 'Luzern'],
      shippingData: {
        firstName: '',
        lastName: '',
        streetName: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        shippingMethodSelected: ''
      },
      valid: false,
      firstNameBlur: true,
      lastNameBlur: true,
      streetNameBlur: true,
      cityBlur: true,
      stateBlur: true,
      zipCodeBlur: true,
      countryBlur: true,
      phoneNumberBlur: true
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const isValidate = this.validate();
      if (isValidate) {
        this.$emit('submitShippingForm', this.shippingData);
      }
    },
    validate() {
      let validRes = false;
      this.firstNameBlur = false;
      this.lastNameBlur = false;
      this.streetNameBlur = false;
      this.cityBlur = false;
      this.stateBlur = false;
      this.zipCodeBlur = false;
      this.countryBlur = false;
      this.phoneNumberBlur = false;
      if (
        this.validPhoneNumber(this.shippingData.phoneNumber) &&
        this.validFirstName(this.shippingData.firstName) &&
        this.validLastName(this.shippingData.lastName) &&
        this.validStreetName(this.shippingData.streetName) &&
        this.validCity(this.shippingData.city) &&
        this.validState(this.shippingData.state) &&
        this.validCountry(this.shippingData.country) &&
        this.validZipCode(this.shippingData.zipCode)
      ) {
        this.valid = true;
        validRes = true;
      }
      if (this.shippingData.shippingMethodSelected.length === 0) {
        validRes = false;
      }
      return validRes;
    },
    validFirstName(firstName) {
      return firstName.length > 2;
    },
    validLastName(lastName) {
      return lastName.length > 2;
    },
    validStreetName(streetName) {
      return streetName.length > 2;
    },
    validCity(city) {
      return city.length > 2;
    },
    validState(state) {
      return Boolean(state);
    },
    validZipCode(zipCode) {
      const regex = /^[0-9]/;
      return regex.test(zipCode);
    },
    validPhoneNumber(phone) {
      const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return regex.test(phone);
    },
    validCountry(country) {
      return Boolean(country);
    },
    shippingCheckRadio(event) {
      this.shippingData.shippingMethodSelected = event;
      this.shippingMethods.map(item => {
        if (item.value === event) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
    },
    onCountrySelect(v) {
      if (v && v !== '') {
        this.shippingData.state = '';
        this.$emit('setStateListCountry', v);
      }
    }
  },
  mounted() {
    if (this.shippingSubmittedData.firstName) {
      this.shippingData = this.shippingSubmittedData;
      if (this.shippingSubmittedData.shippingMethodSelected) {
        this.shippingMethods.forEach(method => {
          if (method.value === this.shippingSubmittedData.shippingMethodSelected) {
            method.selected = true;
          }
        });
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
