<template>
  <section class="job-page">
    <router-link class="edit-link" to="/job/edit">Add a New Job</router-link>
    <JobList v-if="jobs" :jobs="jobs"></JobList>
  </section>
</template>

<script>
import JobList from "../components/JobList.vue";

export default {
  computed: {
    jobs() {
      return this.$store.getters.jobsToShow;
    }
  },
  created() {
    this.$store.dispatch("loadJobs");
  },
  components: {
    JobList
  }
};
</script>

