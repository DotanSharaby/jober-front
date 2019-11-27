<template>
  <section class="header">
    <img class="logo" src="../assets/logo.png">
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
</style>