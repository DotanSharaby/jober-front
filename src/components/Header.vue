<template>
  <header class="flex space-between align-center">
    <img src="../assets/logo.png" class="logo">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/job">Jobs</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style>
</style>