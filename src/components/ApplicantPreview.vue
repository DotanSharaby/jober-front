<template>
    <section class="applicant-preview container flex space-between column">
        <div class="main flex space-between align-center">
            <div class="basic flex column align-center">
                <img :src="applicant.img" />
                <h2 class="bold">{{applicant.username}}</h2>
                <p class="email">{{applicant.email}}</p>
            </div>
            <div class="info flex column space-between align-center">
                <div class="salary">
                    <p v-if="applicant.expSalary">
                        <span class="bold title">Expected Salary:</span>
                        {{salary}}
                    </p>
                    <div v-else class="no-data">This applicant did not add an expected salary</div>
                </div>
                <div class="skills">
                    <div class="text-center" v-if="applicant.skills">
                        <p class="bold title">Skills</p>
                        <ul class="clean-list">
                            <li v-for="(skill, idx) in applicant.skills" :key="idx">{{skill}}</li>
                        </ul>
                    </div>
                    <p v-else class="no-data">This applicant did not add skills</p>
                </div>
                <div class="cv">
                    <a
                        target="_blank"
                        :href="applicant.cv"
                        v-if="applicant.cv"
                        class="bold profile-link"
                    >Open CV</a>
                    <p v-else class="no-data">This applicant did not upload a CV file</p>
                </div>
                <p
                    v-if="!applicant.pm"
                    class="no-data no-cv text-center"
                >This applicant did not add a private message</p>
            </div>
            <div class="video flex-center">
                <div v-if="applicant.videoUrl" class="sent flex column space-between align-center">
                    <video controls :src="applicant.videoUrl"></video>
                </div>
                <div v-else class="no-video no-data flex-center">This applicant did not add a video</div>
            </div>
        </div>
        <div class="pm" v-if="applicant.pm">
            <p class="bold title">Private message</p>
            <p class="msg">{{applicant.pm}}</p>
        </div>
    </section>
</template>

<script>
export default {
    props: { applicant: Object },
    computed: {
        salary() {
            return this.applicant.expSalary.toLocaleString("en-US");
        }
    }
};
</script>