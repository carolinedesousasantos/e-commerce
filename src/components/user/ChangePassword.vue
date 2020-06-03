<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8>
          <v-card class="elevation-12" width="400">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Reset Password</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col class="d-flex" cols="12">
                    <v-text-field
                      :rules="passwordRules"
                      label="Password"
                      v-model="password"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex" cols="12">
                    <v-text-field
                      :rules="passwordConfirmedRules"
                      label="Confirm Password"
                      v-model="passwordconfirmed"
                    type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-alert dense text :type="alertColor" v-if="showAlert" >{{ message }} <a v-if="alertColor == 'success'"  @click.prevent="redirectTologin">Redirect to login.</a></v-alert>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn tile block large color="primary" :loading="loadingButton" @click="resetPassword">Reset</v-btn>
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
a{
color:#4caf50 !important;
text-decoration:underline;
}
</style>
<script>
import Config from "@/config.js";

export default {
  name: "change-password",
  data: function() {
    return {
      message: "a",
      showAlert: false,
      alertColor: "success",
      password: "",
      passwordconfirmed: "",
      passwordRules: [
        v => {
          const pattern = /^(?=.*[A-Za-z\d])(?=.*[0-9])(?=.{3,})^\S*$/;
          return (
            v => !!v || "Required",
            pattern.test(v) ||
              "Min. 8 characters with at least one letter and one number. White space is not allowed."
          );
        }
      ],
      passwordConfirmedRules: [
        v => !!v || "Required",
        v => this.password == v || "Password must be the same."
      ],
      loadingButton: false
    };
  },
  mounted() {
  },
  methods: {
    resetPassword() {
      var self = this;
      var url = Config.server + Config.resetPassword;

      var data = {
        newPassword: this.password,
        rst: this.$route.query.rst,
        email:this.$route.query.email,
      };

      console.log(data, "data");
      if (this.$refs.form.validate()) {
        this.loadingButton = true;
        this.$axios
          .post(url, data)
          .then(response => {
            console.log(response.data);
            this.showAlert = true;
            this.message = response.data.msg;
            if (response.data.error) {
              this.alertColor = "error";
            } else {
              this.alertColor = "success";
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(function() {
            self.loadingButton = false;
          });
      }
    },
    redirectTologin(){
      this.$router.push("/");
    }
  }
};
</script>