<template>
    <section>
        <scale-loader v-if="!job" :color="'#8bdade'"></scale-loader>
        <section v-else class="job-details flex space-between">
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
                        <p class="semi">{{job.address}}</p>
                        <h4 class="semi">Offering: ${{job.payment}}</h4>
                        <span>Published {{timeToShow}}</span>
                    </div>
                    <button
                    class="apply-btn"
                    :class="{'disabled-btn': isDisableApply}"
                    @click="applyToJob"
                >Apply</button>
                </div>

                <div class="info flex space-between align-center">
                    <img class="job-img" :src="imgUrl" />
                    <div class="skills flex column align-center">
                        <h2 class="semi">Required Skills</h2>
                        <p v-for="(skill, idx) in job.reqSkills" :key="idx">
                            <font-awesome-icon class="arrow-icon" :icon="['fa', 'chevron-right']"></font-awesome-icon>
                            &nbsp;{{skill}}
                        </p>
                    </div>
                </div>
                <p class="desc">{{job.desc}}</p>

                <div class="more-info flex align-center space-between">
                    <div class="props flex column">
                        <h2 class="semi" v-if="job.perks.length > 0 ">Properties</h2>
                        <JobProp v-for="item in job.perks" :item="item" :key="item" />
                    </div>
                    <Map :address="job.address"></Map>
                </div>
                <button
                    class="apply-btn second"
                    :class="{'disabled-btn': isDisableApply}"
                    @click="applyToJob"
                >Apply</button>
            </div>
            <Wall class="wall-container" :job="job"></Wall>
        </section>
    </section>
</template>

<script>
import Wall from "../components/Wall";
import JobProp from "../components/JobProp";
import Map from "../components/Map";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

import moment from "moment";
export default {
    data() {
        return {
            isDisableApply: false
        }
    },
    methods: {
        async applyToJob() {
            if (this.isDisableApply) return;
            this.$router.push("/apply");
        },
        goBack() {
            this.$router.go(-1);
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
        },
        timeToShow() {
            return this.creationTime.fromNow();
        },
        creationTime() {
            return moment(this.job.createdAt);
        },
        user() {
            return this.$store.getters.loggedinUser
        }
    },
    async created() {
        const id = this.$route.params.id;
        await this.$store.dispatch({ type: "loadCurrJob", id });
        if (!this.user) this.isDisableApply = true;
        if (this.user.appliedJobsIds.includes(id)) this.isDisableApply = true;
    },
    destroyed() {
        this.$store.dispatch({ type: "resetCurrJob" });
    },
    components: {
        Wall,
        JobProp,
        Map,
        ScaleLoader
    }
};
</script>