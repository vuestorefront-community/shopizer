<template>
  <div class="form">
    <ValidationObserver v-slot="{ handleSubmit, reset }" key="add-review" tag="div">
      <form class="form" @submit.prevent="handleSubmit(handleAddReview(reset))" autocomplete="off">
        <div class="row">
          <ValidationProvider>
              <div class="sf-input form__element">
                  <div class="ratings">
                      <span class="sf-search-bar__icon">
                          <div
                              v-for="i in [1, 2, 3, 4, 5]"
                              :key="`star-${i}`"
                              :class="['icon star-icon', i <= form.rating ? 'star-active-icon' : '']"
                              @click="form.rating = i"
                              >
                          </div>
                          <input
                              type="hidden"
                              name="rating"
                              v-model="form.rating"
                          />
                      </span>
                  </div>
              </div>
          </ValidationProvider>

          <ValidationProvider class="col-6" tag="div" rules="required" v-slot="{ errors }">
              <SfTextarea
                  v-e2e="'review-comment'"
                  v-model="form.comment"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="comment"
                  label="Comment"
                  class="form__element"
                  :cols="68"
                  :rows="10"
              />
          </ValidationProvider>
        </div>
        <SfButton
          type="submit"
          class="sf-button--full-width form__button"
        >
            <SfLoader :class="{ loader: addReviewLoading }" :loading="addReviewLoading">
              <div>{{ 'Add Review' }}</div>
            </SfLoader>
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref, useRoute } from '@nuxtjs/composition-api';
import { SfImage, SfInput, SfButton, SfTextarea, SfLoader, SfAlert, SfBar } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { useReview, useUser } from '@vue-storefront/shopizer';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';
import moment from 'moment';
extend('required', {
  ...required,
  message: 'This field is required'
});
export default {
  name: 'AddProductReview',
  components: {
    SfImage,
    SfInput,
    SfTextarea,
    SfButton,
    SfLoader,
    SfAlert,
    SfBar,
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const route = useRoute();
    const { params: { id } } = route.value;
    // const reviewResponse = ref(false);
    const form = ref({
      productId: parseInt(id),
      rating: 1
    });
    const { send: sendNotification} = useUiNotification();
    const { reviews: createReview, loading: addReviewLoading, addReview } = useReview(`createReview-${id}`);
    const { user, load: loadUser } = useUser();

    const handleAddReview = async (reset) => {
      try {
        const param = {
          customerId: user.value.id,
          date: moment().format('YYYY-MM-DD'),
          description: form.value.comment,
          language: 'en',
          productId: form.value.productId,
          rating: form.value.rating
        };
        await addReview(param).then(() => {
          console.log(createReview.value.code, '789');
          if (createReview.value.code === 200) {
            sendNotification({
              key: 'add_review_sucess',
              message: createReview.value.message,
              type: 'success',
              title: 'Review Success.',
              icon: 'check'
            });
            form.value.comment = null;
            form.value.rating = 1;
          } else {
            sendNotification({
              key: 'add_review_failed',
              message: createReview.value.message,
              type: 'danger',
              title: 'Review Failed.'
            });
          }
        });
        reset();
      } catch (error) {
        // sendNotification({
        //   key: 'add_review_failed',
        //   message: 'A review already exist for this customer and product',
        //   type: 'danger',
        //   title: 'Review Failed.'
        // });
      }
    };
    onSSR(async () => {
      await loadUser();
    });
    return {
      user,
      form,
      createReview: createReview?.value,
      addReviewLoading,
      handleAddReview
    };
  }
};
</script>
<style lang='scss' scoped>
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.icon {
    display: inline-block;
    background-size: contain;
    width: 36px;
    height: 36px;
}
.star-icon {
    background-image: url("/icons/star-icon.svg");
    width: 36px;
    height: 36px;
}
.star-active-icon {
    background-image: url("/icons/star-active-icon.svg");
    width: 36px;
    height: 36px;
}
</style>
