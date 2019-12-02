<template>
  <div id="app">
    <Header :user="user"/>
    <router-view class="main-view"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  computed: {
    user() {
      return this.$store.getters.loggedinUser
    }
  },
  components: {
    Header,
    Footer
  },
  async created() {
    await this.$store.dispatch("loadJobs");
  }
};
</script>
