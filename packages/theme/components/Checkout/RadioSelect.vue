<template>
  <div data-v-25c4ffa6="" class="sf-radio form__radio shipping" :class="method.selected ? 'is-active': ''">
    <label class="sf-radio__container">
      <input
        type="radio"
        name="shippingMethod"
        :value="method.value"
        style="outline: none"
        v-model="method.value"
        required
        @click="selectValue"
      />
      <span class="sf-radio__checkmark sf-radio__checkmark" :class="method.selected ? 'is-active': ''"></span>
      <span class="sf-radio__content"
        ><div data-v-25c4ffa6="" class="sf-radio__label shipping__label">
          <div data-v-25c4ffa6="">
            {{ method.label }}
            <button
              data-v-25c4ffa6=""
              type="button"
              aria-label="button"
              @click="showDescription = !showDescription"
              class="
                sf-button--text
                shipping__action
                desktop-only
                sf-button
              "
              :class="showDescription && 'shipping__action--is-active'"
            >
              {{ !showDescription ? '+' : '-' }} info
            </button>
          </div>
          <div data-v-25c4ffa6="" class="shipping__label-price">{{ method.price }}</div>
        </div>
        <span class="sf-radio__details display-none"> </span>
        <div
          data-v-25c4ffa6=""
          class="sf-radio__description shipping__description"
        >
          <div data-v-25c4ffa6="" class="shipping__delivery">
            <span data-v-25c4ffa6="">{{ method.delivery }}</span>
          </div>
          <div v-if="showDescription" data-v-25c4ffa6="" class="shipping__info">
            {{ method.description}}
          </div>
        </div>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioSelect',
  props: {
    currentStep: String,
    method: Object
  },
  data() {
    return {
      showDescription: false
    };
  },
  methods: {
    selectValue(e) {
      this.$emit('checkEvent', e.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
.sf-shipping .shipping.sf-radio {
  display: flex;
  transition: background-color .25s cubic-bezier(1, 0.5, 0.8, 1);
  --radio-container-padding: var(--spacer-sm);
  margin: var(--spacer-xs) 0;
  .radio__container {
    --radio-container-padding: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) var(--spacer-sm);
  }
  .sf-radio__content {
    .sf-radio__label {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
}
.sf-radio.is-active {
  background: var(--c-light);
}
.sf-radio {
  .shipping__action {
    margin: 0 0 0 var(--spacer-xs);
  }
  .shipping__action--is-active {
    --button-color: var(--c-primary);
    --button-transition: color 150ms linear;
  }
  .shipping__info {
    font-weight: var(--font-weight--light);
    font-size: var(--font-size--sm);
    font-family: var(--font-family--primary);
    line-height: 1.6;
    color: var(--c-text);
  }
}
</style>
