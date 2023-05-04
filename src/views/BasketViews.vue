<template>
  <div class="home">
    <div class="todo-wrapper">
      <BasketItemVue />
    </div>
  </div>
</template>

<script>
import BasketItemVue from '@/components/BasketItem.vue';
export default {
  name: 'BasketViews',
  components: { BasketItemVue },
};
</script>
