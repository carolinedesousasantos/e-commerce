<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-divider></v-divider>
      <v-btn rounded small fixed right fab @click="drawer = false" elevation="0">
        <v-icon small color="rgb(112, 112, 112)">fas fa-times</v-icon>
      </v-btn>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group
          value="false"
          v-for="(item,i) in categories"
          :key="i"
          @click.prevent="filterSubCategory(item)"
        >
          <template v-slot:activator>
            <v-list-item-title>{{item.description}}</v-list-item-title>
          </template>

          <v-list-group sub-group no-action>
            <v-list-item v-for=" (subCategory,j) in subCategoryFiltrada" :key="j" width="200">
              <v-list-item-title v-text="subCategory.description"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="primary"
      dark
      shrink-on-scroll
      dense
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

<!-- <router-link to="/"> -->
      <v-toolbar-title>E-commerce</v-toolbar-title>
<!-- </router-link> -->
      <v-spacer></v-spacer>

      <v-toolbar
        flat
        color="transparent"
        dense
        min-width="350"
        max-width="350"
        style="padding-right: 10px;margin:20px 0px 20px 0;"
      >
        <v-autocomplete
          id="search"
          single-line
          v-model="select"
          :loading="loading"
          :items="buscador"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Search"
          append-icon="search"
        ></v-autocomplete>
        <v-btn icon small>
          <v-icon >mdi-heart</v-icon>
        </v-btn>
        <v-btn icon small @click="goToLogin">
          <v-icon  v-if="isLogged =='false'">person</v-icon>

          <v-icon   v-if="isLogged =='true'" @click="logout">fas fa-sign-out-alt</v-icon>
        </v-btn>
         <v-btn icon small @click="goToCart">
          <v-icon >fas fa-shopping-bag</v-icon>
          <v-badge color="green" :content="badgeContent" overlap></v-badge>
        </v-btn>
      </v-toolbar>
      <template v-slot:extension>
        <v-tabs dense align-with-title background-color="primary" dark v-show="showTab">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            class="body-2"
            @click.prevent="filterSubCategory(item)"
            link
            v-for=" (item,i) in categories"
            :key="i"
          >{{item.description}}</v-tab>
          <v-tab-item
            v-for=" (item,i) in categories"
            :key="i"
            style="background-color:transparency;width:200px;"
          >
            <v-list dense width="200">
              <v-list-item-group v-model="subCategoryFiltrada" color="primary">
                <v-list-item
                  v-for="(item, i) in subCategoryFiltrada"
                  :key="i"
                  @click="filterSubCategory(item)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.description" class="overline"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-tab-item>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>
<style scoped>
</style>
<script>
import Config from "@/config";
import { bus } from "@/main";

export default {
  props: {
    subcategorySelected: {
      type: Function,
      default: function() {}
    },
    productSubcategoryId: {
      type: Number
    },
    cartItem: {
      type: Function,
      default: function() {}
    }
  },
  created() {
    bus.$on("updateCart", data => {
      this.badgeContent = data.length;
      console.log(data.length,"data.length")
    });
  },
  data: function() {
    return {
      isLogged: localStorage.isLogged,
      subcategoryId: 0,
      item: 1,
      showIconMenu: false,
      drawer: false,
      drawerRight: null,
      right: false,
      left: false,
      buscador: [{ text: "", icon: "" }],
      loading: false,
      search: null,
      select: null,
      categories: [],
      subCategories: [],
      subCategoryFiltrada: [],
      showTab: true,
      badgeContent: 0
    };
  },

  mounted: function() {
    if (
      this.$vuetify.breakpoint.sm == true ||
      this.$vuetify.breakpoint.xs == true
    ) {
      this.showTab = false;
    }
    this.getCategories();
    this.getSubCategories();
  },
  methods: {
    logout(){
      localStorage.isLogged = false;
    },
    filterSubCategory(item) {
      if (this.$route.name != "gallery") {
        this.$router.push("/");
      }

      var result = this.subCategories.filter(
        subCategory => subCategory.categoryId.id == item.id
      );
      this.subCategoryFiltrada = result;
    },
    goToLogin() {
      this.$router.push("/login");
    },
    getCategories() {
      var url = Config.server + Config.categories;
      this.$axios
        .get(url)
        .then(response => {
          this.categories = response.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSubCategories() {
      var url = Config.server + Config.subCategories;
      this.$axios
        .get(url)
        .then(response => {
          this.subCategories = response.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToCart() {
      if (localStorage.cartList != "undefined") {
        this.$router.push("/cart");
      } else {
        console.log(" nao tem produto");
      }
    }
  }
};
</script>