<template>
    <transition :name="transitionName">
        <section @click="goToDetails" class="job-preview flex column space-between align-center">
            <div v-if="user" class="icons flex space-between align-center text-center">
                <h2 class="trash flex-center" @click.stop="archiveJob">
                    <font-awesome-icon class="trash-icon" :icon="['fas', 'trash-alt']"></font-awesome-icon>
                </h2>
                <h2 class="flex-center" @click.stop="saveJob">
                    <font-awesome-icon class="heart-icon" :icon="['fa', 'heart']"></font-awesome-icon>
                </h2>
            </div>
            <img class="job-img" :src="job.img" />
            <div class="desc flex align-center column space-between">
                <div class="company flex space-around align-center">
                    <img class="owner-logo" :src="job.owner.img" />
                    <div class="details flex column align-center justify-center">
                        <h2>{{job.owner.username}}</h2>
                        <h4 class="saves bold flex align-center">
                            {{jobSaves}}
                            <span class="bold">♡</span>
                        </h4>
                    </div>
                </div>
                <div class="extra-pre flex space-between align-center">
                    <div class="job flex space-between column align-center">
                        <h4 class="semi">{{job.title}}</h4>
                        <p>{{job.address}}</p>
                    </div>
                    <div class="more-info flex-center column space-between">
                        <h4 class="bold" :class="{colored: match>=75}">{{match}}% match</h4>
                        <p>${{salary}}</p>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
export default {
    props: { job: Object, user: Object },
    data() {
        return {
            isShown: true,
            swipeDirection: null
        };
    },
    methods: {
        goToDetails() {
            this.$router.push(`/job/${this.job._id}`);
        },
        saveJob() {
            this.swipeDirection = "right";
            const job = JSON.parse(JSON.stringify(this.job));
            const user = JSON.parse(JSON.stringify(this.user));
            job.saves += 1;
            user.savedJobsIds.push(job._id);
            this.updateData(user, job);
        },
        archiveJob() {
            this.swipeDirection = "left";
            const user = JSON.parse(JSON.stringify(this.user));
            user.archivedJobsIds.push(this.job._id);
            this.updateData(user);
        },
        updateData(user, job) {
            if (!job) this.$emit("updatedData", { user });
            this.$emit("updatedData", { user, job });
        },
    },
    computed: {
        salary() {
            return this.job.salary.toLocaleString("en-US");
        },
        jobSaves() {
            var saves = this.job.saves;
            if (!saves) saves = 0;
            return saves;
        },
        transitionName() {
            return this.swipeDirection;
        },
        match() {
            return this.$store.getters.match(this.job);
        }
    }
};
</script>