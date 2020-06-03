<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" :md="7" :sm="12" v-for=" (product,i) in productsList" :key="i">
          <v-row class="mb-6" justify="center" no-gutters>
            <v-col lg="2">
              <v-card class="pa-2" outlined tile width="170" height="220">
                <v-img :src="product.imageSrc" height="200" cover></v-img>
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined tile>
                <v-card-title class="subtitle-1">{{product.description}}</v-card-title>
                <v-card-subtitle>
                  <p
                    class="caption font-weight-light"
                    style="text-decoration:line-through;"
                    v-if="product.offer > 0"
                  >&euro;{{product.price}} &nbsp;</p>
                  <p
                    class="font-weight-bold pink--text"
                  >&euro;{{(product.price - (product.offer/100) * product.price)}}</p>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn icon color="pink" @click="deleteItem(i)">
                    <v-icon small>fas fa-trash-alt</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" :md="5" :sm="12">
          <v-card elevation="2" width="350" class="mx-auto">
            <v-form lazy-validation>
              <v-card-title>
                <v-icon color="pink" left small>fas fa-tag</v-icon>Got a promo code?
              </v-card-title>
              <v-card-subtitle></v-card-subtitle>

              <v-card-text>
                <p class="subtitle-2">Subtotal</p>
                <p class="subtitle-2">{{subtotalComputed}}</p>
                <v-divider></v-divider>
                <p class="caption font-weight-thin">Delivery costs</p>
                <p class="caption font-weight-thin">5.00</p>
                <v-divider></v-divider>
                <p class="subtitle-2 font-weight-bold">Estimated Total</p>
                <p class="subtitle-2 font-weight-bold">{{subtotalComputed + 5.00}}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn tile block large color="primary">Go to checkout</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
</style>
<script>
import { bus } from "@/main";

export default {
  name: "cart",
  data: function() {
    return {
      productsList: []
    };
  },
  mounted: function() {
    if (localStorage.cartList != "undefined") {
      this.productsList = JSON.parse(localStorage.cartList);
      bus.$emit("updateCart", this.productsList);
    }
  },
  computed: {
    subtotalComputed: function() {
      var total = 0;
      for (var i = 0; i < this.productsList.length; i++) {
        total +=
          this.productsList[i].price -
          (this.productsList[i].offer / 100) * this.productsList[i].price;
        console.log(total);
      }

      return total;
    }
  },
  methods: {
    deleteItem(item) {
      this.productsList.splice(item, 1);
      console.log(this.productsList);

      bus.$emit("updateCart", this.productsList);
      localStorage.cartList = JSON.stringify(this.productsList);
    }
  }
};
</script>