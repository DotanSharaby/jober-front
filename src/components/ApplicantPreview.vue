<template>
    <section class="applicant-preview container flex space-between align-center">
        <div class="basic flex column space-between align-center">
            <img :src="applicant.img" />
            <h2 class="semi">{{applicant.username}}</h2>
            <p>{{applicant.email}}</p>
        </div>
        <div class="info flex column space-between align-center">
            <p v-if="applicant.expSalary">
                <span class="semi">Expected salary:</span>
                {{applicant.expSalary}}
            </p>
            <p class="semi">Skills</p>
            <ul class="clean-list">
                <li v-for="(skill, idx) in applicant.skills" :key="idx">{{skill}}</li>
            </ul>
            <p class="semi">Private message</p>
            <p>{{applicant.pm}}</p>
        </div>
        <div v-if="applicant.videoUrl" class="sent flex column space-between align-center">
            <video width="320" height="240" controls>
                <source :src="applicant.vid" type="video/mp4" />
            </video>
        </div>
    </section>
</template>

<script>
export default {
    props: { applicant: Object }
}
</script>