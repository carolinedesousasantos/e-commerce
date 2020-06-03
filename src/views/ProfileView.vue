<template>
  <div>
    <common-header></common-header>
    <profile></profile>
  </div>
</template>

<script>
import Profile from "./../components/user/Profile.vue";
import Header from "./../components/Header.vue";

export default {
  name: "createAccountView",
  components: {
    Profile,
    "common-header": Header
  }
};
</script>