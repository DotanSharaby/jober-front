<template>
    <section>
        <scale-loader v-if="!job || isLoading" :color="'#8bdade'"></scale-loader>
        <section v-else class="job-details flex space-between">
            <div class="details flex column">
                <font-awesome-icon @click="goBack" class="back-btn" :icon="['fas', 'arrow-left']"></font-awesome-icon>

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
                        <h4 class="semi">Salary: ${{salary}}</h4>
                        <span>Published {{timeToShow}}</span>
                    </div>
                    <div class="flex column space-around align-center">
                        <div class="saves" :class="{saved: isSaved}" @click="toggleSavedJob">
                            <span class="semi">{{saves}}</span>
                            <font-awesome-icon class="heart-icon" :icon="['fa', 'heart']"></font-awesome-icon>
                        </div>
                        <button
                            class="apply-btn"
                            :class="{'disabled-btn': isDisableApply}"
                            @click="applyToJob"
                        >Apply</button>
                    </div>
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
            isDisableApply: false,
            isLoading: true,
            job: null,
            user: null
        };
    },
    methods: {
        async applyToJob() {
            if (this.isDisableApply) return;
            if (!this.user) return this.$router.push('/login')
            this.$router.push('/apply');
        },
        goBack() {
            this.$router.go(-1);
        },
        toggleSavedJob() {
            if (!this.user) return this.$router.push('/login')
            if (this.user.savedJobsIds.includes(this.job._id)) {
                const idx = this.user.savedJobsIds.findIndex(id => id === this.job._id);
                this.user.savedJobsIds.splice(idx, 1);
                this.user.archivedJobsIds.push(this.job._id);
                this.job.saves--;
            }
            else {
                if (this.user.archivedJobsIds.includes(this.job._id)) {
                    const idx = this.user.archivedJobsIds.findIndex(id => id === this.job._id);
                    this.user.archivedJobsIds.splice(idx, 1);
                }
                this.user.savedJobsIds.push(this.job._id);
                this.job.saves++
            }
            this.$store.dispatch({ type: "updateJob", job: this.job });
            this.$store.dispatch({ type: "updateUser", user: this.user });
        }
    },
    computed: {
        salary() {
            return this.job.salary.toLocaleString("en-US");
        },
        logoUrl() {
            return this.job.owner.img;
        },
        imgUrl() {
            return this.job.img;
        },
        editUrl() {
            return `/job/edit/${this.job._id}`;
        },
        timeToShow() {
            return this.creationTime.fromNow();
        },
        creationTime() {
            return moment(this.job.createdAt);
        },
        saves() {
            return this.job.saves;
        },
        isSaved() {
            if (this.user && this.user.savedJobsIds.includes(this.job._id)) return true;
            return false;
        }
    },
    async created() {
        setTimeout(() => (this.isLoading = false), 1100);
        const id = this.$route.params.id;
        await this.$store.dispatch({ type: "loadCurrJob", id });
        this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
        this.job = JSON.parse(JSON.stringify(this.$store.getters.currJob));
        if (!this.user) return
        if (this.user.appliedJobsIds.includes(id)) this.isDisableApply = true;
    },
    components: {
        Wall,
        JobProp,
        Map,
        ScaleLoader
    }
};
</script>