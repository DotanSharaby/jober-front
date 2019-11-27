
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
            const jobs = state.jobs.map(job => {
                if (job._id === addedJob._id) return addedJob;
                else return job
            })
            state.jobs = jobs;
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
        },
        async getJob(context, payload) {
            const job = await JobService.getById(payload.id)
            return job;
        }
    },
})