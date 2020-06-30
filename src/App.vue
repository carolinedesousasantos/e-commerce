<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer dark padless>
      <v-card flat tile color="primary" class="white--text text-center">
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
          >{{ link }}</v-btn>
        </v-row>
        <v-divider></v-divider>
        <v-card-text
          class="white--text pt-0"
        >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="150px">
        <div>
          <v-btn class="mt-6" icon @click="sheet = !sheet" fixed right>
            <v-icon right dark color="primary">fas fa-times</v-icon>
          </v-btn>
        </div>

        <v-btn class="mt-6" color="primary" @click="sheet = !sheet">
          ACCEPTAR
          <v-icon right dark>fas fa-check</v-icon>
        </v-btn>
        <div class="py-3">
          Utilizamos cookies para mejorar su experiencia de compra.
          <a href>Aviso legal.</a>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  name: "common-footer",
  data: function() {
    return {
      sheet: true,
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ],
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
    };
  },
  mounted: function() {
    localStorage.isLogged = false;
  }
};
</script>