<template>
  <section v-if="job" class="job-details">
    <div class="btn-sect">
      <a href @click="goBack">Go Back</a> |
      <router-link :to="editUrl">Edit</router-link>
    </div>
    <section class="details-header">
      <div class="flex align-center space-around">
        <div class="flex align-center">
          <img class="avatar" :src="logoUrl" alt />
          <strong>{{job.owner.name}}</strong>
        </div>
        <p>
          <strong>{{job.title}}</strong>
          ,
          {{job.loc.address}}
        </p>
        <button>Apply</button>
      </div>
    </section>
    <p class="job-desc">{{job.desc}}</p>

    <img class="job-img" :src="imgUrl" />
    <img
      class="map"
      src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
    />
    <section class="chat">
      <h2 class="text-center">chat goes here</h2>
    </section>
    <section class="rating">
      <strong>Rating: {{job.rating}}☆</strong>
    </section>
  </section>
</template>

<script>
import JobService from "@/services/JobService";

export default {
  data() {
    return {
      job: null
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
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
      return `/job/edit/${this.job._id}`;
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