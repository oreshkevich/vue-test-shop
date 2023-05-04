<template>
  <div class="card__item collection-item">
    <div class="card__element">
      <img class="card__img" :src="require(`@/assets${products.image}`)" :alt="products.title" />
    </div>
    <button @click="handleClickId" class="custom-button">Add to cart</button>
    <div class="card__description">
      <h2 class="card__title">{{ products.title }}</h2>
      <p class="card__text">
        <span class="card__text-span"> {{ products.regular_price.currency }}: </span>
        <span>{{ products.regular_price.value }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import brands from '@/db/brands.json';
export default {
  props: { products: { type: Object, require: true } },
  data() {
    return {
      brands: brands,
      selectedBrands: [],
    };
  },
  methods: {
    handleClickId() {
      this.$emit('addToOrder', this.products.id);
    },
  },
};
</script>
<style lang="scss">
.card {
  position: relative;
}

.card__wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card__item {
  max-width: 255px;
  border: 1px solid #000;
  background-color: #dbd9d9;
  border-radius: 20px;
}

.card__title {
  font-weight: 500;
  font-size: 1.3125rem;
  line-height: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.card__description {
  height: 96px;
  padding-top: 21px;
}
.card__text {
  text-align: center;
}
.card__text-span {
  padding-right: 20px;
}
.custom-button {
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  &.google-sign-in {
    background-color: #4285f4;
    color: white;

    &:hover {
      background-color: #357ae8;
      border: none;
    }
  }

  &.inverted {
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
      background-color: black;
      color: white;
      border: none;
    }
  }
}
</style>
