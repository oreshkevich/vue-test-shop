<template>
  <header class="header">
    <div class="container">
      <nav class="header__logo">
        <div class="nav-wrapper">
          <router-link to="/" class="router-link"> Shop </router-link>
          <router-link to="/basket" class="router-link"
            >Basket
            <div class="cart-icon">
              <img class="shopping-icon" src="@/assets/svg/shopping-bag.svg" alt="basket" />
              <span class="item-count">{{ $store.getters.quantityItem }}</span>
            </div>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
body {
  height: 100%;
  justify-content: center;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #363636;
  letter-spacing: 0.1px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
  transition: color 0.6s ease;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

img {
  max-width: 100%;
  display: block;
}

article > * + * {
  margin-top: 1em;
}

input,
button,
textarea,
select {
  padding: 0;
  font: inherit;
}
button {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.wrapper > main {
  flex: 1 1 auto;
}
.wrapper > * {
  min-width: 0;
}
.container {
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}
.content {
  min-height: calc(100vh - 180px);
}

.active {
  background-clip: text;
  font-weight: 700;
  font-size: 18px;
  color: #660808;
}

@media (max-width: 468px) {
  .container {
    padding: 0 16px;
  }
}

.header {
  margin-top: 10px;
}
.cart-icon {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .shopping-icon {
    width: 30px;
    height: 30px;
  }

  .item-count {
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    bottom: 12px;
  }
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
