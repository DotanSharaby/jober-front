<template>
  <section
    class="apply-form-wrapper flex space-between align-center column container"
    v-if="currJob"
  >
    <span @click="goBack" class="back-btn">⬅</span>
    <div class="header">
      <div>
        <h2 class="bold">{{currJob.title}} - {{currJob.owner.username}}</h2>
      </div>
    </div>
    <div class="main flex space-between align-center">
      <section class="apply-list flex justify-center column">
        <h3 class="semi">Please record a short video of yourself, and refer to the following:</h3>
        <ul class="clean-list">
          <li v-for="quest in currJob.quests" :quest="quest" :key="quest">- {{ quest }}</li>
        </ul>
      </section>
      <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
      <VideoCapture class="video" ref="video" :uploadUrl="serverUrl" v-model="application.videoUrl"></VideoCapture>
      <div class="pm flex-center">
        <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
      </div>
    </div>
    <button class="semi submit" @click.once="submit">Submit</button>
    <div>
      <button class="semi submit" @click="test">Test</button>
    </div>
  </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import SocketService from "@/services/SocketService";

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
    test() {
      const app = { job: this.currJob, user: this.user };
      SocketService.emit("jobApplied", app);
    },
    submit() {
      const userInfo = this.$store.getters.userInfo;
      this.application = { ...this.application, ...userInfo };
      this.user.appliedJobsIds.push(this.currJob._id);
      this.currJob.applicants.push(this.application);
      const app = { job: this.currJob, user: this.user };
      this.$store.dispatch({ type: "applyForm", app });

      // SocketService.emit("jobApplied", app );

      return this.$router.push("/");
    }
  },
  computed: {
    setCurrJob() {
      const currJob = this.$store.getters.currJob;
      return JSON.parse(JSON.stringify(currJob));
    },
    setUser() {
      const user = this.$store.getters.loggedinUser;
      return JSON.parse(JSON.stringify(user));
    }
  },
  created() {
    this.currJob = this.setCurrJob;
    this.user = this.setUser;

    SocketService.on("notify", msg => {
      console.log("got from server ws", msg);
    });
  },
  mounted() {
    this.$watch("$refs.video.isUploading", isLoading => {
      this.isLoading = isLoading;
    });
  },
  components: {
    VideoCapture,
    ScaleLoader
  }
};
</script>