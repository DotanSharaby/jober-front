<template>
  <section class="job-edit">
    <h1 v-if="!jobToSave.id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob">
      <input type="text" v-model="jobToSave.name" placeholder="Name" />
      <input type="text" v-model="jobToSave.position" placeholder="Position" />
      <input type="text" v-model="jobToSave.address" placeholder="Address" />
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
        name: "",
        position: "",
        address: "",
        desc: ""
      }
    };
  },
  async created() {
    const jobId = this.$route.params.id;
    if (jobId) {
      this.jobToSave = await this.$store.dispatch({
        type: "getJob",
        id: jobId
      });
    }
  },
  methods: {
    saveJob() {
      this.$store.dispatch({ type: "saveJob", job: this.jobToSave });
    }
  }
};
</script>
