
import JobService from '../services/JobService'

export default ({
    strict: true,
    state: {
        jobs: []
    },
    mutations: {
        setJobs(state, { jobs }) {
            state.jobs = jobs;
        },
        saveJob(state, { addedJob }) {
            debugger;
            console.log(state,addedJob);
        }
    },
    getters: {
        getJobs(state) {
            return state.jobs;
        }
    },
    actions: {
        async loadJobs(context) {
            const jobs = await JobService.query()
            context.commit({ type: 'setJobs', jobs })
            return jobs;
        },
        async saveJob(context, payload) {
            const addedJob = await JobService.save(payload.job)
            context.commit({ type: 'saveJob', addedJob })
        }
    },
})