<template>
  <section class="home">
    <h1 class="site-header bold">Find Your Dream Job</h1>
    <img class="main-img" src="../assets/imgs/employment.jpg" />
    <div class="container">
      <h2 class="preview-header semi">Recently Added</h2>
      <JobList v-if="recentlyAdded" :jobs="recentlyAdded"></JobList>
      <h2 class="preview-header semi">Most Applied Jobs</h2>
      <JobList v-if="mostApplied" :jobs="mostApplied"></JobList>
      <h2 class="preview-header semi">Trending Jobs</h2>
      <JobList v-if="trendingJobs" :jobs="trendingJobs"></JobList>
    </div>
  </section>
</template>

<script>
import JobList from "../components/JobList.vue";
export default {
  async created() {
    window.scrollTo(0, 0);
    await this.$store.dispatch("loadJobs");
  },
  computed: {
    recentlyAdded() {
      return this.$store.getters.jobsByCreatedAt.slice(0, 4);
    },
    mostApplied() {
      return this.$store.getters.jobsByApplyCnt.slice(0, 4);
    },
    trendingJobs() {
      return this.$store.getters.jobsBySaveCnt.slice(0, 4);
    }
  },
  components: {
    JobList
  }
};
</script>
