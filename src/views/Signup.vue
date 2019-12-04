
<template>
  <section class="signup flex column justify-center align-center">
    <form-wizard
      v-if="!isCompleted"
      class="my-form"
      @on-complete="updateUser"
      shape="tab"
      color="#3fc1c9"
      back-button-text="Back"
      next-button-text="Next"
      finish-button-text="Done"
    >
      <font-awesome-icon class="icon-item user" :icon="['fas', 'user']" size="2x" />
      <font-awesome-icon class="icon-item details" :icon="['fas', 'asterisk']" size="2x" />
      <font-awesome-icon class="icon-item done" :icon="['fas', 'check']" size="2x" />
      <p class="err-msg error text-center">{{ msg }}</p>
      <tab-content class="flex column" title="User setup" icon="ti-user" :before-change="validate">
        <label>Username / Company Name:</label>
        <input type="text" v-model="signupCred.username" placeholder="Josh" />
        <label>Email:</label>
        <input type="email" v-model="signupCred.email" placeholder="josh@mail.com" />
        <label>Password:</label>
        <input type="password" v-model="signupCred.pass" />
      </tab-content>

      <tab-content class="flex column" title="Additional Info" icon="ti-settings">
        <div>
          <div class="instructions text-center semi">Upload some files (optional)</div>
          <div class="img-div">
            <label>
              <input
                type="file"
                name="signupImgFile"
                id="signupImgFile"
                class="inputfile inputImg"
                @change="getUrl($event)"
              />
              <label for="signupImgFile">Profile Image</label>
            </label>
            <img v-if="user && user.img" :src="user.img" height="100" />
          </div>
          <div>
            <label>
              <input
                type="file"
                name="cvFile"
                id="cvFile"
                class="inputfile inputCv"
                @change="getUrl($event,'cv')"
              />
              <label for="cvFile">CV File (pdf)</label>
            </label>
          </div>
        </div>
      </tab-content>
      <tab-content class="flex column" title="Last step" icon="ti-check">
        <div>
          <div class="instructions text-center semi">What are your skills? (optional)</div>
          <div class="skill" v-for="(skill, idx) in skills" :key="idx">
            <input type="checkbox" :id="skill" :value="skill" v-model="user.skills" />
            <label :for="skill">{{skill}}</label>
          </div>
          <div class="instructions text-center semi">What is your salary expectation? (optional)</div>
          <input type="number" v-model="user.expSalary" />
        </div>
      </tab-content>
    </form-wizard>
    <div v-else class="whats-next flex column justify-center align-center">
      <h1 class="semi text-center">What's next?</h1>
      <div>
        <router-link to="/job">
          <button>Start searching for your dream job</button>
        </router-link>
        <router-link to="/job/edit">
          <button>Publish your own job offer</button>
        </router-link>
      </div>
    </div>
    <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      signupCred: {},
      user: {},
      msg: "",
      isLoading: false,
      isCompleted: false
    };
  },
  methods: {
    async doSignup() {
      const cred = this.signupCred;
      this.user = await this.$store.dispatch({
        type: "signup",
        userCred: cred
      });
      this.user.skills = [];
      if (this.user)
        await this.$store.dispatch({ type: "login", userCred: cred });
    },
    async validate() {
      const cred = this.signupCred;
      if (!cred.email || !cred.pass || !cred.username) {
        this.msg = "Please fill up all the fields";
        return false;
      }
      if (!this.validEmail || await this.emailExists()) {
        this.msg = "Invalid email";
        return false;
      }
      await this.doSignup();
      if (!this.user) {
        this.msg = "Something went wrong";
        return false;
      }
      this.msg = "";
      return true;
    },
    async getUrl(ev, type) {
      this.isLoading = true;
      const file = await UploadService.upload(ev.target.files[0]);
      this.isLoading = false;
      if (!file) return;
      if (type === "cv") {
        setTimeout(() => (this.msg = ""), 2000);
        this.user.cv = file.url;
        return (this.msg = "CV uploaded");
      } else {
        this.user.img = file.url;
        return (this.msg = "");
      }
    },
    async updateUser() {
      await this.$store.dispatch({ type: "updateUser", user: this.user });
      this.isCompleted = true;
    },
    async emailExists() {
      const res = await this.$store.dispatch({
        type: "checkEmail",
        email: this.signupCred.email
      });
      return res;
    }
  },
  computed: {
    skills() {
      return this.$store.getters.skills;
    },
    validEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.signupCred.email).toLowerCase());
    },
  },
  created() {
    const user = this.$store.getters.loggedinUser;
    if (user) this.$router.push("/");
  },
  components: {
    FormWizard,
    TabContent,
    ScaleLoader
  }
};
</script>