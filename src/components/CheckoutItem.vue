<template>
  <div class="checkout-item">
    <div class="image-container">
      <img :src="require(`@/assets${cartItem[0].image}`)" alt="item" />
    </div>
    <span class="name">{{ cartItem[0].title }}</span>
    <span class="quantity">
      <button :disabled="cartItem.quantity === 1" @click="removeItem" class="arrow">&#10094;</button>
      <span class="value">{{ cartItem.quantity }}</span>
      <button @click="addItem" class="arrow">&#10095;</button>
    </span>
    <span class="price">{{ cartItem[0].regular_price.value }}</span>
    <button @click="clearItem" class="remove-button">&#10005;</button>
  </div>
</template>

<script>
export default {
  props: { cartItem: { type: Object, require: true } },
  methods: {
    removeItem() {
      this.$emit('removeItem', this.cartItem);
    },
    addItem() {
      this.$emit('addItem', this.cartItem.id);
    },
    clearItem() {
      this.$emit('clearItem', this.cartItem.id);
    },
  },
};
</script>

<style lang="scss">
.checkout-item {
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .image-container {
    width: 23%;
    padding-right: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .name,
  .quantity,
  .price {
    width: 23%;
  }

  .quantity {
    display: flex;

    .arrow {
      cursor: pointer;
    }
    .arrow:hover:disabled {
      cursor: not-allowed;
    }

    .cartItem {
      margin: 0 10px;
    }
  }

  .remove-button {
    padding-left: 12px;
    cursor: pointer;
  }
}
</style>
