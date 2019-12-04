<template>
  <section class="apply-form-wrapper container flex column">
    <span @click="goBack" class="back-btn">⬅</span>
    <h2 class="bold">Your application to {{currJob.title}} at {{currJob.owner.username}}</h2>
    <h3>Please record a short video of yourself, and refer to the following:</h3>
    <VideoCapture class="vid-container center" :uploadUrl="serverUrl" v-model="videoUrl" />
    <section class="flex column med-container center-self">
      <ul>
        <li v-for="quest in questions" :quest="quest" :key="quest">{{ quest }}</li>
      </ul>
      <textarea v-model="pm" placeholder="Add a personal message (optional)"></textarea>
      <div class="flex align-center space-around">
        <span @click="goBack" class="profile-link">Cancel</span>
        <button @click="submit">Submit</button>
      </div>
    </section>
  </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";

export default {
  data() {
    return {
      currJob: null,
      questions: null,
      user: {},
      pm: "",
      videoUrl: null,
      serverUrl: "https://mister-recorder.herokuapp.com/uploads/"
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    submit() {
      this.user.pm = this.pm;
      this.user.vid = this.videoUrl;
      if (this.currJob.applicants) {
        this.currJob.applicants.push(this.user);
      } else {
        this.currJob.applicants = [this.user];
      }
      this.$store.dispatch({ type: "saveJob", job: this.currJob });
      return this.$router.push("/");
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.currJob = this.$store.getters.currJob;
    this.questions = this.currJob.quests;
    this.user = this.$store.getters.loggedinUser;
  },
  components: {
    VideoCapture
  }
};
</script>
