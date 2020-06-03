<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-card class="elevation-12" width="400">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Profile</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col class="d-flex" cols="12"></v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex" cols="12"></v-col>
                </v-row>
                <v-alert dense text :type="alertColor" v-if="showAlert">
                  {{ message }}
                  <a
                    v-if="alertColor == 'success'"
                    @click.prevent="redirectTologin"
                  >Redirect to login.</a>
                </v-alert>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn tile block large color="primary" :loading="loadingButton" @click>Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style scoped>
/* .container {
  height: 100vh !important;
} */
.v-card {
  margin: auto !important;
  border-radius: 10px !important;
}
a {
  color: #4caf50 !important;
  text-decoration: underline;
}
</style>
<script>
import Config from "@/config.js";
import { bus } from "@/main";

export default {
  name: "profile",
  data: function() {
    return {
      message: "a",
      showAlert: false,
      alertColor: "success",
      loadingButton: false
    };
  },
  mounted: function() {
    if (localStorage.cartList != "undefined") {
      bus.$emit("updateCart", JSON.parse(localStorage.cartList));
    }
  }
};
</script>