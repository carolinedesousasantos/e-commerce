<template>
  <div>
       <common-header></common-header>
    <product-details v-on:productId="productId"
  @totalItems="this.$emit('totalItemsTest',1)"
    ></product-details>
  </div>
</template>

<script>
import Details from "./../components/Details.vue";
import Header from './../components/Header.vue'
export default {
  name: "galleryView",
  components: {
    "product-details": Details,
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
    teste(e){
console.log(e," teste");
    },
    productId: function(productsSelected) {
      
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