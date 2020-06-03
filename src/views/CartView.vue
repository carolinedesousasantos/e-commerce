<template>
  <div>
    <common-header></common-header>
    <cart></cart>
  </div>
</template>

<script>
import Cart from "./../components/Cart.vue";
import Header from "./../components/Header.vue";
export default {
  name: "cartView",
  components: {
    cart: Cart,
    "common-header": Header
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>