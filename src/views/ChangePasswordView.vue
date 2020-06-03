<template>
  <div>
    <common-header></common-header>
    <change-password></change-password>
  </div>
</template>

<script>
import ChangePassword from "./../components/user/ChangePassword.vue";
import Header from "./../components/Header.vue";

export default {
  name: "createAccountView",
  components: {
    "change-password": ChangePassword,
    "common-header": Header
  }
};
</script>