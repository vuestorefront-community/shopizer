<template>
  <div>
    <div class="form" data-v-6c22c3b3="">
      <div data-testid="firstName" class="sf-input form__element form__element--half" data-v-6c22c3b3="">
        <SfInput
          :value="firstName"
          label="First name"
          name="firstName"
          type="text"
          :valid="firstNameBlur || validFirstName(firstName)"
          error-message="Please type your name"
          @blur="firstNameBlur = false"
          :required="true"
          @input="changeFirstName"
        />
      </div>
      <div data-testid="lastName" class="sf-input form__element form__element--half form__element--half-even" data-v-6c22c3b3="">
        <SfInput
          :value="lastName"
          label="Last name"
          name="lastName"
          type="text"
          :valid="lastNameBlur || validLastName(lastName)"
          error-message="Please type your last name. Your name should have at least one character."
          @blur="lastNameBlur = false"
          :required="true"
          @input="changeLastName"
        />
      </div>
      <div data-testid="email" class="sf-input form__element" data-v-6c22c3b3="">
        <SfInput
          :value="email"
          label="Email"
          name="email"
          type="email"
          error-message="Please enter Email"
          :valid="emailBlur || validEmail(email)"
          @blur="emailBlur = false"
          :required="true"
          @input="changeEmail"
        />
      </div>
      <div class="info" data-v-6c22c3b3="">
        <p class="info__heading" data-v-6c22c3b3=""></p>
      </div>
      <div data-testid="create-account-checkbox" v-if="!isAuthenticated" class="sf-checkbox form__checkbox" data-v-6c22c3b3="">
        <label class="sf-checkbox__container">
          <input type="checkbox" name="createAccount" value="" @change="createAccCheckbox($event)" class="sf-checkbox__input">
          <span class="sf-checkbox__checkmark" :class="createAccountCheck && 'is-active'">
            <span class="sf-icon color-white" :class="!createAccountCheck && 'display-none'" style="">
              <svg viewBox="0 0 24 24" preserveAspectRatio="none" class="sf-icon-path">
                <defs>
                  <linearGradient id="linearGradient-28816" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="1" stop-color="var(--icon-color)"></stop>
                    <stop offset="0" stop-color="var(--icon-color-negative, var(--c-gray-variant))"></stop>
                  </linearGradient>
                </defs>
                <path d="M10.7136 17C10.3594 17 10.0181 16.8476 9.76516 16.5711L6.38899 12.8793C5.87034 12.3122 5.87034 11.3859 6.38899 10.8194C6.90765 10.2522 7.75481 10.2522 8.27289 10.8194L10.6755 13.4465L15.6833 7.47328C16.1762 6.87859 17.0239 6.837 17.5672 7.3901C18.111 7.92914 18.1491 8.85607 17.6432 9.45009L11.7 16.5301C11.4599 16.8207 11.1057 17 10.7387 17L10.7136 17Z" fill="var(--icon-color)" style="height:100%;"></path>
              </svg>
            </span>
          </span>
          <span class="sf-checkbox__label">I want to create an account</span>
        </label>
        <div class="sf-checkbox__message">
          <div class=""></div>
        </div>
      </div>
    </div>
    <div data-v-1fdb521d="" v-if="createAccountCheck" data-testid="" class="sf-input form__element">
      <div class="sf-input__wrapper">
        <input id="" required="required" name="" @input="changePassword" :type="!detailsTabShowPassword ? 'password':'text'" aria-required="true" data-testid="create-password-input" class="sf-input--is-password">
        <span class="sf-input__bar"></span>
        <label for="" class="sf-input__label will-change" style="will-change: auto;">Create Password</label>
        <button type="button" aria-label="switch-visibility-password" aria-pressed="false" @click="detailsTabShowPassword = !detailsTabShowPassword" class="sf-input__password-button sf-button">
          <span class="sf-input__password-icon sf-icon" :class="!detailsTabShowPassword && 'hidden'" style="--icon-size:1.5rem;">
            <svg viewBox="0 0 24 24" preserveAspectRatio="none" class="sf-icon-path">
              <defs class="">
                <linearGradient id="linearGradient-115" x1="0" y1="0" x2="1" y2="0">
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
    </div>
  </div>
</template>

<script>
import {
  SfInput
} from '@storefront-ui/vue';
export default {
  name: 'ProfileDetails',
  props: {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAuthenticated: Boolean
  },
  components: {
    SfInput
  },
  data() {
    return {
      createAccountCheck: false,
      detailsTabShowPassword: false,
      firstNameBlur: true,
      lastNameBlur: true,
      emailBlur: false
    };
  },
  methods: {
    createAccCheckbox(e) {
      this.createAccountCheck = e.target.checked;
    },
    changeFirstName(e) {
      this.$emit('inputFirstName', e);
    },
    changeLastName(e) {
      this.$emit('inputLastName', e);
    },
    changeEmail(e) {
      this.$emit('inputEmail', e);
    },
    changePassword(e) {
      this.$emit('inputPassword', e.target.value);
    },
    validate() {
      this.firstNameBlur = false;
      this.lastNameBlur = false;
      this.emailBlur = false;
      if (
        this.validEmail(this.email) &&
        this.validFirstName(this.firstName) &&
        this.validLastName(this.lastName)
      ) {
        this.valid = true;
      }
    },
    validFirstName(firstName) {
      return firstName.length > 2;
    },
    validLastName(lastName) {
      return lastName.length > 2;
    },
    validEmail(email) {
      const regex = /(.+)@(.+){2,}\.(.+){2,}/;
      return regex.test(email?.toLowerCase());
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.sf-checkbox__checkmark.is-active {
  --checkbox-border-color: var(--c-primary);
  --checkbox-background: var(--c-primary);
}
</style>
