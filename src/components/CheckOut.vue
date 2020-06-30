<template>
  <div>
    <v-container fluid>
      <div>Datos Personales</div>
      <div>
        Método de envío
        <v-row dense>
          <v-col v-for="card in cards" lg="4" md="6" sm="12" :key="card.id">
            <v-card @click="selectShippingMethod(card)" :color="cardColor">
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-subtitle>
                {{card.shippingMethod}}
                <span class="text-right">{{card.shippingPrice}}</span>
              </v-card-subtitle>
              <v-card-text>
                <p class="text-center">
                  <v-icon large>{{card.icon}}</v-icon>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div>Lista de Productos</div>

      <v-row dense>
        <v-col v-for="product in productsList" :key="product[0].id" md="4" sm="12">
          <v-card>
            <v-img
              contain
              :src="product[0].imageSrc"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="250px"
            >
              <v-card-title v-text="product[0].description"></v-card-title>
            </v-img>
            <v-card-subtitle>{{product[0].priceWithDiscount}}&euro;</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>SUBTOTAL
      <div>
        <div id="paypal-button-container"></div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "checkout",
  data: function() {
    return {
      subtotalComputed: 118.0,
      productsList: [],
      shippingMethodSelected: "",
      cardColor: "",
      cards: [
        {
          id: 1,
          title: "Retirar en tienda",
          icon: "fas fa-store",
          flex: 4,

          colMd: 12,

          shippingMethod: "2-5 días laborales",
          shippingPrice: "0.00"
        },
        {
          id: 2,
          title: "Envio a domicilio",
          icon: "fas fa-truck",
          flex: 4,
          colMd: 12,
          shippingMethod: "3-7 días laborales",
          shippingPrice: "5.00"
        },
        {
          id: 3,
          title: "Punto de entrega",
          icon: "fas fa-box",
          flex: 4,
          colMd: 12,
          shippingMethod: "3-7-5 días laborales",
          shippingPrice: "5.00"
        }
      ]
    };
  },
  mounted: function() {
    this.productsList = JSON.parse(localStorage.cartList);
    var subtotal = this.subtotalComputed.toString();
    paypal
      .Buttons({
        createOrder: function(data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: subtotal
                }
              }
            ]
          });
        },
        onApprove: function(data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }
      })
      .render("#paypal-button-container");
    //This function displays Smart Payment Buttons on your web page.
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
    selectShippingMethod(args) {
      this.shippingMethodSelected = args;
      this.cardColor = "#FFF9C4";
    },
    saveItemsIntoCart() {
      var self = this;
      var url = Config.server + Config.saveInfoCart;
      var data = {
        clientId: 1,
        productsList: this.productsList
      };
      // console.log(data,"data");
      // this.$axios
      //   .post(url, data)
      //   .then(response => {
      //     console.log(response.data);
      //     // if (response.data.error) {

      //     // } else {

      //     // }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  }
};
</script>

<style>
</style>