<template>
  <div id="app">
    <Header
      :user="user"
      ref="header"
      @loggedOut="logout"
      @setVal="set"
    />
    <transition name="view">
      <router-view class="main-view"></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SocketService from "@/services/SocketService";

export default {
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch({ type: "logout", user: this.user });
      this.$router.push("/login");
    },
    handleScroll(ev) {
      if(!this.$refs.header) return
      if (ev.path[1].scrollY >= 50) {
        this.$refs.header.$el.style.height = "55px";
        ev.path[0].links.forEach(link => {
          if (link.classList[0] === "router-link-exact-active") {
            link.style.padding = "16px 25px";
          }
        });
      } else {
        this.$refs.header.$el.style.height = "75px";
        // ev.path[0].links.forEach(link => link.style.padding = "25px");
      }
    },
    set(){
      this.$refs.header.$el.style.height = "75px";
    }
  },
  components: {
    Header,
    Footer
  },
  async created() {
    window.addEventListener("scroll", this.handleScroll);
    SocketService.setup();
    await this.$store.dispatch("loadJobs");
  }
};
</script>
