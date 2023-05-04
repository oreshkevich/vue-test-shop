<template>
  <div class="grid">
    <div>
      <h2>Brands</h2>

      <check-box-list @handleChecked="handleChecked" ref="formChecked" />
      <div class="button-wrap">
        <button @click="handleSort()" class="button">Apply</button>
        <button @click="handleThrow()" class="button-throw">&#10005; Throw off</button>
      </div>
    </div>
    <div class="card">
      <div class="card__wrap">
        <div v-for="products in cardFilterCheck" :key="products.id">
          <card-item :products="products" @addToOrder="addToOrder" />
        </div>
      </div>
      <div class="pagination" v-if="onShow">
        <button class="btn-page" :disabled="currentPage === 0" @click="prevPage">Previous</button>
        {{ currentPage + 1 }} of {{ pageCountSize }}
        <button class="btn-page" :disabled="currentPage === pageCountSize - 1" @click="nextPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBoxList from '@/components/CheckBoxList';
import CardItem from '@/components/CardItem';
import products from '@/db/products.json';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      filteredPosts: [],
      cardFilterCheck: products,
      cards: products,
      cardsProducts: products,
      cartItems: [],
      currentPage: 0,
      pageSize: 6,
      pageCountSize: 1,
      onShow: true,
      selectedBrandsParent: [],
    };
  },
  components: {
    CheckBoxList,
    CardItem,
  },
  name: 'McvMain',
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(['quantityItem']),
  },
  methods: {
    ...mapActions(['addCartItem', 'addQuantity']),
    handleSort() {
      const cardFilter = this.filteredPosts.map((a) => a.id);
      const cardsFilter = products.filter((item) => cardFilter.includes(item.id));
      this.cardFilterCheck = cardsFilter;
      this.clickHide(false);
    },
    handleChecked(checkedList) {
      this.filteredPosts = checkedList;
    },
    handleThrow() {
      this.cardFilterCheck = products;
      this.clickHide(true);
      this.updateVisible(this.currentPage);
      this.$refs.formChecked.clean();
    },
    addToOrder(item, quantity = 1) {
      const itemIndex = this.cartItems.findIndex((value) => value.id === item);
      if (itemIndex < 0) {
        const cardsFilter = this.cards.filter((value) => value.id === item);
        const newItem = {
          ...cardsFilter,
          id: item,
          quantity: quantity,
        };
        this.cartItems = [...this.cartItems, newItem];
      } else {
        const newItem = {
          ...this.cartItems[itemIndex],
          quantity: this.cartItems[itemIndex].quantity + quantity,
        };
        const newCart = this.cartItems.slice();
        newCart.splice(itemIndex, 1, newItem);
        this.cartItems = newCart;
      }
      const quantityOfProduct = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
      this.addQuantity(quantityOfProduct);
      this.addCartItem(this.cartItems);
    },
    pageCount() {
      let lengthCart = this.cardsProducts.length,
        lengthPageSize = this.pageSize;
      this.pageCountSize = Math.ceil(lengthCart / lengthPageSize);
    },
    nextPage() {
      this.currentPage = this.currentPage + 1;
      this.updateVisible(this.currentPage);
    },
    prevPage() {
      this.currentPage = this.currentPage - 1;
      this.updateVisible(this.currentPage);
    },
    updateVisible(pageNumber) {
      const start = pageNumber * this.pageSize,
        end = start + this.pageSize;
      this.cardFilterCheck = this.cardsProducts.slice(start, end);
    },
    clickHide(change) {
      this.onShow = change;
    },
  },
  mounted() {
    this.updateVisible(this.currentPage);
    this.pageCount();
  },
};
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: 231px 1fr;
  grid-template-rows: 1fr;
  grid-gap: 38px;
  padding-bottom: 54px;
  margin-top: 46px;
}

@media (max-width: 500px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 31px;
  }
}

.button {
  margin-top: 10px;
  font-weight: 700;
  font-size: 0.75rem;
  align-items: center;
  text-align: center;
  color: #fff;
  padding: 12px 27px;
  background: #1e4b05;
  border-radius: 50px;
}

.button-wrap {
  display: flex;
  flex-direction: column;
}

.button-throw {
  margin-top: 20px;
  color: #1e4b05;
  text-decoration: underline;
}

.collection-item {
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  .image {
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
  }

  .custom-button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    .card__element {
      opacity: 0.8;
    }

    .custom-button {
      opacity: 0.85;
      display: flex;
    }
  }

  .collection-footer {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    .name {
      width: 90%;
      margin-bottom: 15px;
    }

    .price {
      width: 10%;
    }
  }
}
.btn-page {
  border: 2px solid #ac2929;
  background-color: #64ac29;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  padding: 5px 10px;
  font-size: 12px;
  outline: none;
  transition: 0.2s;
  margin-right: 10px;
  margin-left: 10px;
}
.not-found {
  color: #ac2929;
}
.btn-page:hover:disabled {
  cursor: not-allowed;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
