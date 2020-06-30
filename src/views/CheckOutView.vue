<template>
<div>
   <common-header></common-header>
<checkout  v-on:productId="productId"
  @totalItems="this.$emit('totalItemsTest',1)"></checkout>
  </div>
</template>

<script>
import CheckOut from "./../components/CheckOut.vue";
import Header from './../components/Header.vue'
export default {
  name: "galleryView",
  components: {
    "checkout": CheckOut,
     "common-header":Header
  },
  props:{
 
  },
  data: function() {
    return {
      id: 0,
      totalItems: 0,
      productsSelected: []
    };
  },
  mounted: function() {
    if (localStorage.totalItems != undefined) {
      this.totalItems = Number(localStorage.totalItems);
    }
  },
  methods: {
    productId(productsSelected) {
      
      localStorage.setItem(
        "productsSelected",
        JSON.stringify(productsSelected)
      );
      this.totalItems++;
      localStorage.totalItems = this.totalItems;
      console.log(this.totalItems);
    }
  }
};
</script>

<style>

</style>