<template>
  <section @click="goToDetails" class="job-preview flex column space-between align-center">
    <div v-if="user" class="icons flex space-between align-center text-center">
      <h2 class="trash bold" @click.stop="removeJob">🗑</h2>
      <h2 @click.stop="saveJob">❤</h2>
    </div>
    <img class="job-img" :src="currJob.img" />
    <div class="desc flex align-center column space-between">
      <div class="company flex space-around align-center">
        <img class="owner-logo" :src="currJob.owner.img" />
        <div class="details flex column align-center justify-center">
          <h2>{{currJob.owner.username}}</h2>
          <h4 class="rating semi flex align-center">
            {{jobSaves}} Saves
          </h4>
        </div>
      </div>
      <p v-if="currJob.owner.rating>4.5" class="top-comp bold">Top Company</p>
      <div class="extra flex space-between align-center">
        <div class="job flex space-between column align-center">
          <h4 class="semi">{{currJob.title}}</h4>
          <p>{{currJob.address}}</p>
        </div>
        <h4 :class="{ colored: match>70}">{{match}}% match</h4>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: { job: Object, user: Object },
  data() {
    return {
      saved: false,
      currJob: null
    };
  },
  methods: {
    goToDetails() {
      this.$router.push(`/job/${this.currJob._id}`);
    },
    saveJob() {
      this.saved = !this.saved;
      this.removeJob();
      // if (this.saved) this.currJob.saves += 1;
      // if (!this.saved) this.currJob.saves -= 1;
      // this.$emit('updated', this.currJob)
    },
    removeJob() {
      this.$emit("removed", this.currJob._id);
    }
  },
  computed: {
    match() {
      return Math.floor(Math.random() * (100 - 50 + 1) + 50);
    },
    jobSaves() {
      var saves = this.currJob.saves;
      if (!saves) saves = 0;
      return saves
    }
  },
  created() {
    this.currJob = JSON.parse(JSON.stringify(this.job));
  }
};
</script>
