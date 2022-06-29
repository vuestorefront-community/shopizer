<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search "
      :class="{'header-on-top': isSearchOpen}"
      :isNavVisible="isMobileMenuOpen"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath({ name: 'home' })" class="sf-header__logo">
          <img :src='marketLogo' alt="Vue Storefront Next" class="sf-header__logo-image sf-image sf-image-loaded" v-if="marketLogo"/>
        </nuxt-link>
      </template>
      <template #navigation>
        <HeaderNavigation :isMobile="isMobile" />
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
      <template #header-icons>
        <div v-e2e="'header-icons'" class="sf-header__icons">
          <div class="sf-header--user__handler">
            <SfButton
              class="sf-button--pure sf-header__action user-account_btn"
              aria-label="Open account button"
              @click="handleAccountClick"
            >
              <SfIcon
                :icon="accountIcon"
                size="1.25rem"
              />
              <div class="sf-heading" v-if="isAuthenticated">
              Hi - <span v-if="userData.firstName">{{userData.firstName}}</span><span v-if="userData.lastName"> {{userData.lastName}}</span>
              </div>
            </SfButton>
            <div class="accountAction_dropdown">
            <SfList v-if="!isAuthenticated" class="dropdownMenuCustom">
              <p class="list-item" @click="openRegisterModel">Register</p>
              <p class="list-item" @click="openLoginModel">Sign in</p>
            </SfList>
            <SfList v-else class="dropdownMenuCustom">
              <p class="list-item" @click="openAccountPage">My Profile</p>
              <p class="list-item" @click="logoutUser">Logout</p>
            </SfList>
          </div>
          </div>
          <!-- <SfButton
            class="sf-button--pure sf-header__action"
            aria-label="Toggle wishlist sidebar"
            @click="toggleWishlistSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="heart"
              size="1.25rem"
            />
          </SfButton> -->
          <SfButton
            class="sf-button--pure sf-header__action"
            aria-label="Toggle cart sidebar"
            @click="toggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              size="1.25rem"
            />
            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items')"
          aria-label="Search"
          class="sf-header__search"
          :value="term"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          v-click-outside="closeSearch"
        >
          <template #icon>
            <SfButton
              v-if="!!term"
              aria-label="Close search"
              class="sf-search-bar__button sf-button--pure"
              @click="closeOrFocusSearchBar"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="18px" icon="cross" />
              </span>
            </SfButton>
            <SfButton
              v-else
              aria-label="Open search"
              class="sf-search-bar__button sf-button--pure"
              @click="isSearchOpen ? isSearchOpen = false : isSearchOpen = true"
            >
              <span class="sf-search-bar__icon">
                <SfIcon color="var(--c-text)" size="20px" icon="search" />
              </span>
            </SfButton>
            <SfList :class="isAutocompleteOpen ? 'list-visible' : 'list-hidden'">
              <p class="list-item" v-for="(item, index) in autocompleteData" :key="`index-${index}`" :name="item" @click="selectFromAutocomplete(item)">{{item}}</p>
            </SfList>
          </template>
        </SfSearchBar>
      </template>
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :result="result"
      :term="term"
      @close="closeSearch"
      @removeSearchResults="removeSearchResults"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton, SfBadge, SfSearchBar, SfOverlay, SfList } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useUser, cartGetters, useStore, marketGetters, useContent } from '@vue-storefront/shopizer';
