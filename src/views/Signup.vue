// TODO - devide the screen to 3 parts, each part has it's own quests w/out "next"/"prev"
// on mobile - the parts goes into a column
// remove the logic about each icon, but keep the icons above the parts. 

<template>
    <section class="signup container flex column">
        <form @submit.prevent="doSignup()" class="flex space-between">
            <p class="err-msg error text-center">{{ msg }}</p>
            <div class="form-step flex column">
                <div class="step-title flex column align-center">
                    <font-awesome-icon class="icon-item user" :icon="['fas', 'user']" size="2x"></font-awesome-icon>
                    <p>User setup</p>
                </div>
                <label>Username / Company Name:</label>
                <input type="text" ref="name" v-model="signupCred.username" placeholder="Josh" />
                <label>Email:</label>
                <input type="email" v-model="signupCred.email" placeholder="josh@mail.com" />
                <label>Password:</label>
                <input type="password" v-model="signupCred.pass" />
            </div>
            <div class="form-step flex column">
                <div class="step-title flex column align-center">
                    <font-awesome-icon
                        class="icon-item details"
                        :icon="['fas', 'asterisk']"
                        size="2x"
                    ></font-awesome-icon>
                    <p>Additional info</p>
                </div>
                <div>
                    <div>
                        <div
                            class="instructions text-center semi"
                        >What is your salary expectation? (optional)</div>
                        <input type="number" v-model="user.expSalary" />
                        <div class="instructions text-center semi">What are your skills? (optional)</div>
                        <div class="skill" v-for="(skill, idx) in skills" :key="idx">
                            <input type="checkbox" :id="skill" :value="skill" v-model="user.skills" />
                            <label :for="skill">{{skill}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-step flex column">
                <div class="step-title flex column align-center">
                    <font-awesome-icon class="icon-item done" :icon="['fas', 'check']" size="2x"></font-awesome-icon>
                    <p>Last step</p>
                </div>
                <div class="instructions text-center semi">Upload some files (optional)</div>
                <div class="img-div">
                    <input
                        type="file"
                        name="signupImgFile"
                        id="signupImgFile"
                        class="inputfile inputImg"
                        @change="getUrl($event)"
                    />
                    <label for="signupImgFile">Profile Image</label>
                    <img v-if="user && user.img" :src="user.img" height="100" />
                </div>
                <div>
                    <label>
                        <input
                            type="file"
                            name="cvFile"
                            id="cvFile"
                            class="inputfile inputCv"
                            @change="getUrl($event,'cv')"
                        />
                        <label for="cvFile">CV File (pdf)</label>
                    </label>
                </div>
            </div>
        </form>
        <scale-loader v-if="isLoading" :color="'#8bdade'"></scale-loader>
    </section>
</template>

<script>
import UploadService from "../services/UploadService";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
    data() {
        return {
            signupCred: {},
            user: {},
            msg: "",
            isLoading: false,
            isCompleted: false,
            currStep: 1
        };
    },
    methods: {
        async doSignup() {
            const cred = this.signupCred;
            this.user = await this.$store.dispatch({
                type: "signup",
                userCred: cred
            });
            this.user.skills = [];
            this.user.archivedJobsIds = [];
            this.user.savedJobsIds = [];
            this.user.appliedJobsIds = [];
            if (this.user)
                await this.$store.dispatch({ type: "login", userCred: cred });
        },
        async validate() {
            const cred = this.signupCred;
            if (!cred.email || !cred.pass || !cred.username) {
                this.msg = "Please fill up all the fields";
                return false;
            }
            if (!this.validEmail || (await this.emailExists())) {
                this.msg = "Invalid email";
                return false;
            }
            await this.doSignup();
            if (!this.user) {
                this.msg = "Something went wrong";
                return false;
            }
            this.msg = "";
            return true;
        },
        async getUrl(ev, type) {
            this.isLoading = true;
            const file = await UploadService.upload(ev.target.files[0]);
            this.isLoading = false;
            if (!file) return;
            if (type === "cv") {
                setTimeout(() => (this.msg = ""), 2000);
                this.user.cv = file.url;
                return (this.msg = "CV uploaded");
            } else {
                this.user.img = file.url;
                return (this.msg = "");
            }
        },
        async updateUser() {
            if (!this.user.img) {
                this.user.img = "https://www.afrombira.com/img/no-user.png";
            }
            await this.$store.dispatch({ type: "updateUser", user: this.user });
            this.isCompleted = true;
        },
        async emailExists() {
            const res = await this.$store.dispatch({
                type: "checkEmail",
                email: this.signupCred.email
            });
            return res;
        }
    },
    computed: {
        skills() {
            return this.$store.getters.skills;
        },
        validEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.signupCred.email).toLowerCase());
        }
    },
    created() {
        const user = this.$store.getters.loggedinUser;
        if (user) this.$router.push("/");
    },
    mounted() {
        // CHECK IF THERE IS A CLEANER WAY - element is not yet loaded so cannot focus it
        setTimeout(() => this.$refs.name.focus(), 500);
    },
    components: {
        ScaleLoader
    }
};
</script>