
<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item mainmenu"
      v-e2e="`app-header-url_${category}`"
      :label="category.description.name"
      :link="localePath(`/c/${category.id}/${category.description.friendlyUrl}`)"
      v-if="category.visible"
    >
    <template>
      <SfMenuItem
        v-for="(submenu, i) in category.children"
        :key="i"
        class="nav-item submenu"
        v-e2e="`app-header-url_${submenu}`"
        :label="submenu.description.name"
        :link="localePath(`/c/${submenu.id}/${submenu.description.friendlyUrl}`)"
        v-if="category.children && category.children.length > 0"
      >
      </SfMenuItem>
    </template>
    </SfHeaderNavigationItem>
    <SfHeaderNavigationItem
      v-for="(content, index) in contents"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${content}`"
      :label="content.description.name"
      :link="localePath(`/content/${content.description.friendlyUrl}`)"
      v-if="content.visible && content.description"
    />
  </div>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category}`"
      v-if="category.visible"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="category.description.name"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/c/${category.id}/${category.description.friendlyUrl}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
    <SfHeaderNavigationItem
      v-for="(content, index) in contents"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${content}`"
      v-if="content.visible && content.description"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="content.description.name"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/content/${content.description.friendlyUrl}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useContent, contentGetters } from '@vue-storefront/shopizer';
import { computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { getCategoryHierarchy, categoryData, getContent, contentData } = useContent();

    onSSR(async () => {
      await getCategoryHierarchy({currentLanguageCode: 'en'});
      await getContent({currentLanguageCode: 'en'});
    });
    const categories = computed(() => contentGetters.getCategoryData(categoryData?.value));
    const contents = computed(() => contentGetters.getContentData(contentData?.value));
    // console.log(contents);
    return {
      categories,
      contents,
      isMobileMenuOpen,
      toggleMobileMenu
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.mainmenu{
  position: relative;
  &:hover {
    .submenu{
      display: flex;
      flex-direction: column;
      padding: 16px;
      width: 100%;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease 0s;
      transform: rotateX(0deg);
      transform-origin: center top 0;
visibility: visible;
      background: #fff none repeat scroll 0 0;
      box-shadow: 0 0 7px 0.5px rgba(0, 0, 0, 0.15);
      border: none;
      &:focus,
      &:hover{
        color: #000;
        border: none;
      }
    }
  }
}
.submenu{
  // display: none;
  position: absolute;
      top: 108px;
      z-index: 9;
      visibility: hidden;
          transform: rotateX(0deg);

          .sf-menu-item__count{
  display: none;
}

}

.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
