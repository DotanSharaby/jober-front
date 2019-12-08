<template>
    <section
        class="apply-form-wrapper flex space-between align-center column container"
        v-if="currJob"
    >
        <span @click="goBack" class="back-btn">⬅</span>
        <div class="header">
            <div>
                <h2 class="bold">{{currJob.title}} - {{currJob.owner.username}}</h2>
            </div>
        </div>
        <div class="main flex space-between align-center">
            <section class="apply-list flex justify-center column">
                <h3
                    class="semi"
                >Please record a short video of yourself, and refer to the following:</h3>
                <ul class="clean-list">
                    <li v-for="quest in currJob.quests" :quest="quest" :key="quest">- {{ quest }}</li>
                </ul>
            </section>
            <VideoCapture class="video" :uploadUrl="serverUrl" v-model="application.videoUrl"></VideoCapture>
            <div class="pm flex-center">
                <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
            </div>
        </div>
        <button class="semi submit" @click.once="submit">Submit</button>
    </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";

export default {
    data() {
        return {
            currJob: null,
            user: {},
            application: { pm: "", videoUrl: null },
            serverUrl: "https://mister-recorder.herokuapp.com/uploads/"
        };
    },
    methods: {
        goBack() {
            return this.$router.go(-1);
        },
        submit() {
            var userInfo = this.$store.getters.userInfo;
            this.application = { ...this.application, ...userInfo };
            this.user.appliedJobsIds.push(this.currJob._id);
            if (this.currJob.applicants) {
                this.currJob.applicants.push(this.application);
            } else {
                this.currJob.applicants = [this.application];
            }
            const app = { job: this.currJob, user: this.user };
            this.$store.dispatch({ type: "applyForm", app });
            return this.$router.push("/");
        }
    },
    created() {
        this.currJob = this.$store.getters.currJob
        this.currJob = JSON.parse(JSON.stringify(this.currJob))
        this.user = this.$store.getters.loggedinUser
        this.user = JSON.parse(JSON.stringify(this.user))
    },
    components: {
        VideoCapture
    }
};
</script>