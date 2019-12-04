<template>
  <section class="apply-form-wrapper container flex column">
    <span @click="goBack" class="back-btn">⬅</span>
    <h2 class="bold">Your application to {{currJob.title}} at {{currJob.owner.username}}</h2>
    <h3>Please record a short video of yourself, and refer to the following:</h3>

    <!-- <ApplyQuest v-for="quest in questions" :quest="quest" :key="quest"></ApplyQuest> -->

    <section class="flex column med-container center-self">
      <ul>
        <li v-for="quest in questions" :quest="quest" :key="quest">{{ quest }}</li>
      </ul>
      <textarea placeholder="Add a personal message (optional)"></textarea>
      <div class="flex align-center space-around">
        <span @click="goBack" class="profile-link">Cancel</span>
        <button>Submit</button>
      </div>
    </section>
  </section>
</template>

<script>
// import ApplyQuest from "@/components/ApplyQuest";

export default {
  data() {
    return {
      currJob: null,
      questions: null
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  },
  created() {
    this.currJob = this.$store.getters.currJob;
    this.questions = this.currJob.quests;
  },
  components: {
    // ApplyQuest
  }
};
</script>
