<template>
    <header class="flex space-between align-center" :class="{'opened-menu': !!this.isMenuOpen}">
        <div class="screen" @click="toggleMenu"></div>
        <div class="logo-box flex align-center" @click="goHome">
            <img src="../assets/logo.png" class="logo" />
            <span>Jober</span>
        </div>
        <button @click="toggleMenu" class="menu-btn">☰</button>
        <div class="flex">
            <nav @click="toggleMenu">
                <router-link exact to="/job">Jobs</router-link>
                <router-link exact to="/comp">Company Demo</router-link>
                <router-link exact to="/about">About</router-link>
            </nav>
            <img v-if="user" :src="user.img" />
            <button v-else @click="goToLogin" class="login-btn">Login</button>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        user: Object
    },
    data() {
        return {
            msg: '',
            isMenuOpen: false
        };
    },
    methods: {
        goHome() {
            return this.$router.push('/');
        },
        logout() {
            this.$store.dispatch({ type: 'logout', user: this.user });
            setTimeout(() => (this.msg = ''), 1500);
            this.msg = 'Logged out!';
            this.goHome();
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        goToLogin() {
            this.$router.push('/login');
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