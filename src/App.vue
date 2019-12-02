<template>
  <div id="app">
    <Header />
    <router-view class="main-view"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  async created() {
    await this.$store.dispatch("loadJobs");
  }
};
</script>

<style lang="scss">
</style>
