<template>
    <section class="login">
        <h1 class="semi">Login</h1>

        <form @submit.prevent="doLogin" class="flex column">
            <label>Email:</label>
            <input type="email" v-model="loginCred.email" placeholder="Email" />

            <label>Password:</label>
            <input type="password" v-model="loginCred.pass" placeholder="Password" />

            <button class="save-btn">Login</button>
        </form>
        <h3>{{ msg }}</h3>
        <h3 class="signup-msg text-center">
            Don't have account yet?
            <router-link to="/signup" class="semi profile-link">Sign up</router-link>
        </h3>
    </section>
</template>

<script>
export default {
    data() {
        return {
            loginCred: {
                email: '',
                pass: ''
            },
            msg: ''
        };
    },
    methods: {
        async doLogin() {
            const cred = this.loginCred;
            if (!cred.email || !cred.pass) return (this.msg = "Please fill both fields");
            const user = await this.$store.dispatch({ type: "login", userCred: cred });
            if (!user) return this.msg = "Wrong email or password";
            this.msg = "";
            this.$router.push("/job");
            this.loginCred = {};
        }
    }
};
</script>