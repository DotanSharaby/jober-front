<template>
    <section v-if="user" class="user-profile container flex column">
        <div class="info flex-center">
            <div class="title flex-center column">
                <label class="change-img">
                    <img :src="user.img" />
                    <input
                        type="file"
                        name="logoFile"
                        id="detailsFile"
                        class="inputfile inputImg"
                        @change="getUrl($event)"
                    />
                </label>
                <input
                    class="username semi"
                    type="text"
                    @input="updateUser"
                    v-model="user.username"
                />
            </div>
            <div class="basic flex column space-between">
                <div class="email flex-center">
                    <font-awesome-icon class="at-icon" :icon="['fas', 'at']"></font-awesome-icon>
                    <input
                        class="email-input"
                        type="email"
                        @input="updateUser"
                        v-model="user.email"
                    />
                </div>
                <div class="salary flex-center column">
                    <h2 class="semi">Expected Salary</h2>
                    <div class="flex align-center">
                        <input
                            type="number"
                            v-model="user.expSalary"
                            @input="updateUser"
                            placeholder="Add"
                        />
                        <h3 class="text-center" v-if="user.expSalary">USD</h3>
                    </div>
                </div>
            </div>
            <div class="extra flex-center">
                <div class="skills flex space-between column text-center">
                    <h2 class="semi">Your Skills</h2>
                    <div v-if="user.skills && !isOpenSkills">
                        <ul class="clean-list">
                            <li v-for="(skill,idx) in user.skills" :key="idx">{{skill}}</li>
                        </ul>
                        <p @click="toggleSkills">Edit</p>
                    </div>
                    <div v-else class="edit-skills">
                        <div
                            class="skill flex align-center"
                            v-for="(skill, idx) in skills"
                            :key="idx"
                        >
                            <input type="checkbox" :id="skill" :value="skill" v-model="user.skills" />
                            <label :for="skill">{{skill}}</label>
                        </div>
                        <p @click="toggleSkills">Done</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="jobs flex-center column">
            <div class="category flex-center column">
                <h2 class="semi flex-center">
                    <font-awesome-icon class="icon" :icon="['fas', 'envelope-open-text']"></font-awesome-icon>Applied Jobs
                </h2>
                <div v-if="!user.appliedJobsIds.length" class="no-jobs flex-center column">
                    <p>No applied jobs yet</p>
                    <router-link class="semi profile-link" to="/job">Browse Jobs</router-link>
                </div>
                <div v-else>
                    <div></div>
                    <job-list :jobs="appliedJobs"></job-list>
                </div>
            </div>
            <div class="category flex-center column">
                <h2 class="semi flex-center">
                    <font-awesome-icon class="icon heart" :icon="['fa', 'heart']"></font-awesome-icon>Saved Jobs
                </h2>
                <div v-if="!user.savedJobsIds.length" class="no-jobs flex-center column">
                    <p>No saved jobs yet</p>
                    <router-link class="semi profile-link" to="/job">Browse Jobs</router-link>
                </div>
                <job-list v-else :jobs="savedJobs"></job-list>
            </div>
            <div class="category flex-center column">
                <h2 class="semi flex-center">
                    <font-awesome-icon class="icon trash" :icon="['fas', 'trash-alt']"></font-awesome-icon>Archived Jobs
                </h2>
                <div v-if="!user.archivedJobsIds.length" class="no-jobs flex-center column">
                    <p>No archived jobs yet</p>
                    <router-link class="semi profile-link" to="/job">Browse Jobs</router-link>
                </div>
                <job-list v-else :jobs="archivedJobs"></job-list>
            </div>
        </div>
    </section>
</template>

<script>
import UploadService from "../services/UploadService";
import JobList from "../components/JobList.vue";

export default {
    data() {
        return {
            user: {},
            isOpenSkills: false,
        };
    },
    methods: {
        async getUrl(ev) {
            const file = await UploadService.upload(ev.target.files[0]);
            if (!file) return;
            this.user.img = file.url;
            return this.updateUser();
        },
        updateUser() {
            if (!this.user.username || !this.user.email) return
            this.$store.dispatch({ type: "updateUser", user: this.user });
        },
        toggleSkills() {
            if (this.isOpenSkills) this.updateUser;
            this.isOpenSkills = !this.isOpenSkills;
        }
    },
    computed: {
        skills() {
            return this.$store.getters.skills;
        },
        savedJobs() {
            return this.$store.getters.userSavedJobs;
        },
        appliedJobs() {
            return this.$store.getters.userAppliedJobs;
        },
        archivedJobs() {
            return this.$store.getters.userArchivedJobs;
        },
    },
    created() {
        window.scrollTo(0, 0);
        const user = this.$store.getters.loggedinUser;
        if (!user) {
            this.$router.go(-1)
            return
        }
        this.user = JSON.parse(JSON.stringify(user));
    },
    components: {
        JobList
    }
};
</script>