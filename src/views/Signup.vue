
<template>
  <section class="signup">
    <h1>Signup</h1>
    <form-wizard
      @on-complete="doSignup"
      shape="tab"
      color="#3fc1c9"
      back-button-text="Go back!"
      next-button-text="Go next!"
      finish-button-text="We're there"
    >
      <tab-content class="flex column" title="User setup" icon="ti-user">
        Looking to post some Jobs?
        <button
          :class="{selected :signupCred.isCompany}"
          @click="isCompany(true)"
        >Yes, I am recruiting</button>
        <button
          :class="{selected : !signupCred.isCompany}"
          @click="isCompany(false)"
        >No, I am looking for one</button>
      </tab-content>

      <tab-content class="flex column" title="Additional Info" icon="ti-settings">
        <label>User Name:</label>
        <input type="text" v-model="signupCred.username" placeholder="User Name" />
        <label>Email:</label>
        <input type="email" v-model="signupCred.email" placeholder="Email" />
        <label>Password:</label>
        <input type="text" v-model="signupCred.password" placeholder="Password" />
      </tab-content>

      <tab-content class="flex column" title="Last step" icon="ti-check">
        <div v-if="signupCred.isCompany">
          <label>
            <input
              type="file"
              name="logoFile"
              id="logoFile"
              class="inputfile inputLogo"
              @change="getUrl($event,'logo')"
            />
            <label for="logoFile">Choose Logo</label>
          </label>
          <img v-if="signupCred.logoUrl" :src="signupCred.logoUrl" height="100" />
        </div>
        <div v-else>
          <label>
            <input
              type="file"
              name="signupImgFile"
              id="signupImgFile"
              class="inputfile inputImg"
              @change="getUrl($event)"
            />
            <label for="signupImgFile">Choose Image</label>
          </label>
          <img v-if="signupCred.img" :src="signupCred.img" height="100" />
          <label>
            |
            <input
              type="file"
              name="cvFile"
              id="cvFile"
              class="inputfile inputCv"
              @change="getUrl($event,'cv')"
            />
            <label for="cvFile">Upload CV - (pdf)</label>
          </label>

          <Checkbox />

        </div>
      </tab-content>
    </form-wizard>
    <pulse-loader v-if="isLoading" :color="'#8bdade'"></pulse-loader>
    <!-- <beat-loader :loading="loading" :color="color" :size="size"></beat-loader> -->
    <!-- <fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader> -->
    <!-- <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader> -->
    <!-- <scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader> -->
  </section>
</template>

<script>
import UploadService from "../services/UploadService";

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import Checkbox from "../components/Checkbox";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// import BeatLoader from "vue-spinner/src/BeatLoader.vue";
// import FadeLoader from "vue-spinner/src/FadeLoader.vue";
// import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
// import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      signupCred: {
        isCompany: true
      },
      msg: "",
      isLoading: false
    };
  },
  methods: {
    doSignup() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.username) {
        setTimeout(() => (this.msg = ""), 2000);
        return (this.msg = "Please fill up the form");
      }
      this.$store.dispatch({ type: "signup", userCred: cred });
      setTimeout(() => {
        this.msg = "";
        this.$router.push("/job");
      }, 2000);
      this.msg = "Signup successfully!";
    },
    async getUrl(ev, type) {
      const file = await UploadService.upload(ev.target.files[0]);
      if (!file) return;
      if (type === "cv") return (this.signupCred.cvUrl = file.url);
      return (this.signupCred.img = file.url);
    },
    isCompany(val) {
      if (val) this.signupCred.isCompany = true;
      else this.signupCred.isCompany = false;
    }
  },
  components: {
    FormWizard,
    TabContent,
    PulseLoader,
    Checkbox
  }
};
</script>