<template>
  <section v-if="job" class="job-details">
    <section class="btn-sect">
      <a href @click="goBack">Go Back</a> |
      <router-link :to="editUrl">Edit</router-link>
    </section>

    <div class="top-left">
      <img class="avatar" :src="logoUrl" alt />
      <span class="bold profile-link"><router-link :to="compUrl">{{job.owner.name}}</router-link></span>
    </div>
    <div class="top-center">
      <span class="semi">{{job.title}},&nbsp;</span>
      <span>{{job.loc.address}}</span>
    </div>
    {{job.props}}
    <div class="top-right">
      <button class="apply-btn" v-if="!applied" :disabled="applied" @click="applyToJob">Apply</button>
      <button class="disabled-btn" v-else disabled>Applied</button>
    </div>
    <section class="job-desc">
      <p>{{job.desc}}</p>
    </section>
    <img class="job-img" :src="imgUrl" />
    <img
      class="map"
      src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
    />
    <section class="chat flex column space-between">
      <h2 class="text-center">chat goes here</h2>
      <div class="flex">
        <input type="text" style="width: 100%" placeholder="Enter message" />
        <button>Send</button>
      </div>
    </section>
    <section class="bottom-right">
      <span class="bold">Company Rating: {{job.owner.rating}}☆</span>
      <button class="apply-btn" v-if="!applied" :disabled="applied" @click="applyToJob">Apply</button>
      <button class="disabled-btn" v-else disabled>Applied</button>
    </section>
  </section>
</template>

<script>
import JobService from "@/services/JobService";

export default {
  data() {
    return {
      job: null,
      applied: false
    };
  },
  methods: {
    applyToJob(){
      console.log('applying to job mf');
      this.applied = true;
    },
    goBack() {
      return this.$router.push('/job');
    }
  },
  computed: {
    logoUrl() {
      return this.job.owner.logoUrl;
    },
    imgUrl() {
      return this.job.img;
    },
    editUrl() {
      return `/job/edit/${this.job.owner._id}`;
    },
    compUrl() {
      return `/comp/${this.job.owner._id}`;
    }
  },
  async created() {
    const id = this.$route.params.id;
    const job = await JobService.getById(id);
    this.job = job;
  }
};
</script>

<style>
</style>