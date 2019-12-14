<template>
  <section class="apply-preview container flex space-between column">
    <div class="main flex space-between align-center">
      <div class="basic flex column align-center">
        <img :src="apply.img" />
        <h2 class="bold">{{apply.username}}</h2>
        <p class="email">{{apply.email}}</p>
      </div>
      <div class="info flex column space-between align-center">
        <div class="salary">
          <p v-if="apply.expSalary">
            <span class="bold title">Expected Salary:</span>
            {{salary}}₪
          </p>
          <div v-else class="no-data">This applicant did not add an expected salary</div>
        </div>
        <div class="skills">
          <div class="text-center" v-if="apply.skills">
            <p class="bold title">Skills</p>
            <ul class="clean-list">
              <li v-for="(skill, idx) in apply.skills" :key="idx">{{skill}}</li>
            </ul>
          </div>
          <p v-else class="no-data">This applicant did not add skills</p>
        </div>
        <div class="cv">
          <a target="_blank" :href="apply.cv" v-if="apply.cv" class="bold profile-link">Open CV</a>
          <p v-else class="no-data">This applicant did not upload a CV file</p>
        </div>
        <p
          v-if="!apply.pm"
          class="no-data no-cv text-center"
        >This applicant did not add a private message</p>
      </div>
      <div class="video flex-center">
        <div v-if="apply.videoUrl" class="sent flex column space-between align-center">
          <video controls :src="apply.videoUrl"></video>
        </div>
        <div v-else class="no-video no-data flex-center">This applicant did not add a video</div>
      </div>
    </div>
    <div class="pm" v-if="apply.pm">
      <p class="bold title">Private message</p>
      <p class="msg">{{apply.pm}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: { apply: Object },
  computed: {
    salary() {
      const numSalary = +this.apply.expSalary;
      return numSalary.toLocaleString("en-US");
    }
  }
};
</script>