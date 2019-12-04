<template>
  <section class="job-edit">
    <h1 v-if="!editedJob._id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob" class="flex">
      <section class="flex column">
        <label>Address:</label>
        <input type="text" v-model="editedJob.address" placeholder="Tel Aviv" />
        <label>Description:</label>
        <textarea
          placeholder="Describe the position, working place etc.."
          v-model="editedJob.desc"
          rows="5"
        ></textarea>
      </section>

      <section class="flex column">
        <label>Choose up to 3 questions:</label>
        <drop-down @setVal="setQuests" :quests="editedJob.quests" />
      </section>

      <section class="flex column">
        <label>Perks:</label>
        <div class="icons-container flex">
          <font-awesome-icon
            @click="addProp"
            class="icon-item"
            data-desc="Dog friendly"
            title="Dog friendly"
            :icon="['fas', 'paw']"
          />
          <font-awesome-icon
            @click="addProp"
            class="icon-item"
            data-desc="Transportation"
            title="Transportation"
            :icon="['fas', 'bus']"
          />
          <font-awesome-icon
            @click="addProp"
            class="icon-item"
            data-desc="Restaurants"
            title="Restaurants"
            :icon="['fas', 'utensils']"
          />
          <font-awesome-icon
            @click="addProp"
            class="icon-item"
            data-desc="Parking"
            title="Parking"
            :icon="['fas', 'parking']"
          />
          <font-awesome-icon
            @click="addProp"
            class="icon-item"
            data-desc="Coffee shops"
            title="Coffee shops"
            :icon="['fas', 'mug-hot']"
          />
        </div>
        <label>Salary:</label>
        <input type="number" placeholder="Expected Salery" v-model="editedJob.payment" />
        <label>
          Image:
          <input
            type="file"
            name="file"
            id="file"
            class="inputfile"
            @change="getUrl"
          />
          <label for="file">Choose File</label>
        </label>
        <button class="save-btn">Save</button>
      </section>

      <section class="flex column">
        <div class="image" v-if="editedJob.img">
          <img :src="editedJob.img" height="100px" />
          <button @click="removeImg">x</button>
        </div>
        <button v-if="editedJob._id" @click="remove">Remove Job</button>
        <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
      </section>
    </form>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";

import dropDown from "../components/Dropdown";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      editedJob: {
        owner: { name: "" },
        title: "",
        address: "",
        perks: [],
        desc: "",
        img: "",
        payment: null,
        quests: [],
        reqSkills: []
      },
      isLoading: false
    };
  },
  async created() {
    if (!this.user) return this.$router.go(-1);

    await this.$store.dispatch({ type: "loadJobs" });
    const jobId = this.$route.params.id;
    if (jobId) {
      await this.$store.dispatch({
        type: "getJob",
        id: jobId
      });
      const job = this.$store.getters.currJob;
      this.editedJob = JSON.parse(JSON.stringify(job));
    }
  },
  methods: {
    async saveJob() {
      await this.$store.dispatch({ type: "saveJob", job: this.editedJob });
      this.$router.go(-1);
    },
    async getUrl(ev) {
      this.isLoading = true;
      const file = await UploadService.upload(ev.target.files[0]);
      this.isLoading = false;
      this.editedJob.img = file.url;
    },
    async remove() {
      await this.$store.dispatch({ type: "removeJob", id: this.editedJob._id });
      this.$router.push("/");
    },
    addProp(ev) {
      // Adding the fontawesome icon name to the editedJob object for our future use
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      if (this.editedJob.perks.includes(target.dataset.icon)) {
        this.editedJob.perks.splice(
          this.editedJob.perks.indexOf(target.dataset.icon),
          1
        );
      } else this.editedJob.perks.push(target.dataset.icon);

      target.classList.toggle("active");
    },
    removeImg() {
      this.editedJob.img = "";
    },
    setQuests(val) {
      this.editedJob.quests = val;
    }
  },
  computed: {
    user() {
      const user = this.$store.getters.loggedinUser;
      return user;
    }
  },
  components: {
    ScaleLoader,
    dropDown
  }
};
</script>
