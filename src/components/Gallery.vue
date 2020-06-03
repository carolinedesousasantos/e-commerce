<template>
  <div>
    <v-row dense>
      <v-col v-for="product in productsFiltered" :key="product.id" lg="3" md="4" sm="6">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
            <v-img :src="product.imageSrc" class="white--text align-end" height="300px">
              <v-chip
                v-if="product.offer > 0"
                class="ma-2"
                color="pink"
                label
                text-color="white"
                small
              >
                <v-icon left x-small>fas fa-tag</v-icon>
                -{{product.offer}}%
              </v-chip>
            </v-img>
            <v-card-title
              :style="textUnderline"
              @mouseover.prevent="textUnderline = 'text-decoration:underline;'"
              @mouseout.prevent="textUnderline = 'text-decoration:none;'"
              class="subtitle-1"
              @click="goToDetails(product)"
            >{{product.description}}</v-card-title>

            <v-card-subtitle class="body-2">
              <span
                class="caption font-weight-light"
                style="text-decoration:line-through;"
                v-if="product.offer > 0"
              >&euro;{{product.price}} &nbsp;</span>
              <span
                class="font-weight-bold pink--text"
              >&euro;{{(product.price - (product.offer/100) * product.price)}}</span>

              <v-btn
                small
                class="float-right"
                icon
                :color="product.bagColor"
                @click="addToCart(product)"
              >
                <v-icon>fas fa-shopping-bag</v-icon>
              </v-btn>
              <v-btn
                small
                class="float-right"
                icon
                :color="product.heartColor"
                @click="product.heartColor = 'pink'"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-card v-show="!productsFiltered.length > 0">
      <v-card-title>
        <p class="text-center headline font-weight-medium">No hay productos</p>
      </v-card-title>
    </v-card>

    <v-card flat>
      <v-pagination v-show="productsFiltered.length > 0" v-model="page" :length="5" circle></v-pagination>
    </v-card>
  </div>
</template>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.7;
}
</style>
<script>
import { bus } from "@/main";
import Config from "@/config.js";

export default {
  name: "gallery",
  props: {
    productSubcategoryId: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      heartColor: "",
      bagColor: "",
      textUnderline: "",
      min: 0,
      max: 100,
      slider: 40,
      range: [0, 100],
      sizes: [],
      page: 3,
      allProducts: [],
      productsFiltered: [],
      cartList: []
    };
  },
  mounted: function() {
    if (localStorage.cartList != "undefined") {
      this.cartList = JSON.parse(localStorage.cartList);
      bus.$emit("updateCart", JSON.parse(localStorage.cartList));
    }

    this.getProducts();
  },
  watch: {
    productSubcategoryId: function(val) {
      var result = this.allProducts.filter(
        product => product.subCategoryId.id == val
      );
      this.productsFiltered = result;
    }
  },
  methods: {
    addToCart(item) {
      item.bagColor = "orange";
      this.cartList.push(item);
      localStorage.cartList = JSON.stringify(this.cartList);
      bus.$emit("updateCart", this.cartList);
    },
    goToDetails(productDetails) {
      this.$router.push(`/details?id=${productDetails.id}`);
    },
    getProducts() {
      var url = Config.server + Config.products;
      this.$axios
        .get(url)
        .then(response => {
          console.log(response.data);
          this.allProducts = response.data.result;
          this.productsFiltered = this.allProducts;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>