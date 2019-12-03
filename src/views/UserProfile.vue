<template>
    <section v-if="user" class="user-profile flex">
        <div class="info flex column align-center">
            <div class="title flex justify-center align-center">
                <label class="change-img">
                    <img v-if="user.img" :src="user.img" />
                    <input
                        type="file"
                        name="logoFile"
                        id="detailsFile"
                        class="inputfile inputImg"
                        @change="getUrl($event)"
                    />
                </label>
                <div class="basic flex column align-center">
                    <input class="username semi" type="text" @input="updateUser" v-model="user.username" />
                    <input class="email" type="email" @input="updateUser" v-model="user.email" />
                </div>
            </div>
            <div class="extra flex space-between">
                <div class="skills">
                    <h2 class="semi">Your Skills</h2>
                    <ul class="clean-list">
                        <li v-for="(skill,idx) in user.skills" :key="idx">{{skill}}</li>
                    </ul>
                    <p @click="showSkills">Edit</p>
                </div>
                <div class="salary" v-if="user.expSalary">
                    <h2 class="semi">Expected Salary</h2>
                    <div class="flex-center">
                        <input type="number" v-model="user.expSalary"  @input="updateUser"/>
                        <h3 class="text-center">USD</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import UploadService from "../services/UploadService";

export default {
    data() {
        return {
            user: {}
        };
    },
    created() {
        const user = this.$store.getters.loggedinUser;
        if (!user) this.$router.go(-1);
        this.user = JSON.parse(JSON.stringify(user));
    },
    methods: {
        async getUrl(ev) {
            const file = await UploadService.upload(ev.target.files[0]);
            if (!file) return;
            this.user.img = file.url;
            return this.$store.dispatch({ type: "updateUser", user: this.user });
        },
        updateUser() {
            this.$store.dispatch({ type: "updateUser", user: this.user });
        },
        showSkills() {
          
        }
    }
};
</script>