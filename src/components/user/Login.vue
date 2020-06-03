<template>
  <div>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-tabs background-color="primary" dark grow>
        <v-tab @change="cleanData">Recover password    <v-btn absolute dark  text right color="primary" @click="dialog = false">
        <v-icon color="white"  >mdi-close</v-icon>
      </v-btn></v-tab>
        <v-tab-item>
          <v-card elevation="0" width="500">
            <v-card-text>
              <v-form ref="formSendEmail" lazy-validation>
                <v-row>
                  <v-col class="d-flex" cols="12">
                    <v-text-field
                      :rules="emailRules"
                      outlined
                      label="Email"
                      v-model="email"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-alert dense text :type="alertType" v-if="showAlert">{{ message }}</v-alert>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                tile
                block
                large
                color="primary"
                @click.prevent="sendEmail"
                :loading="loading"
              >Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-dialog>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card width="500" outlined>
            <v-tabs grow right>
              <v-tab color @change="cleanData">Login</v-tab>
              <v-tab @change="cleanData">Create account</v-tab>

              <v-tab-item>
                <v-card elevation="0">
                  <v-card-text>
                    <v-form ref="formLogin" v-model="validLogin" lazy-validation>
                      <v-row>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            :rules="emailRules"
                            outlined
                            label="Email"
                            v-model="email"
                            type="text"
                          ></v-text-field>
                        </v-col>

                        <v-col class="d-flex" cols="12">
                          <a
                            @click.prevent="dialog = true"
                            style="text-align:right;width:100%;text-decoration:underline;"
                          >Get new password</a>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            @click:append="showPassword = !showPassword"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            outlined
                            :rules="passwordRules"
                            label="Password"
                            v-model="password"
                          ></v-text-field>
                        </v-col>
                        <!--  <v-col class="d-flex" cols="12">
                          <v-checkbox
                            v-model="rememberPassword"
                            hide-details
                            label="Remember me on this device"
                          ></v-checkbox>
                        </v-col>-->
                      </v-row>
                      <v-alert dense text :type="alertType" v-if="showAlert">{{ message }}</v-alert>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      tile
                      block
                      large
                      color="primary"
                      @click.prevent="login"
                      :loading="loading"
                    >Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card elevation="0">
                  <v-card-text>
                    <v-form ref="formRegister" v-model="validRegister" lazy-validation>
                      <v-row>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            :rules="rules"
                            outlined
                            label="Name"
                            v-model="name"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            :rules="rules"
                            outlined
                            label="surname"
                            v-model="surname"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                outlined
                                :rules="rules"
                                v-model="birthdate"
                                label="Birthday date"
                                prepend-inner-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="birthdate"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1900-01-01"
                              @change="saveBirthDate"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-select
                            :rules="[v => !!v || 'this  field is required']"
                            outlined
                            :items="genders"
                            label="Gender"
                            @change="onSelectGender"
                          ></v-select>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            :rules="emailRules"
                            outlined
                            label="Email"
                            v-model="email"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-text-field
                            :rules="passwordRules"
                            outlined
                            label="Password"
                            v-model="password"
                            type="password"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12">
                          <v-checkbox
                            v-model="policyAccepted"
                            hide-details
                            label="Accept privacy policy."
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                      <v-alert dense text :type="alertType" v-if="showAlert">{{ message }}</v-alert>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      tile
                      block
                      large
                      color="primary"
                      @click.prevent="createAccount"
                      :loading="loading"
                    >Create account</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<style scoped>
/* .container {
  margin-top: 200px;
  margin-bottom: 50px;
} */
.v-card {
  margin: auto !important;
  border-radius: 10px !important;
}
</style>
<script>

import Config from "@/config.js";
import { bus } from "@/main";

export default {
  name: "login",
  data: function() {
    return {
      dialog: false,
      name: "",
      surname: "",
      message: "",
      showAlert: false,
      alertType: "",
      genders: ["Female", "Male"],
      genderSelected: [],
      email: "",
      password: "",
      rules: [v => !!v || "This field is required"],
      emailRules: [
        v => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
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
      validLogin: true,
      validRegister: true,
      showPassword: false,
      rememberPassword: false,
      birthdate: null,
      birthDateSelected: "",
      menu: false,
      policyAccepted: true,
      loading: false
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  mounted: function() {
     if (localStorage.cartList != "undefined") {
      bus.$emit("updateCart",  JSON.parse(localStorage.cartList));
    }
  },
  methods: {
    onSelectGender(args) {
      this.genderSelected = args;
    },
    saveBirthDate(birthdate) {
      this.$refs.menu.save(birthdate);
      this.birthDateSelected = birthdate;
    },
    cleanData() {
      this.showAlert = false;
      this.message = "";
    },
    login() {
      var self = this;
      var url = Config.server + Config.login;
      var data = {
        email: this.email,
        password: this.password
      };

      if (this.$refs.formLogin.validate()) {
        this.loading = true;
        this.$axios
          .post(url, data)
          .then(response => {
            console.log(response.data);
            if (response.data.error) {
              this.showAlert = true;
              this.message = response.data.msg;
              this.alertType = "error";
            } else {
              this.showAlert = false;
              this.message = "";
              console.log("redirect");
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(function() {
            self.loading = false;
          });
      }
    },
    createAccount() {
      var self = this;
      var url = Config.server + Config.createAccount;
      console.log(url);

      var data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        birthDate: this.birthDateSelected,
        gender: this.genderSelected,
        password: this.password,
        policyAccepted: this.policyAccepted
      };

      if (this.$refs.formRegister.validate()) {
        this.loading = true;
        console.log(data);
        this.$axios
          .post(url, data)
          .then(response => {
            console.log(response);
            this.showAlert = true;
            this.message = response.data.msg;
            if (response.data.error) {
              this.alertType = "error";
            } else {
              this.alertType = "success";
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(function() {
            self.loading = false;
          });
      }
    },
    sendEmail() {
     var self = this;
      var url = Config.server + Config.sendEmailRecoverPassword;
      var data = {
        email: this.email
      };
      console.log(data," data");
      if (this.$refs.formSendEmail.validate()) {
        this.loading = true;
        this.$axios
          .post(url, data)
          .then(response => {
            console.log(response.data);
            this.showAlert = true;
            this.message = response.data.msg;
            console.log(response.data.error," response.data.error");
            if (response.data.error) {
              this.alertType = "error";
            } else {
              this.alertType = "success";
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(function() {
            self.loading = false;
          });
      }
    }
  }
};
</script>