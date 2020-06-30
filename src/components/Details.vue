<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="8" sm="6" x-sm="12">
          <v-card elevation="2">
            <v-carousel :show-arrows="false" cycle height="400" cover>
              <v-carousel-item v-for="(item,i) in slide" :key="i" :src="item"></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6" x-sm="12">
          <v-card elevation="2" width="350" class="mx-auto">
            <v-card-text>
              <v-form lazy-validation>
                <v-chip
                  v-if="details.offer > 0"
                  class="ma-2"
                  color="pink"
                  label
                  text-color="white"
                  small
                >
                  <v-icon left x-small>fas fa-tag</v-icon>
                  -{{details.offer}}%
                </v-chip>

                <v-card-title class="title font-weight-black">{{details.description}}</v-card-title>

                <v-card-subtitle class="body-2">
                  <span
                    class="caption font-weight-light"
                    style="text-decoration:line-through;"
                    v-if="details.offer > 0"
                  >{{details.realPrice}} &nbsp;</span>
                  <span class="font-weight-bold pink--text">{{details.priceWithDiscount}}&euro;</span>
                  <v-btn
                    small
                    class="float-right"
                    icon
                    :color="heartColor"
                    @mouseover.prevent="heartColor = 'pink'"
                    @mouseout.prevent="heartColor = ''"
                  >
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-card-subtitle>
                <v-row>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      id="sizeList"
                      outlined
                      hide-details
                      hide-hint
                      label="Choose size"
                      v-model="sizeSelected"
                      :items="sizes"
                      item-text="description"
                      item-value="id"
                      @change="addToCart"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12">
                    <v-btn tile block large color="primary" @click="openSizeSelector">Add to my bag</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
</style>
<script>
import Config from "@/config.js";
import { bus } from "@/main";

export default {
  name: "product-details",
  props: {
    totalItems: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      textUnderline: "",
      heartColor: "",
      sizes: [],
      sizeSelected: [],
      details: {},
      slide: [],
      productSelected: [],
      counter: 0,
      productsList: []
    };
  },
  mounted: function() {
    this.getDetails(this.$route.query.id);
    this.getSizes();

    if (localStorage.cartList) {
      this.productsList = JSON.parse(localStorage.cartList);
      bus.$emit("updateCart", this.productsList);
    }
  },
  methods: {
    addToCart(args) {
      this.details["sizeInfo"] = args;
      this.productSelected.push(this.details);
      this.productsList.push(this.productSelected);
      localStorage.cartList = JSON.stringify(this.productsList);
      this.sizeSelected = [];
      this.productSelected = [];
      bus.$emit("updateCart", this.productsList);
    },

    openSizeSelector() {
      document.getElementById("sizeList").click();
    },
    getSizes() {
      var url = Config.server + Config.sizes;
      this.$axios
        .get(url)
        .then(response => {
          this.sizes = response.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetails(productId) {
      var url = Config.server + Config.details;
      var data = {
        productId: productId
      };
      this.$axios
        .post(url, data)
        .then(response => {
          this.details = response.data.result[0];
          this.slide.push(
            response.data.result[0].imageSrc,
            response.data.result[0].imgSlide1,
            response.data.result[0].imgSlide2,
            response.data.result[0].imgSlide3,
            response.data.result[0].imgSlide4
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>