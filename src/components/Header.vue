<template>
  <section class="header">
    <img src="../assets/logo.png" class="logo">
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