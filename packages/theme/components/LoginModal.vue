<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isLoginModalOpen"
    class="modal"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t(barTitle)"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="currentScreen === SCREEN_LOGIN">
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(handleLogin)">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-email'"
                v-model="form.username"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-password'"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <SfCheckbox
              v-e2e="'login-modal-remember-me'"
              v-model="rememberMe"
              name="remember-me"
              label="Remember me"
              class="form__element checkbox"
            />
            <SfButton v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Login') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          <SfButton class="sf-button--text" @click="setCurrentScreen(SCREEN_FORGOTTEN)">
            {{ $t('Forgotten password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">{{ $t('No account') }}</p>
          <SfButton class="sf-button--text" @click="setCurrentScreen(SCREEN_REGISTER)">
            {{ $t('Register today') }}
          </SfButton>
        </div>
      </div>
      <div v-else-if="currentScreen === SCREEN_FORGOTTEN">
        <p>{{ $t('Forgot Password') }}</p>
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(handleForgotten)">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'forgot-modal-email'"
                v-model="form.username"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                :label="$t('Forgot Password Modal Email')"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="forgotPasswordError.request">
              {{ forgotPasswordError.request.message }}
            </div>
            <SfButton
              v-e2e="'forgot-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="forgotPasswordLoading"
            >
              <SfLoader :class="{ loader: forgotPasswordLoading }" :loading="forgotPasswordLoading">
                <div>{{ $t('Reset Password') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
      </div>
      <div v-else-if="currentScreen === SCREEN_THANK_YOU" class="thank-you">
        <i18n tag="p" class="thank-you__paragraph" path="forgotPasswordConfirmation">
          <span class="thank-you__paragraph--bold">{{ userEmail }}</span>
        </i18n>
        <p class="thank-you__paragraph">{{ $t('Thank You Inbox') }}</p>
      </div>
      <div v-else class="form">
        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
          <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-email'"
                v-model="formReg.email"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-firstName'"
                v-model="formReg.firstName"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="first-name"
                label="First Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-lastName'"
                v-model="formReg.lastName"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="last-name"
                label="Last Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'login-modal-password'"
                v-model="formReg.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="password"
                label="Password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
                <SfSelect
                  v-e2e="'login-modal-country'"
                  class="form__element sf-select--underlined"
                  label="Country"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  v-model="formReg.country"
                  @input="getState(formReg.country)"
                >
                  <SfSelectOption v-for="(country, i) in dummyCountries" :key="i" :value="country.code">{{country.name}}</SfSelectOption>
                </SfSelect>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
                <SfSelect
                  v-e2e="'login-modal-state'"
                  class="form__element sf-select--underlined"
                  label="State"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  v-model="formReg.state"
                >
                  <SfSelectOption v-for="(state, i) in shipStateData" :key="i" :value="state.code">{{state.name}}</SfSelectOption>
                </SfSelect>
            </ValidationProvider>
            <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
              <SfCheckbox
                v-e2e="'login-modal-create-account'"
                v-model="createAccount"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="create-account"
                label="I want to create an account"
                class="form__element"
              />
            </ValidationProvider>
            <SfButton
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Create an account') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          {{ $t('or') }}
          <SfButton class="sf-button--text" @click="setCurrentScreen(SCREEN_LOGIN)">
            {{ $t('login in to your account') }}
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref, watch, reactive, computed, useRouter } from '@nuxtjs/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert, SfBar, SfSelect } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser, useForgotPassword, useContent } from '@vue-storefront/shopizer';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver,
    SfBar,
    SfSelect
  },
  setup(props, {root}) {
    const SCREEN_LOGIN = 'login';
    const SCREEN_REGISTER = 'register';
    const SCREEN_THANK_YOU = 'thankYouAfterForgotten';
    const SCREEN_FORGOTTEN = 'forgottenPassword';

    const { isLoginModalOpen, toggleLoginModal, logInModelType } = useUiState();
    const form = ref({});
    const formReg = ref({});
    const userEmail = ref('');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const dummyCountries = ref([{
      name: 'Austria',
      code: 'AU'
    }, {
      name: 'Canada',
      code: 'CA'
    }, {
      name: 'Switzerland',
      code: 'SW'
    }]);
    const { send: sendNotification} = useUiNotification();
    const { register, login, loading, error: userError } = useUser();
    const { request, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();
    const { getCountry, countryData, getState, stateData, getUserCartData } = useContent();
    const currentScreen = ref(logInModelType.value);
    const router = useRouter();

    onSSR(async () => {
      await Promise.all([
        getCountry({ currentLanguageCode: 'en' })
      ]);
    });
    const shipCountryData = computed(() => countryData.value);
    const shipStateData = computed(() => stateData.value);
    const error = reactive({
      login: null,
      register: null
    });
    const success = reactive({
      login: null,
      register: null
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };
    const resetSuccessValues = () => {
      success.login = null;
      success.register = null;
    };

    const barTitle = computed(() => {
      switch (currentScreen.value) {
        case SCREEN_LOGIN:
          return 'Sign in';
        case SCREEN_REGISTER:
          return 'Register';
        default:
          return 'Reset Password';
      }
    });

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
        currentScreen.value = logInModelType.value;
      }
    });

    const setCurrentScreen = (screenName) => {
      resetErrorValues();
      currentScreen.value = screenName;
    };
    const handleForm = async () => {
      setTimeout(() => {
        resetSuccessValues();
        toggleLoginModal(SCREEN_LOGIN);
        const localeAccountPath = root.localePath({ name: 'my-account' });
        return router.push(localeAccountPath);
      }, 3000);
    };

    const closeModal = () => {
      resetErrorValues();
      setCurrentScreen(SCREEN_LOGIN);
      toggleLoginModal(SCREEN_LOGIN);
      createAccount.value = false;
      rememberMe.value = false;
    };

    const handleRegister = async () => {
      resetErrorValues();
      const param = {
        userName: formReg.value.email,
        password: formReg.value.password,
        emailAddress: formReg.value.email,
        gender: 'M',
        language: 'en',
        billing: {
          country: formReg.value.country,
          stateProvince: formReg.value.state,
          firstName: formReg.value.firstName,
          lastName: formReg.value.lastName
        }
      };
      await register({ user: param });
      const hasUserErrors = userError.value.register;
      if (hasUserErrors) {
        sendNotification({
          key: 'register_failed',
          message: hasUserErrors.data.message,
          type: 'danger',
          title: 'Register Failed.'
        });
        return;
      }
      // success.register = 'You have successfully registerd in to this website.';
      sendNotification({
        key: 'register_sucess',
        message: 'You have successfully registerd in to this website.',
        type: 'success',
        title: 'Register Success.'
      });
      handleForm();
    };

    // const handleLogin = async () => handleForm(login)();
    const handleLogin = async () => {
      resetErrorValues();
      // const param = { username: form.value.username, password: form.value.password };
      await login({ user: form.value });
      const hasUserErrors = userError.value.login;
      if (hasUserErrors) {
        sendNotification({
          key: 'login_failed',
          message: hasUserErrors.message,
          type: 'danger',
          title: 'Login Failed.'
        });

        // error.login = hasUserErrors.message;
        return;
      }
      sendNotification({
        key: 'login_sucess',
        message: 'You have successfully logged in to this website',
        type: 'success',
        title: 'Login Success.'
      });
      // success.login = 'You have successfully logged in to this website';
      handleForm();
      getUserCartData('en');
    };

    const handleForgotten = async () => {
      await request({ username: form.value.username });
    };

    return {
      form,
      formReg,
      userError,
      loading,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      forgotPasswordError,
      forgotPasswordLoading,
      handleForgotten,
      closeModal,
      userEmail,
      barTitle,
      currentScreen,
      setCurrentScreen,
      SCREEN_LOGIN,
      SCREEN_REGISTER,
      SCREEN_THANK_YOU,
      SCREEN_FORGOTTEN,
      shipCountryData,
      getState,
      shipStateData,
      dummyCountries
    };
  }
};
</script>

<style lang="scss" scoped>

.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-base) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.error_message{
  color: var(--c-danger);
  text-align: center;
  margin-bottom: var(--spacer-xs);
}
.success_message{
  color: var(--c-primary);
  text-align: center;
  margin-bottom: var(--spacer-xs);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}
</style>
