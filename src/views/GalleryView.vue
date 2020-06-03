<template>
  <div>
    <common-header></common-header>
    <gallery :productSubcategoryId="id"></gallery>
  </div>
</template>

<script>
import Gallery from "./../components/Gallery.vue";
import Header from "./../components/Header.vue";
export default {
  name: "galleryView",
  components: {
    Gallery,
    "common-header": Header
  },
  data: function() {
    return {
      id: 0,

    };
  },
  methods: {
    subcatergoryId: function(id) {
      console.log(id, +" id");
      this.id = id;
    }
  }
};
</script>