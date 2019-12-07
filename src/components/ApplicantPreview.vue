<template>
  <section class="applicant-preview container flex space-between align-center">
    <div class="basic flex column space-between align-center">
      <img :src="applicant.img" />
      <h2 class="semi">{{applicant.username}}</h2>
      <p>{{applicant.email}}</p>
    </div>
    <div class="info flex column space-between align-center center">
      <p v-if="applicant.expSalary">
        <span class="semi">Expected salary:</span>
        {{payment}}
      </p>
      <div class="skills text-center">
        <p class="semi">Skills</p>
        <ul class="clean-list">
          <li v-for="(skill, idx) in applicant.skills" :key="idx">{{skill}}</li>
        </ul>
      </div>
      <p class="semi" v-if="applicant.pm">Private message</p>
      <p class="pm" v-if="applicant.pm">{{applicant.pm}}</p>
      <a target="_blank" :href="applicant.cv" class="semi">Open CV</a>
    </div>
    <div v-if="applicant.videoUrl" class="sent flex column space-between align-center">
      <video controls :src="applicant.videoUrl"></video>
    </div>
  </section>
</template>

<script>
export default {
  props: { applicant: Object },
  computed: {
    payment() {
      const expSalary = +this.applicant.expSalary;
      return expSalary.toLocaleString("en-US");
    }
  }
};
</script>