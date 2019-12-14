<template>
    <section class="apply-form-wrapper flex align-center column container" v-if="job">
        <font-awesome-icon @click="goBack" class="back-btn" :icon="['fas', 'arrow-left']"></font-awesome-icon>
        <div class="header">
            <h2 class="bold">{{job.title}} - {{job.owner.username}}</h2>
        </div>
        <div class="main flex space-between align-center">
            <div class="apply-list flex justify-center column">
                <h3 class="semi">Please record a short video of yourself, and refer to the following:</h3>
                <ul class="clean-list">
                    <li v-for="quest in job.quests" :quest="quest" :key="quest">- {{ quest }}</li>
                </ul>
            </div>
            <div class="videoContainer flex-center">
                <div v-if="isLoading" class="loader flex-center">
                    <scale-loader :color="'#8bdade'"></scale-loader>
                </div>
                <VideoCapture v-if="!application.videoUrl"
                    class="video" ref="video"
                    :uploadUrl="serverUrl" v-model="application.videoUrl"
                ></VideoCapture>
                <div v-else class="uploaded semi">Video has been uploaded</div>
            </div>
            <div class="pm flex-center">
                <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
            </div>
        </div>
        <button class="submit semi" @click.once="submit">Submit 
            <font-awesome-icon class="icon" :icon="['fas', 'paper-plane']"></font-awesome-icon>
        </button>
    </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import SocketService from "@/services/SocketService";

export default {
    data() {
        return {
            application: { pm: "", videoUrl: null },
            serverUrl: "https://mister-recorder.herokuapp.com/uploads/",
            isLoading: false
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async submit() {
            const userInfo = this.$store.getters.userInfo;
            const user = JSON.parse(JSON.stringify(this.user));
            const job = JSON.parse(JSON.stringify(this.job));
            user.appliedJobsIds.push(job._id);
            job.applies.push({ ...this.application, ...userInfo });
            const app = { job, user };
            SocketService.emit("jobApplied", app);
            await this.$store.dispatch({ type: "applyForm", app });
            return this.$router.push("/user");
        }
    },
    computed: {
        job() {
            return this.$store.getters.currJob;
        },
        user() {
            return this.$store.getters.loggedinUser;
        }
    },
    mounted() {
        this.$watch("$refs.video.isUploading", isLoading => {
            this.isLoading = isLoading;
        });
    },
    components: {
        VideoCapture,
        ScaleLoader
    }
};
</script>