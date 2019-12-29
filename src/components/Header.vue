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
      <nav @click="toggleMenu,resetPadding($event)">
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
        >
          Back-Office
          <span v-if="newNotify > 0" class="notification">◉</span>
        </h3>
        <h3 class="nav-btn semi flex-center" v-if="isUserMenuOpen" @click="logout">Logout</h3>
      </div>
      <div class="nav-user flex-center">
        <img class="user-img" v-if="user" :src="userImg" @click="toggleUserMenu" />
        <button v-else @click="goToLogin" class="login-btn">Login</button>
        <div class="notification flex-center" v-if="newNotify">
          <span>{{newNotify}}</span>
        </div>
      </div>
      <button @click="toggleMenu" class="menu-btn">☰</button>
    </div>
  </header>
</template>

<script>
import SocketService from "@/services/SocketService";

export default {
  props: {
    user: Object
  },
  data() {
    return {
      msg: "",
      isMenuOpen: false,
      isUserMenuOpen: false,
      newNotify: 0
    };
  },
  methods: {
    goHome() {
      this.isMenuOpen = false;
      if (this.$route.fullPath === "/") return;
      this.$router.push("/");
    },
    logout() {
      this.newNotify = 0;
      this.$emit("loggedOut");
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
      this.isMenuOpen = false;
      if (this.$route.fullPath === "/login") return;
      this.$router.push("/login");
    },
    goToProfile() {
      if (this.$route.fullPath === "/user") return;
      this.$router.push(`/user`);
    },
    goToCompPage() {
      this.newNotify = 0;
      if (this.$route.fullPath === "/comp") return;
      this.$router.push(`/comp`);
    },
    checkNotifys() {
      const self = this;
      const newNots = this.$store.getters.newJobNotifys;
      if (newNots.length) {
        newNots.forEach(async function(app) {
          const newNotify = await self.$store.dispatch({
            type: "setNewNotify",
            app
          });
          if (newNotify) self.newNotify++;
        });
      }
    },
    resetPadding(ev) {
      window.scrollTo(0, 0);
      const elNavbar = ev.path[1];
      elNavbar.children.forEach(elLink => (elLink.style.padding = ""));
      this.$emit("setVal");
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
  },
  created() {
    SocketService.on("notify", app => {
      this.newNotify++;
      this.$store.dispatch({ type: "setNewNotify", app });
      this.$store.dispatch({ type: "loadJobs" });
    });
  },
  watch: {
    user: function(newVal) {
      if (newVal) this.checkNotifys();
    }
  },
  mounted() {
    if (this.user) {
      this.checkNotifys();
    }
  }
};
</script>