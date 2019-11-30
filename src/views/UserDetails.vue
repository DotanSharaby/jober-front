<template>
  <section v-if="user" class="user-details">
    <h2>{{user.username}} Profile</h2>
    <div class="flex column">
      <label>User Name: {{user.username}}</label>
      <label>Email: {{user.email}}</label>
      <label>Jobs Applied: {{user.appliedJobs}}</label>
      <label>Jobs Intrested: {{user.interestedJobs}}</label>
      <label>
        Image:
        <input
          type="file"
          name="logoFile"
          id="detailsFile"
          class="inputfile inputImg"
          @change="getUrl($event)"
        />
      </label>
      <img v-if="user.imgs" :src="user.imgs[0]" height="100" />

      <ul class="clean-list">
        <li v-for="(skill,idx) in user.skills" :key="idx">{{skill}}</li>
      </ul>
      <label>CV</label>
    </div>

    <pre>{{user}}</pre>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    const user = this.$store.getters.loggedinUser;
    this.user = JSON.parse(JSON.stringify(user));
    delete this.user.password;
  },
  methods: {
    async getUrl(ev) {
      const file = await UploadService.upload(ev.target.files[0]);
      if (!file) return;
      this.user.imgs.push(file.url);
      return this.$store.dispatch({ type: "saveUser", user: this.user });
    }
  }
};
</script>