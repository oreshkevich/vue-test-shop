<template>
  <div>
    <div class="checked-list" v-for="brand in brands" :key="brand">
      <label class="checkbox-other">
        <input type="checkbox" v-bind:value="brand" v-model="selectedBrands" @change="handleCheckedBrand" />
        <span>{{ brand.title }}</span>
      </label>
    </div>
  </div>
</template>
<script>
import brands from '@/db/brands.json';
export default {
  props: {
    selectedBrandsParent: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      brands: brands,
      selectedBrands: [],
    };
  },
  methods: {
    handleCheckedBrand() {
      this.$emit('handleChecked', this.selectedBrands);
    },
    clean() {
      this.selectedBrands = [];
    },
  },
};
</script>
<style lang="scss">
.checked-list {
  margin-top: 10px;
}

.checkbox-other {
  display: block;
  margin: 0 0 10px 0;
  line-height: 22px;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.checkbox-other input[type='checkbox'] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}
.checkbox-other span {
  display: inline-block;
  position: relative;
  padding: 0 0 0 35px;
  line-height: 22px;
}
.checkbox-other span:before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #2b7335;
  box-shadow: inset 0 0 3px #8a8a8a;
}

/* Checked */
.checkbox-other input[type='checkbox'] + span:after {
  content: '';
  opacity: 0;
  transition: opacity 0.3s ease;
}
.checkbox-other input[type='checkbox']:checked + span:after {
  content: '✓';
  color: green;
  font-size: 30px;
  font-weight: 900;
  position: absolute;
  left: 2px;
  top: -2px;
  opacity: 1;
}

/* Focus */
.focused span:before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Hover */
.checkbox-other span:hover:after {
  filter: brightness(110%);
}

/* Active */
.checkbox-other span:active:before,
.checkbox-other span:active:after {
  filter: brightness(80%);
}

/* Disabled */
.checkbox-other input[type='checkbox']:disabled + span {
  color: #666;
  cursor: default;
}
.checkbox-other input[type='checkbox']:disabled + span:before,
.checkbox-other input[type='checkbox']:disabled + span:after {
  filter: grayscale(100%);
  opacity: 0.6;
}
</style>
