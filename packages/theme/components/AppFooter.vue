<template>
  <div class="footer_wrapper">
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
        <SfList class="footer__socials">
          <SfImage class="footer__social-image" v-for="item in social" :key="item" :src="addBasePath('/icons/'+item+'.svg')" :alt="item" width="32" height="32" />
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="''" class="menu_column_footer">
        <SfList class="menu_list_footer">
          <SfListItem
            v-for="item in help"
            :key="item"
          >
            <SfMenuItem
              :to="localePath({ name: 'my-account' })"
              :label="$t(item.name)"
              :link="item.link"
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
      <SfFooterColumn title="Follow Us">
        <div class="footer__follow-us">
          <SfImage class="footer__follow-us--image" v-for="item in follow" :key="item" :src="addBasePath('/_nuxt/_/_/node_modules/@storefront-ui/shared/images/product_placeholder.svg')" :alt="item" width="32" height="32" />
        </div>
      </SfFooterColumn>
    </SfFooter>
    <div class="footer__extra">
      <div class="footer__extra-wrapper">
        <div class="left_side">
            <span>Copyright © {{new Date(merchant.inBusinessSince).getFullYear()}} {{merchant.name}} All Rights Reserved</span>
        </div>
        <div class="right_side">
          <div class="footer__socials">
            <SfImage class="footer__social-image" v-for="item in social" :key="item" :src="addBasePath('/icons/'+item+'.svg')" :alt="item" width="32" height="32" />
          </div>
        </div>
      </div>
    </div>
  </div>
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
      help: [{
        name: 'Home',
        link: '/'
      }, {
        name: 'Handbags',
        link: '/'
      },
      {
        name: 'Beach Bags',
        link: '/'
      },
      {
        name: 'Laptop bags',
        link: '/'
      },
      {
        name: 'Bags',
        link: '/'
      },
      {
        name: 'Contact Us',
        link: '/'
      },
      {
        name: 'Register',
        link: '/'
      },
      {
        name: 'Sign in',
        link: '/'
      }],
      paymentsDelivery: ['Purchase terms', 'Guarantee'],
      social: ['facebook', 'pinterest', 'google', 'youtube'],
      follow: ['facebook', 'pinterest', 'google', 'youtube', 'instagram', 'reddit'],
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
.footer_wrapper {
  .footer__extra {
    background: #10161c;
    margin-bottom: 10px;
    padding-bottom: 10px;
    @include for-desktop {
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .footer__extra-wrapper {
      @include for-desktop {
        max-width: 69rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
      }
    }
    .left_side {
      padding: var(--spacer-xs) 0;
      color: var(--_c-gray-primary);
      text-align: center;
      @include for-desktop {
        text-align: left;
      }
    }
  }
}
.menu_list_footer {
  width: max-content;
  margin: auto;
  padding: 30px 20px;
  background-color: #111214a1;
  box-shadow: 1px 1px 1px 4px #292c3017;
}
.menu_column_footer {
  margin-bottom: 0;
  padding-bottom: 0;
  .sf-footer-column__title {
    display: none;
  }
}
.footer__follow-us {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .footer__follow-us--image {
    display: block;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
  }
}
</style>
