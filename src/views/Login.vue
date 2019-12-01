<template>
  <section class="login">
    <h1>Login</h1>

    <form @submit.prevent="doLogin" class="flex column">
      <label>Email:</label>
      <input type="text" v-model="loginCred.email" placeholder="Email" />

      <label>Password:</label>
      <input type="text" v-model="loginCred.password" placeholder="Password" />

      <button class="save-btn">Login</button>
    </form>
    <h3>{{ msg }}</h3>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginCred: {
        email: "",
        password: ""
      },
      msg: ""
    };
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.email || !cred.password) {
        setTimeout(() => (this.msg = ""), 2000);
        return (this.msg = "Please enter user/password");
      }
      const user = await this.$store.dispatch({
        type: "login",
        userCred: cred
      });
      if (!user) {
        setTimeout(() => (this.msg = ""), 2000);
        return (this.msg = "User does not exist");
      }
      setTimeout(() => {
        this.msg = "";
        this.$router.push("/job");
      }, 2000);
      this.msg = "Logged in successfully!";
      this.loginCred = {};
    }
  }
};
</script>