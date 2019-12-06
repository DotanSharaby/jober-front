<template>
  <transition name="slide-fade">
    <section
      @click="goToDetails"
      ref="jobCard"
      class="job-preview flex column space-between align-center"
    >
      <div
        v-if="user"
        class="icons flex space-between align-center text-center"
      >
        <h2
          class="trash bold"
          @click.stop="archiveJob"
        >🗑</h2>
        <h2 @click.stop="saveJob">❤</h2>
      </div>
      <img
        class="job-img"
        :src="job.img"
      />
      <div class="desc flex align-center column space-between">
        <div class="company flex space-around align-center">
          <img
            class="owner-logo"
            :src="job.owner.img"
          />
          <div class="details flex column align-center justify-center">
            <h2>{{job.owner.username}}</h2>
            <h4 class="saves bold flex align-center">{{jobSaves}} <span class="bold">♡</span></h4>
          </div>
        </div>
        <div class="extra flex space-between align-center">
          <div class="job flex space-between column align-center">
            <h4 class="semi">{{job.title}}</h4>
            <p>{{job.address}}</p>
          </div>
          <div class="flex-center column">
            <h4>${{job.payment}}</h4>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  props: { job: Object, user: Object },
  data() {
    return {
      isShown: true
    };
  },
  methods: {
    goToDetails() {
      this.$router.push(`/job/${this.job._id}`);
    },
    saveJob() {
      const job = JSON.parse(JSON.stringify(this.job));
      const user = JSON.parse(JSON.stringify(this.user));
      job.saves += 1;
      user.savedJobsIds.push(job._id);
      this.updateData(user, job);
    },
    archiveJob() {
      const user = JSON.parse(JSON.stringify(this.user));
      user.archivedJobsIds.push(this.job._id);
      this.updateData(user);
    },
    updateData(user, job) {
      if (!job) this.$emit("updatedData", { user });
      this.$emit("updatedData", { user, job });
    }
  },
  computed: {
    jobSaves() {
      var saves = this.job.saves;
      if (!saves) saves = 0;
      return saves;
    }
  }
};
</script>
