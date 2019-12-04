<template>
  <section class="home">
    <h1 class="site-header bold">Find Your Dream Job</h1>
    <img class="main-img" src="../assets/imgs/employment.jpg" />
    <div class="container">
      <h2 class="preview-header semi">Top Rated Companies</h2>
      <JobList v-if="jobs" :jobs="jobs"></JobList>
      <h2 class="preview-header semi">Most Applied Jobs</h2>
      <JobList v-if="jobs" :jobs="jobs"></JobList>
      <h2 class="preview-header semi">Recently Added</h2>
      <JobList v-if="jobs" :jobs="jobs"></JobList>
    </div>
  </section>
</template>

<script>
import JobList from "../components/JobList.vue";
export default {
  computed: {
    jobs() {
      return this.$store.getters.jobsToShow.slice(0, 4);
    }
  },
  created() {
    this.$store.dispatch("loadJobs");
    window.scrollTo(0, 0);
  },
  components: {
    JobList
  }
};
</script>
