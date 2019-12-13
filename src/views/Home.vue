<template>
    <section>
        <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
        <section v-else class="home">
            <h1 class="site-header bold">Find Your Dream Job</h1>
            <img class="main-img" src="../assets/imgs/jobBg.jpg" />
            <div class="container">
                <h2 class="preview-header semi">Recently Added</h2>
                <JobList v-if="recentlyAdded" :jobs="recentlyAdded"></JobList>
                <router-link class="see-all profile-link semi" to="/job">
                    See all
                    <font-awesome-icon class="icon" :icon="['fa', 'chevron-right']"></font-awesome-icon>
                </router-link>
                <h2 class="preview-header semi">Most Applied Jobs</h2>
                <JobList v-if="mostApplied" :jobs="mostApplied"></JobList>
                <router-link class="see-all profile-link semi" to="/job">
                    See all
                    <font-awesome-icon class="icon" :icon="['fa', 'chevron-right']"></font-awesome-icon>
                </router-link>
                <h2 class="preview-header semi">Trending Jobs</h2>
                <JobList v-if="trendingJobs" :jobs="trendingJobs"></JobList>
                <router-link class="see-all profile-link semi" to="/job">
                    See all
                    <font-awesome-icon class="icon" :icon="['fa', 'chevron-right']"></font-awesome-icon>
                </router-link>
            </div>
        </section>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
    data() {
        return {
            isLoading: true
        };
    },
    created() {
        setTimeout(() => (this.isLoading = false), 1100);
        window.scrollTo(0, 0);
    },
    computed: {
        recentlyAdded() {
            return this.$store.getters.jobsByCreatedAt.slice(0, 4);
        },
        mostApplied() {
            return this.$store.getters.jobsByApplyCnt.slice(0, 4);
        },
        trendingJobs() {
            return this.$store.getters.jobsBySaveCnt.slice(0, 4);
        }
    },
    components: {
        JobList,
        ScaleLoader
    }
};
</script>
