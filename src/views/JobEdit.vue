<template>
  <section class="job-edit">
    <h1 v-if="!jobToSave._id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob" class="flex column">
      <input type="text" v-model="jobToSave.owner.name" placeholder="Name" />
      <input type="text" v-model="jobToSave.title" placeholder="Position" />
      <input type="text" v-model="jobToSave.loc.address" placeholder="Address" />
      <textarea placeholder="Description" v-model="jobToSave.desc"></textarea>
      <button>Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      jobToSave: {
        owner: { name: "" },
        title: "",
        loc: { address: "" },
        desc: ""
      },
      jobs: []
    };
  },
  async created() {
    this.jobs = await this.$store.dispatch({ type: "loadJobs" });
    const jobId = this.$route.params.id;
    if (jobId) {
      this.jobToSave = await this.$store.dispatch({
        type: "getJob",
        id: jobId
      });
    }
  },
  methods: {
    async saveJob() {
      await this.$store.dispatch({ type: "saveJob", job: this.jobToSave });
      this.jobs = this.$store.getters.jobsToShow;
    }
  }
};
</script>

<style scoped>
.job-edit {
  margin: 0 auto;
  text-align: center;
}
.job-edit form {
  border: 1px solid black;
  max-width: 550px;
  margin: 0 auto;
}
</style>