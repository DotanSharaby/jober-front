<template>
    <section class="comp-page">
        <div class="title flex align-center center justify-center">
            <h1 class="text-center bold">{{comp.name}}</h1>
            <h2 class="text-center bold">{{comp.rating}} ★</h2>
        </div>
        <div class="content flex space-between">
            <div class="flex column"></div>
            <CompJobList :jobs="jobs"></CompJobList>
            <CompChart :jobs="jobs" class="comp-chart"></CompChart>
        </div>
    </section>
</template>

<script>
import CompJobList from '../components/CompJobList'
import CompChart from '../components/CompChart'

export default {
    data() {
        return {
            comp: {
                "_id": "90328jfsc",
                "name": "Googloo",
                "rating": 4.4,
                "logoUrl": "https://i.pinimg.com/originals/ee/8e/1c/ee8e1ce91c0ffddf0105b4173f597db8.jpg"
            },
            jobs: [
                {
                    "_id": "3fjei49rf",
                    "title": "Project Manager",
                    "owner": {
                        "_id": "90328jfsc",
                        "name": "Googloo",
                        "rating": 4.4,
                        "logoUrl": "https://i.pinimg.com/originals/ee/8e/1c/ee8e1ce91c0ffddf0105b4173f597db8.jpg"
                    },
                    "loc": {
                        "address": "Raanana"
                    },
                    "props": [
                        "paw"
                    ],
                    "payment": 8900,
                    "desc": "Builds market position by locating, developing, defining, and closing business relationships.\nIdentifies trendsetter ideas by researching industry and related events, publications, and announcements.\nTracks individual contributors and their accomplishments.\nLocates or proposes potential business deals by contacting potential partners.\nDiscovers and explores business opportunities.",
                    "img": "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
                },
                {
                    "_id": "iewfu2398ewuf",
                    "title": "Backend Developer",
                    "owner": {
                        "_id": "90328jfsc",
                        "name": "Check Boing",
                        "rating": 3.6,
                        "logoUrl": "http://www.advertguru.co.zw/wp-content/uploads/2015/09/logo-designing-in-Harare-Zimbabwe.jpg"
                    },
                    "loc": {
                        "address": "Bat Yam"
                    },
                    "props": [
                        "utensils",
                        "paw"
                    ],
                    "payment": 8900,
                    "desc": "Recommends equity investments.\nDevelops negotiating strategies and positions by studying integration of new venture with company strategies and operations.\nExamines risks and potentials for the business opportunities.\nEstimates partners’ needs and goals.",
                    "img": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                }
            ]
        }
    },
    components: {
        CompJobList,
        CompChart
    }
    // async created() {
    // const id = this.$route.params.id;
    // const comp = await JobService.getCompById(id);
    // this.comp = comp;
    //   }
}
</script>