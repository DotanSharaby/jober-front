<template>
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
                        <h2>{{job.owner.name}}</h2>
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
                    <h2 class="semi" v-if="job.props.length > 0 ">Properties</h2>
                    <JobProp v-for="item in job.props" :item="item" :key="item" />
                </div>
                <img
                    class="map"
                    src="https://icdn7.digitaltrends.com/image/digitaltrends/google_maps_share_location_1-500x300-c.jpg"
                />
            </div>
            <button
                class="apply-btn center"
                v-if="!applied"
                :disabled="applied"
                @click="applyToJob"
            >Apply</button>
            <button class="disabled-btn center" v-else disabled>Applied</button>
        </div>
        <Wall class="wall"></Wall>
    </section>
</template>

<script>
import JobService from "@/services/JobService";
import Wall from "../components/Wall"
import JobProp from "../components/JobProp"

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
            this.$router.push('/apply')
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
            return this.job.imgs[0];
        },
        editUrl() {
            return `/job/edit/${this.job._id}`;
        }
    },
    async created() {
        const id = this.$route.params.id;
        const job = await JobService.getById(id);
        this.job = job;
    },
    components: {
        Wall,
        JobProp
    }
};
</script>

<style>
</style>