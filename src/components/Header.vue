<template>
  <header class="flex space-between align-center">
    <div class="logo-box flex align-center" @click="goHome">
      <img src="../assets/logo.png" class="logo" />
      <span>Jober</span>
    </div>
    <nav>
      <router-link exact to="/">Home</router-link>
      <router-link exact to="/job">Jobs</router-link>
      <router-link exact to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goHome() {
      return this.$router.push('/');
    }
  }
};
</script>

<style>
</style>