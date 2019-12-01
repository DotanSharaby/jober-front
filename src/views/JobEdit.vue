<template>
  <section class="job-edit">
    <h1 v-if="!editedJob._id">Add Job</h1>
    <h1 v-else>Edit Job</h1>

    <form @submit.prevent="saveJob" class="flex column">
      <label v-if="getLoggedinUser">{{ loggedinUser.username }}</label>

      <label>Position:</label>
      <input type="text" v-model="editedJob.title" placeholder="Front End Developer" />

      <label>Address:</label>
      <input type="text" v-model="editedJob.loc.address" placeholder="Tel Aviv" />

      <label>Perks:</label>
      <div class="icons-container flex">
        <font-awesome-icon
          @click="addProp"
          class="icon-item"
          data-desc="Dog friendly"
          :icon="['fas', 'paw']"
        />
        <font-awesome-icon
          @click="addProp"
          class="icon-item"
          data-desc="Transportation"
          :icon="['fas', 'bus']"
        />
        <font-awesome-icon
          @click="addProp"
          class="icon-item"
          data-desc="Restaurants"
          :icon="['fas', 'utensils']"
        />
        <font-awesome-icon
          @click="addProp"
          class="icon-item"
          data-desc="Parking"
          :icon="['fas', 'parking']"
        />
        <font-awesome-icon
          @click="addProp"
          class="icon-item"
          data-desc="Coffee shops"
          :icon="['fas', 'mug-hot']"
        />
      </div>
      <label>Description:</label>
      <textarea
        placeholder="Describe the position, working place etc.."
        v-model="editedJob.desc"
        rows="5"
      ></textarea>

      <label>Salary:</label>
      <input type="number" placeholder="Expected Salery" v-model="editedJob.payment" />
      <label>
        Images:
        <input type="file" name="file" id="file" class="inputfile" @change="getUrl" multiple />
        <label for="file">Choose files</label>
      </label>
      <button class="save-btn">Save</button>
    </form>
    <button v-if="editedJob._id" @click="remove">Remove Job</button>
    <p>{{ msg }}</p>
    <div class="flex gallery-container">
      <gallery
        v-if="editedJob.imgs.length"
        :images="editedJob.imgs"
        :index="index"
        @close="index = null"
      ></gallery>
      <div
        class="image"
        v-for="(image, imageIndex) in editedJob.imgs"
        :key="imageIndex"
        @click="index = imageIndex"
        :style="{ backgroundImage: 'url(' + image + ')', width: '300px', height: '200px' }"
      >
        <button @click.stop="removeImg(imageIndex)">x</button>
      </div>
    </div>
    <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";

import VueGallery from "vue-gallery";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      editedJob: {
        owner: { name: "" },
        title: "",
        loc: { address: "" },
        props: [],
        desc: "",
        imgs: [],
        payment: null
      },
      loggedinUser: "",
      index: null,
      msg: "",
      isLoading: false
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadJobs" });
    const jobId = this.$route.params.id;
    if (jobId) {
      this.editedJob = await this.$store.dispatch({
        type: "getJob",
        id: jobId
      });
    }
    const user = this.$store.getters.loggedinUser;
    if (user) {
      this.loggedinUser = JSON.parse(JSON.stringify(user));
      delete this.user.password;
    }
  },
  methods: {
    async saveJob() {
      await this.$store.dispatch({ type: "saveJob", job: this.editedJob });
      this.$router.go(-1);
    },
    async getUrl(ev) {
      this.isLoading = true;
      var files = ev.target.files;
      files = Object.values(files).map(file => {
        return UploadService.upload(file);
      });
      return Promise.all(files).then(files => {
        var urls = [];
        files.forEach(file => urls.push(file.url));
        this.isLoading = false;
        setTimeout(() => (this.msg = ""), 2000);
        this.editedJob.imgs = this.editedJob.imgs.concat(urls);
        return (this.msg = "Images uploaded");
      });
    },
    async remove() {
      await this.$store.dispatch({ type: "removeJob", id: this.editedJob._id });
      this.$router.push("/");
    },
    addProp(ev) {
      // Adding the fontawesome icon name to the editedJob object for our future use
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;

      if (this.editedJob.props.includes(target.dataset.icon)) {
        this.editedJob.props.splice(
          this.editedJob.props.indexOf(target.dataset.icon),
          1
        );
      } else this.editedJob.props.push(target.dataset.icon);

      target.classList.toggle("active");
    },
    removeImg(idx) {
      this.editedJob.imgs.splice(idx, 1);
    }
  },
  computed: {
    getLoggedinUser() {
      return this.loggedinUser;
    }
  },
  components: {
    gallery: VueGallery,
    ScaleLoader
  }
};
</script>
