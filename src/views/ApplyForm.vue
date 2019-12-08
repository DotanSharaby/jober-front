<template>
    <section class="apply-form-wrapper">
        <!-- back btn -->
        <div class="header">
            <span @click="goBack" class="back-btn">⬅</span>
            <div>
                <h2 class="bold">{{currJob.title}} - {{currJob.owner.username}}</h2>
            </div>
        </div>
        <section class="apply-list">
            <h3 class="semi">Please record a short video of yourself, and refer to the following:</h3>
            <ul class="clean-list">
                <li v-for="quest in questions" :quest="quest" :key="quest">- {{ quest }}</li>
            </ul>
        </section>
        <VideoCapture
            class="video"
            v-if="user"
            :uploadUrl="serverUrl"
            v-model="application.videoUrl">
        </VideoCapture>
        <section class="apply-submit">
            <textarea v-model="application.pm" placeholder="Add a personal message (optional)"></textarea>
            <button class="semi" @click.once="submit">Submit</button>
            <span @click="goBack" class="profile-link">Cancel</span>
        </section>
    </section>
</template>

<script>
import { VideoCapture } from "vue-media-recorder";

export default {
    data() {
        return {
            currJob: null,
            questions: null,
            user: {},
            application: { pm: "", videoUrl: null },
            serverUrl: "https://mister-recorder.herokuapp.com/uploads/"
        };
    },
    methods: {
        goBack() {
            return this.$router.go(-1);
        },
        async submit() {

            this.application.username = this.user.username;
            this.application.email = this.user.email;
            this.application.expSalary = this.user.expSalary;
            this.application.img = this.user.img;
            this.application.skills = this.user.skills;
            this.application.userId = this.user._id;
            this.application.cv = this.user.cv;

            this.user.appliedJobsIds.push(this.currJob._id);
            if (this.currJob.applicants) {
                this.currJob.applicants.push(this.application);
            } else {
                this.currJob.applicants = [this.application];
            }
            this.$store.dispatch({ type: "updateJob", job: this.currJob });
            this.$store.dispatch({ type: "updateUser", user: this.user });
            return this.$router.push("/");
        }
    },
    created() {
        this.user = this.$store.getters.loggedinUser;
        if (!this.user) this.$router.push("/login");
        window.scrollTo(0, 0);
        this.currJob = this.$store.getters.currJob;
        this.questions = this.currJob.quests;
        this.user = JSON.parse(JSON.stringify(this.user));
    },
    components: {
        VideoCapture
    }
};
</script>