import { computed, ref, watch, onBeforeUnmount, useRouter } from '@nuxtjs/composition-api';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';
import HeaderNavigation from './HeaderNavigation';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
// import debounce from 'lodash.debounce';
import mockedSearchProducts from '../mockedSearchProducts.json';
import { addBasePath } from '@vue-storefront/core';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    HeaderNavigation,
    SfList
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const router = useRouter();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal, isMobileMenuOpen } = useUiState();
    const { setTermForUrl, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, logout, user } = useUser();
    const { response } = useStore();
    const { cart } = useCart();
    const { searchAutocomplete, resultAuto } = useContent();
    const term = ref(getFacetsFromURL().phrase);
    const isSearchOpen = ref(false);
    const isAutocompleteOpen = ref(false);
    const noLoginDropdown = ref(false);
    const searchBarRef = ref(null);
    const autocompleteData = ref([]);
    const result = ref(null);
    const isMobile = ref(mapMobileObserver().isMobile.get());
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const marketLogo = computed(() => marketGetters.getStoreLogo(response.value));
    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');
    const userData = computed(() => user.value);

    // if (typeof window !== 'undefined') {
    //   searchAutocomplete();
    // }
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = () => {
      noLoginDropdown.value = !noLoginDropdown.value;
    };

    const openRegisterModel = () => {
      noLoginDropdown.value = false;
      toggleLoginModal('register');
    };

    const openLoginModel = () => {
      noLoginDropdown.value = false;
      toggleLoginModal('login');
    };

    const openAccountPage = () => {
      noLoginDropdown.value = false;
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
          const localeAccountPath = root.localePath({ name: 'my-account' });
          return router.push(localeAccountPath);
        }
      }
    };

    const logoutUser = async () => {
      noLoginDropdown.value = false;
      await logout();
      return router.push(root.localePath({ name: 'home' }));
    };

    const closeSearch = () => {
      const wishlistClassName = 'sf-product-card__wishlist-icon';
      const isWishlistIconClicked = event.path.find(p => wishlistClassName.search(p.className) > 0);
      if (isWishlistIconClicked || !isSearchOpen.value) return;

      term.value = '';
      isSearchOpen.value = false;
      isAutocompleteOpen.value = false;
      autocompleteData.value = [];
    };

    const handleSearch = async (paramValue) => {
      if (!paramValue.target) {
        term.value = paramValue;
        searchAutocomplete(paramValue);
        if (paramValue.length > 0) {
          isAutocompleteOpen.value = true;
        }
      } else {
        term.value = paramValue.target.value;
        searchAutocomplete(paramValue.target.value);
        if (paramValue.target.value.length > 0) {
          isAutocompleteOpen.value = true;
        }
      }
      result.value = mockedSearchProducts;

    };

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      } else {
        term.value = '';
        return searchBarRef.value.$el.children[0].focus();
      }
    };

    watch(() => term.value, (newVal, oldVal) => {
      const shouldSearchBeOpened = (!isMobile.value && term.value.length > 0) && ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false));
      if (shouldSearchBeOpened) {
        isSearchOpen.value = true;
      }
      if (resultAuto.value?.values && resultAuto.value?.values?.length > 0 && newVal.length > 0) {
        autocompleteData.value = resultAuto.value.values;
      } else {
        isAutocompleteOpen.value = false;
        autocompleteData.value = [];
      }
    });

    const selectFromAutocomplete = (data) => {
      term.value = data;
      isAutocompleteOpen.value = false;
      autocompleteData.value = [];
    };

    const removeSearchResults = () => {
      result.value = null;
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      isMobileMenuOpen,
      removeSearchResults,
      addBasePath,
      marketLogo,
      resultAuto,
      autocompleteData,
      isAutocompleteOpen,
      selectFromAutocomplete,
      noLoginDropdown,
      openRegisterModel,
      openLoginModel,
      openAccountPage,
      isAuthenticated,
      logoutUser,
      userData
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.sf-header {
  box-shadow: 0 0 25px 0 rgb(0 0 0 / 6%);
  --header-padding:  var(--spacer-sm);

  @include for-desktop {
    --header-padding: 5;
    --header-width: 95%
  }
  &__logo-image {
    height: 100%;
  }
  &__header{
    max-width: 100%;
    margin-right: 25px;
    margin-left: 25px;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
  .sf-header-navigation-item__item--mobile {
    display: none;
  }
}

.cart-badge {
  position: absolute;
  bottom: 60%;
  left: 40%;
}
.sf-list {
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 20;
  background: #fff;
  border: 1px solid rgb(0 0 0 / 20%);
  box-shadow: 0 0 25px 0 rgb(0 0 0 / 6%);
  .list-item {
    border-bottom: 1px solid rgb(0 0 0 / 20%);
    padding: 10px;
    cursor: pointer;
    margin: 0px;
  }
  .list-item:hover {
    color: var(--c-primary);
  }
  .list-item:last-child {
    border-bottom: none;
  }
}
.list-visible {
  opacity: 1;
}
.list-hidden {
  opacity: 0
}
.dropdownMenuCustom {
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: center;
  width: max-content;
  align-items: center;
  background: #fff none repeat scroll 0 0;
  border: none;
  top: 100%;
  .list-item {
    width: 100%
  }
}
.accountAction_dropdown {
  opacity: 0;
  visibility: hidden;
  transform: rotateX(0deg);
  padding-top: 30px;
  position: absolute;
  top: 100%;
  display: block;
  width: 100%;
  z-index: 9;
}
.sf-header--user__handler{
  position: relative;
  &:hover {
  .accountAction_dropdown {
    opacity: 1;
    transition: all 0.5s ease 0s;
    transform: rotateX(0deg);
    transform-origin: center top 0;
    visibility: visible;
  }
}
}
.sf-header.header-on-top {
  z-index: 4;
}
.sf-header__logo-image {
    object-fit: cover;
    width: var(--image-width);
    height: var(--image-height, auto);
    display: flex;
}
</style>
