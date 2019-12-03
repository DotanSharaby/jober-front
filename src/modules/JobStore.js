import JobService from '../services/JobService'

export default ({
    strict: true,
    state: {
        jobs: [],
        currUser: {
            "email": "m@m.com",
            "img": "https://www.afrombira.com/img/no-user.png",
            "comp": {
                "_id": "90328jfsc",
                "name": "Googloo",
                "rating": 4.4,
                "logoUrl": "https://i.pinimg.com/originals/ee/8e/1c/ee8e1ce91c0ffddf0105b4173f597db8.jpg"
            },
            "username": "Meital",
            "_id": "weok9f"
        },
        currJob: null,
        filter: null
    },
    mutations: {
        setJobs(state, { jobs }) {
            state.jobs = jobs;
        },
        setFilter(state, { filterBy }) {
            state.filter = filterBy;
        },
        setCurrJob(state, { job }) {
            state.currJob = job;
        },
        updateJob(state, updatedJob) {
            const idx = state.jobs.findIndex(job => job._id === updatedJob._id);
            state.jobs.splice(idx, 1, updatedJob);
        },
        addJob(state, { addedJob }) {
            state.jobs.unshift(addedJob);
        },
        removeJob(state, { jobId }) {
            const idx = state.jobs.findIndex(job => job._id === jobId);
            state.jobs.splice(idx, 1);
        }
    },
    getters: {
        currJob(state) {
            return state.currJob
        },
        jobsToShow(state) {
            if (state.filter) {
                let filter = state.filter.toLowerCase();
                var res = [];
                state.jobs.forEach(job => {
                    if (job.title.toLowerCase().includes(filter)) {
                        res.unshift(job);
                    } else if (job.owner.username.toLowerCase().includes(filter)) {
                        res.push(job);
                    } else if (job.address.toLowerCase().includes(filter)) {
                        res.push(job);
                    } else if (job.desc.toLowerCase().includes(filter)) {
                        res.push(job);
                    }
                })
                return res;
            }
            return state.jobs
        },
        userComp(state) {
            var comp = state.currUser.comp;
            if (!comp) comp = {
                "_id": "90328jfsc",
                "name": "Googloo",
                "rating": 4.4,
                "logoUrl": "https://i.pinimg.com/originals/ee/8e/1c/ee8e1ce91c0ffddf0105b4173f597db8.jpg"
            }
            return comp
        },
        userJobs(state, getters) {
            var comp = getters.getUserComp;
            var jobs = state.jobs.filter(job => job.owner._id === comp._id)
            return jobs
        },
        skills(state) {
            var skills = [];
            state.jobs.forEach(job => {
                job.reqSkills.forEach(skill => {
                    if (!skills.includes(skill)) skills.push(skill)
                })
            })
            return skills;
        }
    },
    actions: {
        async loadJobs(context) {
            const jobs = await JobService.query()
            context.commit({ type: 'setJobs', jobs })
            return jobs;
        },
        async saveJob(context, { job }) {
            const addedJob = await JobService.save(job)
            context.commit({ type: 'updateJob', addedJob })
        },
        async getJob({ commit }, { id }) {
            const job = await JobService.getById(id)
            commit({ type: 'setCurrJob', job });
        },
        async removeJob(context, { id }) {
            await JobService.remove(id)
            context.commit({ type: 'removeJob', id })
        }
    },
})