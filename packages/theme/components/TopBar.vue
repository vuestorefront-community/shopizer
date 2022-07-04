<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">Call Us : {{phoneNumber}}</SfButton>
    </template>
    <!-- <template #center>
      <p>{{ $t('Download') }}</p>
      <SfButton class="topbar__button sf-button--text">{{ $t('Find out more') }}</SfButton>
    </template> -->
    <template #right>
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';
import { useStore, marketGetters, useContent, contentGetters } from '@vue-storefront/shopizer';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  setup() {
    const { response } = useStore();
    const { configData } = useContent();
    const phoneNumber = computed(() => marketGetters.getPhoneNumber(response.value));
    const contactUs = computed(() => contentGetters.getContactUs(configData.value));

    return {
      phoneNumber,
      contactUs
    };
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
