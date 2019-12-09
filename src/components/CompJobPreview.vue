<template>
  <section class="comp-job-preview flex space-between align-center">
    <router-link :to="jobEditUrl">
      <h3 class="semi profile-link" title="Edit Job">{{job.title}}</h3>
    </router-link>
    <div class="flex space-between align-center">
      <p class="date">{{timeToShow}}</p>
      <p class="saved">{{saves}} saves</p>
      <p class="applies profile-link semi" @click="goToApplies">{{applies}} applies</p>
      <span v-if="newNotifys.length" class="notification">O</span>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  props: { job: Object },
  computed: {
    jobEditUrl() {
      return `/job/edit/${this.job._id}`;
    },
    applies() {
      if (!this.job.applies) return 0;
      return this.job.applies.length;
    },
    saves() {
      if (!this.job.saves) return 0;
      return this.job.saves;
    },
    timeToShow() {
      return this.creationTime.fromNow();
    },
    creationTime() {
      return moment(this.job.createdAt);
    },
    newNotifys() {
      return this.$store.getters.newNotifys;
    }
  },
  methods: {
    goToApplies() {
      if (this.job.applies.length) this.$router.push(`/apply/${this.job._id}`);
    }
  }
};
</script>