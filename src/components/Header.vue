<template>
  <header class="flex space-between align-center">
    <div class="logo-box flex align-center" @click="goHome">
      <img src="../assets/logo.png" class="logo" />
      <span>Jober</span>
    </div>
    <div v-if="user" class="flex">
      <router-link :to="userDetails">
        <span>{{ user.username }}</span>
      </router-link>
      <span @click="logout" class="logout-btn">logout</span>
    </div>
    <span v-else>{{msg}}</span>
    <nav>
      <router-link exact to="/">Home</router-link>
      <router-link exact to="/job">Jobs</router-link>
      <router-link exact to="/comp">Company Demo</router-link>
      <router-link exact to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { user: null, msg: "" };
  },
  methods: {
    goHome() {
      return this.$router.push("/");
    },
    logout() {
      this.$store.dispatch({ type: "logout", user: this.user });
      this.user = null;
      setTimeout(() => (this.msg = ""), 1500);
      this.msg = "Logged out!";
      this.goHome();
    }
  },
  watch: {
    $route() {
      this.user = this.$store.getters.loggedinUser;
    }
  },
  computed: {
    userDetails() {
      return `user/${this.user._id}`;
    }
  }
};
</script>

<style>
</style>