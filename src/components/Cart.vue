<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" :md="7" :sm="12" v-for=" (product,i) in productsList" :key="i">
          <v-row class="mb-6" justify="center" no-gutters>
            <v-col lg="2">
              <v-card class="pa-2" outlined tile width="170" height="220">
                <v-img :src="product[0].imageSrc" height="200" cover></v-img>
              </v-card>
            </v-col>
            <v-col>
              <v-card outlined tile>
                <v-card-title class="subtitle-1">{{product[0].description}}</v-card-title>
                   <v-card-subtitle>
                  <p
                    class="caption font-weight-light"
                    style="text-decoration:line-through;"
                    v-if="product[0].offer > 0"
                  >
                    {{product[0].realPrice}} &euro;
                    &nbsp;
                  </p>
                  <p class="font-weight-bold pink--text">{{product[0].priceWithDiscount}}&euro;</p>
                </v-card-subtitle>

                <v-card-actions>
                 
                    <v-icon  small color="pink" @click="deleteItem(i)">fas fa-trash-alt</v-icon>
                 
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" :md="5" :sm="12">
          <v-card elevation="2" width="350" class="mx-auto" v-show="productsList.length > 0">
            <v-form lazy-validation>
              <v-card-title>
                <v-icon color="pink" left small>fas fa-tag</v-icon>Got a promo code?
              </v-card-title>
              <v-card-subtitle></v-card-subtitle>

              <v-card-text>
                <p class="subtitle-2">Subtotal</p>
                <v-divider></v-divider>
                <p class="subtitle-2">{{subtotalComputed}}</p>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions>
                <v-btn tile block large color="primary" @click="isLogged">Comenzar pedido</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        <v-card elevation="2" width="350" class="mx-auto" v-show="!productsList.length > 0">
      <v-card-subtitle>
        <p class="text-center headline font-weight-medium">No hay productos</p>
      </v-card-subtitle>
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
import Config from "@/config.js";
export default {
  name: "cart",
  data: function() {
    return {
      productsList: []
    };
  },
  mounted: function() {
    if (localStorage.cartList ) {
      this.productsList = JSON.parse(localStorage.cartList);
      bus.$emit("updateCart", this.productsList);
    }
  },
  computed: {
    subtotalComputed: function() {
      var total = 0;
      for (var i = 0; i < this.productsList.length; i++) {
        total += this.productsList[i][0].priceWithDiscount;
      }

      return total;
    }
  },
  methods: {
    isLogged() {
      var isLogged = false;
      if (localStorage.isLogged == "true") {
        this.$router.push("/checkout");
      } else {
        this.$router.push("/login");
      }
      return isLogged;
    },
    deleteItem(item) {
      this.productsList.splice(item, 1);
      console.log(this.productsList);

      bus.$emit("updateCart", this.productsList);
      localStorage.cartList = JSON.stringify(this.productsList);
    }
  }
};
</script>