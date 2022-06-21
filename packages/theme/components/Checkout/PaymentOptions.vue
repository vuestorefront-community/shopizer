<template>
  <div>
    <div class="cardForm">
      <div class="credit-card-form">
        <SfInput
          :value="cardData.cardNumber"
          label="Card Number"
          name="card-number"
          class="form__element credit-card-form__input"
          type="number"
          :valid="cardNumberBlur || validCardNumber(cardData.cardNumber)"
          error-message="Please type your card number"
          @blur="cardNumberBlur = false"
          :required="true"
          v-model="cardData.cardNumber"
        />
        <SfInput
          :value="cardData.cardHolder"
          label="Card Holder"
          name="card-holder"
          class="form__element credit-card-form__input"
          type="text"
          :valid="cardHolderBlur || validCardNumber(cardData.cardHolder)"
          error-message="Please type your card number"
          @blur="cardHolderBlur = false"
          :required="true"
          v-model="cardData.cardHolder"
        />
        <div data-v-7b739f46="" class="credit-card-form__group">
          <span
            data-v-7b739f46=""
            class="
              credit-card-form__label
              credit-card-form__label--small
              credit-card-form__label--required
            "
          ></span>
          <div data-v-7b739f46="" class="credit-card-form__element">
            <SfComponentSelect
              v-model="cardData.cardMonth"
              label="Month"
              class="
                form__element form__element--half form__select
                credit-card-form__input credit-card-form__input--with-spacer
                sf-component-select--underlined
              "
              :required="true"
              :valid="cardExpMonthBlur || validCardExpMonth(cardData.cardMonth)"
              error-message="Please choose expiry month"
              @blur="cardExpMonthBlur = false"
            >
              <SfComponentSelectOption
                v-for="month in ['Jan', 'Feb', 'March']"
                :key="month"
                :value="month"
              >
                {{ month }}
              </SfComponentSelectOption>
            </SfComponentSelect>
            <SfComponentSelect
              v-model="cardData.cardYear"
              label="Year"
              class="
                form__element form__element--half form__select
                credit-card-form__input
                sf-component-select--underlined
              "
              :required="true"
              :valid="cardExpYearBlur || validCardExpYear(cardData.cardYear)"
              error-message="Please choose expiry year"
              @blur="cardExpYearBlur = false"
            >
              <SfComponentSelectOption
                v-for="year in ['2022', '2023', '2024']"
                :key="year"
                :value="year"
              >
                {{ year }}
              </SfComponentSelectOption>
            </SfComponentSelect>
          </div>
        </div>
        <div data-v-7b739f46="" class="credit-card-form__group">
          <div
            data-v-7b739f46=""
            data-testid="cardCVC"
            class="
              sf-input
              credit-card-form__input
              credit-card-form__input--small
              credit-card-form__input--with-spacer
            "
          >
            <SfInput
              :value="cardData.cardCVC"
              label="Code CVC"
              name="code-cvc"
              class="form__element credit-card-form__input"
              type="number"
              :valid="cardCVCBlur || validCardNumber(cardData.cardCVC)"
              error-message="Please type your CVC"
              @blur="cardCVCBlur = false"
              :required="true"
              v-model="cardData.cardCVC"
            />
          </div>
          <span
            data-v-7b739f46=""
            aria-label="button"
            class="sf-button--text credit-card-form__button sf-button"
          >
            Where can I find CVC code
          </span>
        </div>
        <SfCheckbox
          name="save-card"
          label="Save this card for other purchases"
          :required="false"
          valid
          class="form__element"
          :disabled="false"
          :selected="false"
          v-model="cardData.cardKeep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfRadio,
  SfComponentSelect,
  SfInput,
  SfCheckbox
} from '@storefront-ui/vue';
export default {
  name: 'PaymentOptions',

  components: {
    SfButton,
    SfRadio,
    SfComponentSelect,
    SfInput,
    SfCheckbox
  },
  props: {
    cardData: Object
  },
  data() {
    return {
      selectedMethod: '',
      cardNumberBlur: true,
      cardHolderBlur: true,
      cardCVCBlur: true,
      cardExpMonthBlur: true,
      cardExpYearBlur: true
    };
  },
  setup() {
    return {
      shippingMethods: ''
    };
  },
  methods: {
    selectMethod(method) {
      if (
        method === 'visa_debit' ||
        method === 'master_card' ||
        method === 'visa_electron'
      ) {
        console.log('in method', this.showCardForm);
        this.showCardForm = true;
      } else {
        this.showCardForm = false;
      }
      this.selectedMethod = method;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
@include for-desktop {
  .sf-payment .payment-methods {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacer-xl);
    padding: var(--spacer-xs) 0;
    width: 100%;
  }
  .sf-payment .credit-card-form {
    width: 38.125rem;
    .credit-card-form__group {
      .credit-card-form__element {
        display: flex;
        .credit-card-form__input {
          align-self: center;
        }
      }
      .credit-card-form__input--with-spacer {
        margin: 0 var(--spacer-lg) 0 0;
      }
      .credit-card-form__button {
        text-align: left;
      }
    }
  }
  .sf-payment .credit-card-form__label--small {
    flex: 0 0 33.3333333333%;
    padding: var(--spacer-sm) var(--spacer-sm) 0 0;
  }
}
.sf-payment .credit-card-form__group {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  .credit-card-form__label, .credit-card-form__input, .credit-card-form__button {
    flex: 1;
  }
  .credit-card-form__button {
    text-align: right;
    --button-padding: var(--spacer-base) 0 0 var(--spacer-sm);
  }
  .credit-card-form__element {
    flex: 1;
    .credit-card-form__input {
      flex: 1;
      padding: 0 0 var(--spacer-sm) 0;
      align-items: center;
      --select-option-font-size: var(--font-size--base);
      --select-dropdown-color: blue;
    }
  }
}
</style>
