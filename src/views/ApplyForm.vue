<template>
  <section class="apply-form-wrapper container flex column">
    <span @click="goBack" class="back-btn">⬅</span>
    <h2 class="bold">Your application to {{currJob.title}} at {{currJob.owner.username}}</h2>
    <h3>Please record a short video of yourself, and refer to the following:</h3>
    <VideoCapture
      v-if="user"
      class="vid-container center"
      :uploadUrl="serverUrl"
      v-model="application.videoUrl"
    />
    <section class="flex column med-container center-self">
      <ul>
        <li v-for="quest in questions" :quest="quest" :key="quest">{{ quest }}</li>
      </ul>
      <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
      <div class="flex align-center space-around">
        <span @click="goBack" class="profile-link">Cancel</span>
        <button @click.once="submit">Submit</button>
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
      application: { pm: "", videoUrl: null },
      serverUrl: "https://mister-recorder.herokuapp.com/uploads/"
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
    submit() {
      this.application.applicant = this.user.username;
      this.application.email = this.user.email;
      this.application.expSalary = this.user.expSalary;
      this.application.img = this.user.img;
      this.application.skills = this.user.skills;
      this.application.userId = this.user._id;
      this.application.cv = this.user.cv;

      this.user.appliedJobsIds.push(this.currJob._id);
      if (this.currJob.applicants) {
        this.currJob.applicants.push(this.application);
      } else {
        this.currJob.applicants = [this.application];
      }
      this.$store.dispatch({ type: "updateJob", job: this.currJob });
      this.$store.dispatch({ type: "updateUser", user: this.user });
      return this.$router.push("/");
    }
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    if(!this.user) this.$router.push('/login');
    window.scrollTo(0, 0);
    this.currJob = this.$store.getters.currJob;
    this.questions = this.currJob.quests;
    this.user = JSON.parse(JSON.stringify(this.user));
  },
  components: {
    VideoCapture
  }
};
</script>
