<template>
  <header class="flex space-between align-center">
    <div class="logo-box flex align-center" @click="goHome">
      <img src="../assets/logo.png" class="logo" />
      <span>Jober</span>
    </div>

    <span v-if="user">{{ user.email }}</span>

    <nav>
      <router-link exact to="/">Home</router-link>
      <router-link exact to="/job">Jobs</router-link>
      <router-link exact to="/about">About</router-link>
      <router-link exact to="/login">Login</router-link>
      <router-link exact to="/signup">Signup</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { user: null };
  },
  methods: {
    goHome() {
      return this.$router.push("/");
    }
  },
  watch: {
    $route() {
      this.user = this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style>
</style>