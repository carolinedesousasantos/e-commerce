<template>
  <div>
    <common-header></common-header>
    <login></login>
  </div>
</template>

<script>
import Login from "./../components/user/Login.vue";
import Header from "./../components/Header.vue";

export default {
  name: "loginView",
  components: {
    Login,
    "common-header": Header
  }
};
</script>