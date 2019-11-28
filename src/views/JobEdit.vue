<template>
  <section class="job-edit">
    <h1 v-if="!jobToSave._id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob" class="flex column">
      <label>Name:</label>
      <input type="text" v-model="jobToSave.owner.name" placeholder="Name" />

      <label>Position:</label>
      <input type="text" v-model="jobToSave.title" placeholder="Position" />
      <label>Address:</label>
      <input type="text" v-model="jobToSave.loc.address" placeholder="Address" />

      <label>Logo:</label>
      <input type="text" v-model="jobToSave.owner.logoUrl" placeholder="Logo" />
      <label>Images:</label>
      <input type="text" v-model="jobToSave.img" placeholder="Images" />
      

      <label>Description:</label>
      <textarea placeholder="Description" v-model="jobToSave.desc"></textarea>

      <label>Salery:</label>
      <input type="number" placeholder="Salery"/>
      <input @change="setUrl" type="file" multiple />
      <button>Save</button>
    </form>
    <button v-if="jobToSave._id" @click="remove">Remove</button>
    <pre>{{jobToSave}}</pre>
  </section>
</template>

<script>
import UtilService from "../services/UtilService";

export default {
  data() {
    return {
      jobToSave: {
        owner: { name: "", logoUrl: "" },
        title: "",
        loc: { address: "" },
        desc: "",
        img: "",
        payment: 0
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
      this.$router.go(-1);
    },
    async setUrl(ev) {
      const res = await UtilService.upload(ev);
      if (!res) return;
      this.jobToSave.img = res.url;
    },
    async remove() {
      await this.$store.dispatch({ type: "removeJob", id: this.jobToSave._id });
      this.$router.push("/");
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