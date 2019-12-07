<template>
  <header
    class="flex space-between align-center"
    :class="{'opened-menu': this.isMenuOpen, 'opened-user-menu': this.isUserMenuOpen}"
  >
    <div class="screen" @click="toggleMenu"></div>
    <div class="logo-box flex align-center" @click="goHome">
      <img src="../assets/logo.png" class="logo" />
      <span>Jober</span>
    </div>
    <div class="flex align-center justify-center">
      <nav @click="toggleMenu">
        <router-link exact to="/">Home</router-link>
        <router-link exact to="/job">Jobs</router-link>
        <router-link exact to="/about">About</router-link>
      </nav>
      <div
        v-if="user"
        class="user-menu flex column space-between align-center"
        :class="{shown: isUserMenuOpen}"
        @click="toggleUserMenu"
      >
        <h3 class="nav-btn semi flex-center" @click="goToProfile" v-if="isUserMenuOpen">Profile</h3>
        <h3
          class="nav-btn semi flex-center"
          v-if="isUserMenuOpen && isCompany"
          @click="goToCompPage"
        >Back-Office</h3>
        <h3 class="nav-btn semi flex-center" v-if="isUserMenuOpen" @click="logout">Logout</h3>
      </div>
      <img class="user-img" v-if="user" :src="userImg" @click="toggleUserMenu" />
      <button v-else @click="goToLogin" class="login-btn">Login</button>
      <button @click="toggleMenu" class="menu-btn">☰</button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: Object,
    postedJobsCnt: Number
  },
  data() {
    return {
      msg: "",
      isMenuOpen: false,
      isUserMenuOpen: false
    };
  },
  methods: {
    goHome() {
      if (this.$route.fullPath === "/") return;
      this.$router.push("/");
    },
    logout() {
      this.$emit('loggedOut');
    },
    toggleMenu() {
      if (this.isUserMenuOpen) {
        this.isMenuOpen = false;
        this.isUserMenuOpen = false;
        return;
      }
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleUserMenu() {
      this.isMenuOpen = false;
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    goToLogin() {
      if (this.$route.fullPath === "/login") return;
      this.$router.push("/login");
    },
    goToProfile() {
      if (this.$route.fullPath === "/user") return;
      this.$router.push(`/user`);
    },
    goToCompPage() {
      if (this.$route.fullPath === "/comp") return;
      this.$router.push(`/comp`);
    }
  },
  computed: {
    userImg() {
      if (this.user.img) return this.user.img;
      return "https://www.afrombira.com/img/no-user.png";
    },
    isCompany() {
      if (this.$store.getters.userPostedJobs.length) return true;
      return false;
    }
  }
};
</script>

<style>
</style>