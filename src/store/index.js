import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItemsArr: [],
    quantityItem: 0,
    currentPage: 0,
    pageSize: 4,
    pageCountSize: 1,
  },
  getters: {
    cartItemsArr: (state) => state.cartItemsArr,
    quantityItem: (state) => state.quantityItem,
    currentPage: (state) => state.currentPage,
    pageSize: (state) => state.pageSize,
    pageCountSize: (state) => state.pageCountSize,
  },
  actions: {
    addCartItem({ commit }, value) {
      commit('add_cartItem', value);
    },
    addQuantity({ commit }, value) {
      commit('add_quantity', value);
    },
    addItemBasket({ commit }, value) {
      commit('add_item', value);
    },
    removeItemBasket({ commit }, value) {
      commit('remove_item', value);
    },
    clearItemBasket({ commit }, value) {
      commit('clear_item_basket', value);
    },
    clearItemPost({ commit }, value) {
      commit('clear_item_post', value);
    },
    pageCount({ commit }) {
      commit('page_count');
    },
  },
  mutations: {
    add_cartItem(state, item) {
      state.cartItemsArr = item;
    },
    add_quantity(state, item) {
      state.quantityItem = item;
    },
    add_item(state, cart) {
      const cartFilterItem = state.cartItemsArr.map((cartItem) =>
        cartItem.id === cart ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      state.cartItemsArr = cartFilterItem;
      state.quantityItem = state.cartItemsArr.reduce((sum, item) => sum + item.quantity, 0);
    },
    clear_item_basket(state, cart) {
      const cartFilterItem = state.cartItemsArr.filter((cartItem) => cartItem.id !== cart);
      state.cartItemsArr = cartFilterItem;
      state.quantityItem = state.cartItemsArr.reduce((sum, item) => sum + item.quantity, 0);
    },

    remove_item(state, cart) {
      const cartFilterItem = state.cartItemsArr.map((cartItem) => {
        if (cartItem.id === cart.id && cart.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return cartItem;
        }
      });

      state.cartItemsArr = cartFilterItem;
      state.quantityItem = state.cartItemsArr.reduce((sum, item) => sum + item.quantity, 0);
    },
    clear_item_post(state) {
      const cartFilterItem = [];
      state.cartItemsArr = cartFilterItem;
      state.quantityItem = 0;
    },
    page_count(state) {
      let lengthCart = state.cartItemsArr.length,
        lengthPageSize = state.pageSize;
      state.pageCountSize = Math.ceil(lengthCart / lengthPageSize);
    },
  },
  modules: {},
});
