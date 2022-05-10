<template>
  <SfFooter :column="4" multiple class="footer">
    <SfFooterColumn :title='merchant.name'>
      <SfList>
        <SfListItem>
          <SfMenuItem
            :label="`Copyright © ${new Date(merchant.inBusinessSince).getFullYear()} ${merchant.name}`"
          />
          <SfMenuItem
            :label="`All Rights Reserved`"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="`Address`">
      <SfList>
        <SfListItem>
          <SfMenuItem
            :label="`${merchant.address.address} ${merchant.address.city},`"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            :label="`${merchant.address.stateProvince}, ${merchant.address.country}, ${merchant.address.postalCode}`"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            :label="`TEL : ${merchant.phone}`"
          />
        </SfListItem>
        <SfListItem>
          <SfMenuItem
            :label="`E-mail : ${merchant.email}`"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="'USEFUL LINKS'">
      <SfList>
        <SfListItem
          v-for="item in help"
          :key="item"
        >
          <SfMenuItem
            :to="localePath({ name: 'my-account' })"
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <!-- <SfFooterColumn :title="$t('Payment & Delivery')">
      <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :label="$t(item)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn> -->
    <SfFooterColumn title="Social">
      <div class="footer__socials">
        <SfImage class="footer__social-image" v-for="item in social" :key="item" :src="addBasePath('/icons/'+item+'.svg')" :alt="item" width="32" height="32" />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
import { useStore, marketGetters } from '@vue-storefront/shopizer';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  setup() {
    const { response } = useStore();
    const marketLogo = computed(() => marketGetters.getStoreLogo(response.value));
    const merchant = computed(() => marketGetters.getStoreData(response.value));
    console.log(merchant);
    return {
      addBasePath,
      marketLogo,
      merchant
    };

  },
  data() {
    return {
      aboutUs: ['Who we are', 'Quality in the details', 'Customer Reviews'],
      departments: ['Women fashion', 'Men fashion', 'Kidswear', 'Home'],
      help: ['Contact', 'Login', 'Register'],
      paymentsDelivery: ['Purchase terms', 'Guarantee'],
      social: ['facebook', 'pinterest', 'google', 'twitter', 'youtube'],
      isMobile: false,
      desktopMin: 1024
    };
  }
};
</script>

<style lang="scss">

.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
