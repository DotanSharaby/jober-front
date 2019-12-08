<template>
  <section class="apply-form-wrapper" v-if="currJob">
    <div class="header">
      <span @click="goBack" class="back-btn">⬅</span>
      <div>
        <h2 class="bold">{{currJob.title}} - {{currJob.owner.username}}</h2>
      </div>
    </div>
    <section class="apply-list">
      <h3 class="semi">Please record a short video of yourself, and refer to the following:</h3>
      <ul class="clean-list">
        <li v-for="quest in currJob.quests" :quest="quest" :key="quest">- {{ quest }}</li>
      </ul>
    </section>
    <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
    <VideoCapture ref="video" class="video" :uploadUrl="serverUrl" v-model="application.videoUrl"></VideoCapture>
    <section class="apply-submit">
      <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
      <button class="semi" @click.once="submit">Submit</button>
      <span @click="goBack" class="profile-link">Cancel</span>
    </section>
  </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      currJob: null,
      user: {},
      application: { pm: "", videoUrl: null },
      serverUrl: "https://mister-recorder.herokuapp.com/uploads/",
      isLoading: false
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    submit() {
      var userInfo = this.$store.getters.userInfo;
      this.application = { ...this.application, ...userInfo };
      this.user.appliedJobsIds.push(this.currJob._id);
      if (this.currJob.applicants) {
        this.currJob.applicants.push(this.application);
      } else {
        this.currJob.applicants = [this.application];
      }
      const app = { job: this.currJob, user: this.user };
      this.$store.dispatch({ type: "applyForm", app });
      return this.$router.push("/");
    }
  },
  created() {
    this.currJob = this.$store.getters.currJob;
    this.currJob = JSON.parse(JSON.stringify(this.currJob));
  },
  mounted() {
    this.$watch("$refs.video.isUploading", (new_value) => {
      if (new_value) this.isLoading = true;
      else this.isLoading = false;
    });
  },
  components: {
    VideoCapture,
    ScaleLoader
  }
};
</script>