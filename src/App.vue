<template>
    <div id="app">
        <Header :user="user" @loggedOut="logout" />

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
        }
    },
    components: {
        Header,
        Footer
    },
    async created() {
        SocketService.setup();
        await this.$store.dispatch("loadJobs");
    }
};
</script>
