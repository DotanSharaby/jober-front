
<template>
  <section class="signup">
    <h1>Signup</h1>
    <form-wizard
      class="my-form"
      @on-complete="doSignup"
      shape="tab"
      color="#3fc1c9"
      back-button-text="Back"
      next-button-text="Next"
      finish-button-text="Done"
    >
      <font-awesome-icon class="icon-item user" :icon="['fas', 'user']" size="2x" />
      <font-awesome-icon class="icon-item details" :icon="['fas', 'asterisk']" size="2x" />
      <font-awesome-icon class="icon-item done" :icon="['fas', 'check']" size="2x" />
      <tab-content class="flex column" title="User setup" icon="ti-user" :before-change="validate">
        <label>User Name:</label>
        <input type="text" v-model="signupCred.username" placeholder="User Name" />
        <label>Email:</label>
        <input type="email" v-model="signupCred.email" placeholder="Email" />
        <label>Password:</label>
        <input type="text" v-model="signupCred.password" placeholder="Password" />
      </tab-content>

      <tab-content class="flex column" title="Additional Info" icon="ti-settings">
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
    <p>{{ msg }}</p>
    <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import Checkbox from "../components/Checkbox";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      signupCred: {
        isCompany: null
      },
      msg: "",
      isLoading: false
    };
  },
  methods: {
    doSignup() {
      const cred = this.signupCred;
      this.$store.dispatch({ type: "signup", userCred: cred });
      setTimeout(() => {
        this.msg = "";
        this.$router.push("/job");
      }, 2000);
      this.msg = "Signup successfully!";
    },
    validate() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.username) {
        setTimeout(() => (this.msg = ""), 2000);
        this.msg = "Please fill up the form";
        return false;
      }
      return true;
    },
    async getUrl(ev, type) {
      this.isLoading = true;
      const file = await UploadService.upload(ev.target.files[0]);
      this.isLoading = false;
      if (!file) return;
      if (type === "cv") {
        setTimeout(() => (this.msg = ""), 2000);
        this.signupCred.cvUrl = file.url;
        return (this.msg = "CV uploaded");
      } else {
        setTimeout(() => (this.msg = ""), 2000);
        this.signupCred.img = file.url;
        return (this.msg = "Image uploaded");
      }
    },
    isCompany(val) {
      if (val) this.signupCred.isCompany = true;
      else this.signupCred.isCompany = false;
    }
  },
  components: {
    FormWizard,
    TabContent,
    ScaleLoader,
    Checkbox
  }
};
</script>