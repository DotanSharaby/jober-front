<template>
  <section>
    <section v-if="job" class="job-details flex space-between">
        <div class="details flex column">
            <div class="navigate">
                <a href @click="goBack">Go Back</a> |
                <router-link :to="editUrl">Edit</router-link>
            </div>
            <div class="title flex space-between align-center">
                <div class="comp flex align-center justify-center">
                    <img class="avatar" :src="logoUrl" alt />
                    <div class="flex column align-center space-between">
                        <router-link :to="compUrl">
                            <h2 class="profile-link">{{job.owner.name}}</h2>
                        </router-link>
                        <h3>{{job.owner.rating}} ★</h3>
                    </div>
                </div>
                <div class="flex column align-center space-between">
                    <h3 class="bold job-title">{{job.title}}</h3>
                    <p>{{job.loc.address}}</p>
                </div>
                <button
                    class="apply-btn"
                    v-if="!applied"
                    :disabled="applied"
                    @click="applyToJob"
                >Apply</button>
                <button class="disabled-btn" v-else disabled>Applied</button>
            </div>
            <div class="info flex space-between align-center">
                <img class="job-img" :src="imgUrl" />
                <div class="skills flex column align-center">
                    <h2 class="semi">Required Skills</h2>
                    <p>Frontend devloping</p>
                    <p>Cooking</p>
                    <p>ewjflksea</p>
                    <p>jenfklnssd</p>
                </div>
            </div>
            <p class="desc">{{job.desc}}</p>
            <div class="more-info flex align-center space-between">
                <div class="props flex column">
                    <h2 class="semi">Properties</h2>
                    <p>★ Frontend devloping</p>
                    <p>★ Cooking</p>
                    <p>★ ewjflksea</p>
                    <p>★ jenfklnssd</p>
                </div>
                <img
                    class="map"
                    src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
                />
            </div>
          </div>
          <div>
          <div class="flex column align-center space-between">
            <h3 class="bold job-title">{{job.title}}</h3>
            <p>{{job.loc.address}}</p>
          </div>
          <button class="apply-btn" v-if="!applied" :disabled="applied" @click="applyToJob">Apply</button>
          <button class="disabled-btn" v-else disabled>Applied</button>
        </div>
        <div class="info flex space-between align-center">
          <img v-for="(img,idx) in job.imgs" class="job-img" :src="img" :key="idx" />
          <div class="skills flex column align-center">
            <h2 class="semi">Required Skills</h2>
            <p>Frontend devloping</p>
            <p>Cooking</p>
            <p>ewjflksea</p>
            <p>jenfklnssd</p>
          </div>
        </div>
        <p class="desc">{{job.desc}}</p>
        <div class="more-info flex align-center space-between">
          <div class="props flex column">
            <h2 class="semi">Properties</h2>
            <p>★ Frontend devloping</p>
            <p>★ Cooking</p>
            <p>★ ewjflksea</p>
            <p>★ jenfklnssd</p>
          </div>
          <img
            class="map"
            src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
          />
        </div>
        <div>
        <button
          class="apply-btn center"
          v-if="!applied"
          :disabled="applied"
          @click="applyToJob"
        >Apply</button>
        <button class="disabled-btn center" v-else disabled>Applied</button>
      </div>
      <div class="chat"></div>
    </section>

    <div class="top-left">
      <img class="avatar" :src="logoUrl" alt />
      <span class="bold">{{job.owner.name}}</span>
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
    applyToJob() {
      this.applied = true;
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
        },
        compUrl() {
            return `/comp/${this.job.owner._id}`;
        }
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