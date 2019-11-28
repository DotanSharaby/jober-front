<template>
  <section class="job-edit">
    <h1 v-if="!jobToSave._id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob" class="flex column">
      <label>Name:</label>
      <input type="text" v-model="jobToSave.owner.name" placeholder="Micky Mouse" />

      <label>Position:</label>
      <input type="text" v-model="jobToSave.title" placeholder="Mice Walker" />

      <label>Address:</label>
      <input type="text" v-model="jobToSave.loc.address" placeholder="Narnia" />

      <label>
        Logo:
        <input
          type="file"
          name="logoFile"
          id="logoFile"
          class="inputfile inputLogo"
          @change="getUrl($event,'logo')"
        />
        <label for="logoFile">Choose a file</label>
      </label>
      <input type="url" v-model="jobToSave.owner.logoUrl" placeholder="Logo URL.." />

      <label>Images:</label>
      <input type="url" v-model="jobToSave.img" placeholder="Images" />

      <label>Description:</label>
      <textarea
        placeholder="Describe the position, working place etc.."
        v-model="jobToSave.desc"
        rows="5"
      ></textarea>

      <label>Salery:</label>
      <input type="number" placeholder="Expected Salery" v-model="jobToSave.payment" />

      <input type="file" name="file" id="file" class="inputfile" @change="getUrl" multiple />
      <label for="file">Choose files..</label>

      <button>Save</button>
    </form>

    <button v-if="jobToSave._id" @click="remove">Remove</button>

    <pre>images-{{images}}</pre>

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
        payment: null
      },
      jobs: [],
      images: []
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
    async getUrl(ev, type) {
      if (ev.target.files.length > 1) {
        var files = ev.target.files;
        files = Object.entries(files);
        files = files.map(file => {
          return UtilService.upload(file[1]);
        });
        return Promise.all(files).then(res => {
          console.log(res);
          return (this.images = res);
        });
      }
      const file = await UtilService.upload(ev);
      if (!file) return;
      if (type === "logo") this.jobToSave.owner.logoUrl = file.url;
      else {
        this.jobToSave.img = file.url;
      }
    },
    async remove() {
      await this.$store.dispatch({ type: "removeJob", id: this.jobToSave._id });
      this.$router.push("/");
    }
  }
};
</script>