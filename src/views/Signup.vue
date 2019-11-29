
<template>
  <section class="signup">
    <h1>Signup</h1>

    <form @submit.prevent="doSignup" class="flex column">
      <label>Email:</label>
      <input type="email" v-model="signupCred.email" placeholder="Email" />
      <label>Password:</label>
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <label>First Name:</label>
      <input type="text" v-model="signupCred.firstName" placeholder="Harry" />
      <label>Last Name:</label>
      <input type="text" v-model="signupCred.lastName" placeholder="Potter" />
      
      <button class="save-btn">Signup</button>
    </form>

    <h3>{{ msg }}</h3>
  </section>
</template>


<script>
export default {
  data() {
    return {
      signupCred: {},
      msg: ""
    };
  },
  methods: {
    doSignup() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.firstName || !cred.lastName) {
        setTimeout(() => (this.msg = ""), 2000);
        return (this.msg = "Please fill up the form");
      }
      this.$store.dispatch({ type: "signup", userCred: cred });
      setTimeout(() => {
        this.msg = "";
        this.$router.push("/job");
      }, 2000);
      this.msg = "Signup Successfully!";
    }
  }
};
</script>