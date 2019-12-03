<template>
  <section v-if="job" class="job-details flex space-between">
    <div class="details flex column">
      <span @click="goBack" class="back-btn">⬅</span>
      <div class="title flex space-between align-center">
        <div class="comp flex align-center justify-center">
          <img class="avatar" :src="logoUrl" alt />
          <div class="flex column align-center space-between">
            <h2>{{job.owner.username}}</h2>
          </div>
        </div>
        <div class="position flex column align-center space-between">
          <h3 class="bold job-title">{{job.title}}</h3>
          <p>{{job.address}}</p>
        </div>
        <button class="apply-btn" v-if="!applied" :disabled="applied" @click="applyToJob">Apply</button>
        <button class="disabled-btn" v-else disabled>Applied</button>
      </div>
      <div class="info flex space-between align-center">
        <img class="job-img" :src="imgUrl" />
        <div class="skills flex column align-center">
          <h2 class="semi">Required Skills</h2>
          <p v-for="(skill, idx) in job.reqSkills" :key="idx">{{skill}}</p>
        </div>
      </div>
      <p class="desc">{{job.desc}}</p>
      <div class="more-info flex align-center space-between">
        <div class="props flex column">
          <h2 class="semi" v-if="job.perks.length > 0 ">Properties</h2>
          <JobProp v-for="item in job.perks" :item="item" :key="item" />
        </div>
        <img
          class="map"
          src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
        />
      </div>
      <button class="apply-btn center" v-if="!applied" :disabled="applied" @click="applyToJob">Apply</button>
      <button class="disabled-btn center" v-else disabled>Applied</button>
    </div>
    <Wall class="wall-container" :job="job"></Wall>
  </section>
</template>

<script>
import Wall from "../components/Wall";
import JobProp from "../components/JobProp";

export default {
  data() {
    return {
      applied: false
    };
  },
  methods: {
    applyToJob() {
      this.applied = true;
      this.$router.push("/apply");
    },
    goBack() {
      return this.$router.go(-1);
    }
  },
  computed: {
    logoUrl() {
      return this.job.owner.img;
    },
    imgUrl() {
      return this.job.img;
    },
    editUrl() {
      return `/job/edit/${this.job._id}`;
    },
    job() {
      return this.$store.getters.currJob;
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch({ type: "getJob", id })
  },
  components: {
    Wall,
    JobProp
  }
};
</script>

<style>
</style>