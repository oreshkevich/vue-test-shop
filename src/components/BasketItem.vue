<template>
  <div class="checkout-page">
    <div class="checkout-header">
      <div class="header-block">
        <span>Product</span>
      </div>
      <div class="header-block">
        <span>Description</span>
      </div>
      <div class="header-block">
        <span>Quantity</span>
      </div>
      <div class="header-block">
        <span>Price</span>
      </div>
      <div class="header-block">
        <span>Remove</span>
      </div>
    </div>

    <div v-for="cartItem in $store.state.cartItemsArr" :key="cartItem.id">
      <checkout-item :cartItem="cartItem" @removeItem="removeItem" @addItem="addItem" @clearItem="clearItem">
      </checkout-item>
    </div>
    <div class="total">TOTAL: ${{ sumCart }}</div>
    <form class="form" method="post" noValidate @submit.prevent="submit">
      <div class="form__wrapper">
        <div class="form__item">
          <label class="form__control" htmlFor="firstName"> firstName </label>
          <input
            v-model="firstName"
            class="form__input transform"
            type="text"
            name="firstName"
            placeholder="firstName"
          />
          <p v-if="validate" class="small">enter more than 3 characters</p>
        </div>
        <div class="form__item">
          <label class="form__control" htmlFor="phone"> Phone </label>
          <input v-model="phone" class="form__input transform" name="phone" placeholder="phone" id="name" type="tel" />
          <p v-if="validPhone" class="small">enter the correct number</p>
        </div>
      </div>
      <div class="form__button">
        <button
          :class="[buttonDirty ? 'button__dirty' : 'button__form']"
          value="Send"
          type="submit"
          :disabled="buttonDirty"
          name="disable_button"
          id="disable_button"
        >
          Place an order
        </button>
      </div>
      <div class="card-container"></div>
    </form>
    <modal-item v-if="isFormChange" @closeModel="closeModel" :messageData="messageData" />
  </div>
</template>

<script>
import CheckoutItem from '@/components/CheckoutItem.vue';
import { mapActions } from 'vuex';
import ModalItem from '@/components/ModalItem';
export default {
  data() {
    return {
      sumCart: 0,
      firstName: '',
      phone: '',
      messageData: '',
      isFormChange: false,
    };
  },
  components: {
    CheckoutItem,
    ModalItem,
  },
  computed: {
    validate() {
      if (this.firstName.length < 3) {
        return true;
      } else {
        return false;
      }
    },
    validPhone() {
      if (this.phone.search(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\\./0-9]*$/g) !== -1) {
        return false;
      } else {
        return true;
      }
    },
    buttonDirty() {
      if (!this.validPhone && !this.validate) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions(['addItemBasket', 'addQuantity', 'removeItemBasket', 'clearItemBasket', 'clearItemPost']),
    sumItem(cart) {
      const sum = cart.reduce((accumulatedQuantity, cartItem) => {
        return accumulatedQuantity + cartItem.quantity * cartItem[0].regular_price.value;
      }, 0);

      this.sumCart = sum.toFixed(2);
    },
    addItem(item) {
      this.addItemBasket(item);
      this.sumItem(this.$store.state.cartItemsArr);
    },
    removeItem(item) {
      this.removeItemBasket(item);
      this.sumItem(this.$store.state.cartItemsArr);
    },
    clearItem(item) {
      this.clearItemBasket(item);
      this.sumItem(this.$store.state.cartItemsArr);
    },
    openModelFormChange() {
      this.isFormChange = true;
    },
    closeModel() {
      this.isFormChange = false;
      this.firstName = '';
      this.phone = '';
      this.clearItemPost();
      this.sumCart = 0;
      this.$router.push('/');
    },
    submit() {
      if (!this.validPhone && !this.validate) {
        fetch(`https://task-react-4ea21-default-rtdb.europe-west1.firebasedatabase.app/notes.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: new Date().getTime(),
            firstName: this.firstName,
            phone: this.phone,
            cartItems: this.$store.state.cartItemsArr,
          }),
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((data) => {
            this.messageData = 'Ok, data has been sent successfully';
            this.openModelFormChange();
            console.log(data);
          })
          .catch((err) => {
            this.openModelFormChange();
            this.messageData = 'error';
            console.log(`error: ${err}`);
          });
      }
    },
  },

  mounted() {
    this.sumItem(this.$store.state.cartItemsArr);
  },
};
</script>

<style lang="scss">
.checkout-page {
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  .checkout-header {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;

    .header-block {
      text-transform: capitalize;
      width: 23%;

      &:last-child {
        width: 8%;
      }
    }
  }

  .total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
  }
}

.button-wrap {
  margin-top: 20px;
}

.form {
  margin-top: 50px;
  width: 100%;

  text-align: center;
}

.form__wrapper {
  margin-left: auto;
  margin-right: auto;
  background: #767a81;
  display: flex;
  justify-content: space-between;
  padding: 17px 30px 30px 30px;
}
.form__item {
  margin-right: 10px;
}
.form__input {
  cursor: pointer;
  width: 257px;
  height: 40px;
  background: #ffffff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  border: 1px solid #5c87db;
}

input::-webkit-input-placeholder {
  color: #b7bac1;
}
input:-moz-placeholder {
  color: #b7bac1;
}

.form__control {
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.button__form {
  cursor: pointer;
  border-width: 0;
  margin-top: 25px;
  margin-right: 30px;
  padding: 10px 0;
  width: 158px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #1e4b05;
  border-radius: 10px;
}
.button__dirty {
  cursor: pointer;
  border-width: 0;
  margin-top: 25px;
  margin-right: 30px;
  padding: 10px 0;
  width: 158px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #a7a7a8;
  border-radius: 10px;
}

.input-field {
  height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  display: block;
  width: 40%;
  font-weight: 400;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 2px solid black;
}

.small {
  color: rgb(139, 8, 8);
}

@media (max-width: 1050px) {
  .checkout-page {
    width: 75%;
  }
}
@media (max-width: 786px) {
  .checkout-page {
    width: 100%;
  }
  .form__input {
    width: 100%;
  }
}
@media (max-width: 414px) {
  .checkout-item {
    flex-direction: column;
  }
  .checkout-page .checkout-header {
    display: none;
  }
  .checkout-item .name,
  .checkout-item .quantity,
  .checkout-item .price {
    width: 100%;
    text-align: center;
  }
  .checkout-item .quantity {
    display: block;
  }
  span {
    margin-top: 10px;
  }
  .checkout-page .total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 22px;
  }
  .form__wrapper {
    flex-direction: column;
  }
}
</style>
