<template>
  <section>
    <h1 v-if="job.id">Edit Job</h1>
    <h1 v-else>Add Job</h1>
  </section>
</template>


<script>
export default {
  data() {
    return {
      job: {}
    };
  },
  async created() {
    const jobId = this.$route.params.id;
    if (this.jobId) {
      this.job = await this.$store.dispatch({ type: "getJob", id: jobId });
    }
  }
};
</script>
