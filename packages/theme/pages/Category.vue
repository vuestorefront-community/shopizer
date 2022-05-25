<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="[{
          text: 'Home',
          route: {
            link: '/'
          }
        }]"
    />
    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <LazyHydrate never>
          <SfHeading
            :level="3"
            :title="$t('Categories')"
            class="navbar__title" />
        </LazyHydrate>
      </div>
      <CategoryPageHeader :pagination="pagination"/>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <LazyHydrate when-idle>
            <SfAccordion
              v-e2e="'categories-accordion'" :show-chevron="true">
              <SfAccordionItem header="Categories" key="a" v-if="category.length > 0">
                <template>
                  <SfList class="list" >
                    <SfListItem v-for="(category, j) in category" :key="j" class="list__item" >
                      <nuxt-link :to="localePath(`/c/${category.id}/${category.description.friendlyUrl}`)" >
                        <SfMenuItem :label="category.description.name">
                        </SfMenuItem>
                      </nuxt-link>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
              <SfAccordionItem header="Styles" key="b" v-if="manufacture.length > 0">
                <template>
                  <SfList class="list">
                    <SfListItem v-for="(subCat, j) in manufacture" :key="j" class="list__item" >
                      <template>
                        <input
                            type="checkbox"
                            name="manufacture"
                            :value="subCat.id"
                            @change="getSortParams('MANUFACTURE', subCat.id)"
                            >
                        <span>{{ subCat.description.name }}</span>
                        <!-- <SfCheckbox
                          :name="subCat.code"
                          :label="subCat.description.name"
                        /> -->
                      </template>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
              <SfAccordionItem
                  v-for="(accordion, i) in variants"
                  :key="i+2"
                  :header="accordion.name">
                <template>
                  <SfList class="list">
                    <SfListItem
                      v-for="(item, j) in accordion.options"
                      :key="j"
                      class="list__item">
                      <template>
                        <input
                            type="checkbox"
                            :name="accordion.name"
                            :value="item.id"
                            @change="getSortParams(accordion.name, item.id)"
                            >
                        <span>{{ item.name }}</span>
                        <!-- <SfCheckbox
                          :name="item.code"
                          :label="item.name"
                        /> -->
                      </template>
                    </SfListItem>
                  </SfList>
                </template>
              </SfAccordionItem>
            </SfAccordion>
        </LazyHydrate>
      </div>
      <SfLoader :class="{ loading }" :loading="loading">
        <div class="products" v-if="!loading">
          <transition-group
            v-if="isCategoryGridView"
            appear
            name="products__slide"
            tag="div"
            class="products__grid"
          >
            <SfProductCard
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="productGetters.getPrice(product).regular"
              :special-price="productGetters.getPrice(product).discounted ? productGetters.getPrice(product).special : ''"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              wishlistIcon=""
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              class="products__product-card"
              @click:add-to-cart="addToCart({ cartItem, product, quantity: 1 })"
            />
          </transition-group>
          <transition-group
            v-else
            appear
            name="products__slide"
            tag="div"
            class="products__list"
          >
            <SfProductCardHorizontal
              v-e2e="'category-product-card'"
              v-for="(product, i) in products"
              class="products__product-card-horizontal"
              :key="productGetters.getSlug(product)"
              :style="{ '--index': i }"
              :title="productGetters.getName(product)"
              :description="productGetters.getDescription(product)"
              :image="addBasePath(productGetters.getCoverImage(product))"
              :regular-price="productGetters.getPrice(product).regular"
              :special-price="productGetters.getPrice(product).discounted ? productGetters.getPrice(product).special : ''"
              :max-rating="5"
              :score-rating="productGetters.getAverageRating(product)"
              :addToCartDisabled="product.available || product.canBePurchased || product.visible || product.quantity > 0"
              wishlistIcon=""
              :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
              @input="productsQuantity[product._id] = $event"
              @click:add-to-cart="addToCart({ cartItem, product, quantity: Number(productsQuantity[product._id]) })"
            >
              <!-- <template #configuration>
                <SfProperty
                  class="desktop-only"
                  name="Size"
                  value="XS"
                  style="margin: 0 0 1rem 0;"
                />
                <SfProperty class="desktop-only" name="Color" value="white" />
              </template> -->
              <!-- <template #actions>
                <SfButton
                  class="sf-button--text desktop-only"
                  style="margin: 0 0 1rem auto; display: block;"
                  @click="() => {}"
                >
                  {{ $t('Save for later') }}
                </SfButton>
              </template> -->
            </SfProductCardHorizontal>
          </transition-group>

          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!loading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="5"
            />
          </LazyHydrate>

          <div
            v-show="pagination.totalPages > 1"
            class="products__show-on-page"
          >
            <span class="products__show-on-page__label">{{ $t('Show on page') }}</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="pagination && pagination.itemsPerPage ? pagination.itemsPerPage.toString() : ''"
                class="products__items-per-page"
                @input="th.changeItemsPerPage"
              >
                <SfSelectOption
                  v-for="option in pagination.pageOptions"
                  :key="option"
                  :value="option"
                  class="products__items-per-page__option"
                >
                  {{ option }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </SfLoader>
    </div>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor,
  SfProperty,
  SfCheckbox
} from '@storefront-ui/vue';
import { computed, ref, useRoute } from '@nuxtjs/composition-api';
import { useCart, productGetters, useFacet, facetGetters, useContent, contentGetters, cartGetters } from '@vue-storefront/shopizer';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import CategoryPageHeader from '~/components/CategoryPageHeader';
import { addBasePath } from '@vue-storefront/core';

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  setup() {
    const route = useRoute();
    const th = useUiHelpers();
    const uiState = useUiState();
    const { addItem: addItemToCart, cart } = useCart();
    const { result, search, loading } = useFacet();
    const { getManufacturers, manufactureData, getVariants, variantsData, getCategoryDetails, categoryDetails } = useContent();

    const id = computed(() => route.value.params.slug_1);
    const cartItem = computed(() => cartGetters.getItems(cart.value));
    let selectedOption = [];
    let selectedManufature = [];
    onSSR(async () => {
      await Promise.all([
        search({ categoryid: id.value, currentLanguageCode: 'en', selectedManufature, selectedOption}),
        getCategoryDetails({ categoryid: id.value, currentLanguageCode: 'en' }),
        getManufacturers({ categoryid: id.value, currentLanguageCode: 'en' }),
        getVariants({ categoryid: id.value, currentLanguageCode: 'en' })
      ]);
      // await search({ categoryid: id.value, currentLanguageCode: 'en' });
      // await getCategoryDetails({ categoryid: id.value, currentLanguageCode: 'en' });
      // await getManufacturers({ categoryid: id.value, currentLanguageCode: 'en' });
      // await getVariants({ categoryid: id.value, currentLanguageCode: 'en' });
    });

    const productsQuantity = ref({});
    const products = computed(() => facetGetters.getProducts(result.value.data));
    const manufacture = computed(() => contentGetters.getManufactures(manufactureData.value));

    const variants = computed(() => contentGetters.getvariants(variantsData.value));

    const category = computed(() => contentGetters.getCategoryDetail(categoryDetails.value));

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const addToCart = ({ product, quantity }) => {
      const { id, sku } = product;
      addItemToCart({
        product: { id, sku },
        quantity
      });
    };
    const getSortParams = async(sortType, sortValue) => {
      // console.log(sortType)
      const tempSelectedOption = selectedOption;
      const tempSelectedManufature = selectedManufature;
      if (sortType === 'SIZE' || sortType === 'COLOR') {
        const index = selectedOption.findIndex(a => a === sortValue);
        // console.log(index)
        if (index === -1) {
          tempSelectedOption.push(sortValue);
        } else {
          tempSelectedOption.splice(index, 1);
        }
        selectedOption = tempSelectedOption;
      } else if (sortType === 'MANUFACTURE') {
        const index = selectedManufature.findIndex(a => a === sortValue);
        // console.log(index)
        if (index === -1) {
          tempSelectedManufature.push(sortValue);
        } else {
          tempSelectedManufature.splice(index, 1);
        }
        selectedManufature = tempSelectedManufature;
      }
      await search({ categoryid: id.value, currentLanguageCode: 'en', selectedManufature, selectedOption });
    };
    return {
      ...uiState,
      th,
      products,
      loading,
      productGetters,
      pagination,
      // activeCategory,
      addToCart,
      productsQuantity,
      addBasePath,
      manufacture,
      getSortParams,
      variants,
      category,
      selectedOption,
      cartItem
    };
  },
  components: {
    CategoryPageHeader,
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    SfCheckbox
  }
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }
}
.main {
  display: flex;
}
.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
</style>
