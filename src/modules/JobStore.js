import JobService from '../services/JobService'

export default ({
    strict: true,
    state: {
        jobs: [],
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
        resetCurrJob(state) {
            state.currJob = null;
        },
        updateJob(state, { updatedJob }) {
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
            return state.currJob;
        },
        newJobNotifys(state, getters) {
            const jobs = getters.userPostedJobs;
            var newNots = []
            jobs.forEach(job => {
                const jobId = job._id
                job.applies.filter((app) => {
                    if (app.isNew) {
                        let user = { _id: app.userId };
                        let job = { _id: jobId };
                        var newApp = {
                            user,
                            job
                        }
                        newNots.push(newApp);
                    }
                    return newNots;
                })
            })
            return newNots
        },
        jobsToShow(state, commit, rootState) {
            var jobsToShow = [];
            var user = rootState.UserStore.loggedinUser;
            if (!user) jobsToShow = state.jobs;
            else {
                state.jobs.forEach(job => {
                    let jobId = job._id;
                    if (!user.archivedJobsIds.includes(jobId)
                        && !user.savedJobsIds.includes(jobId)
                        && !user.appliedJobsIds.includes(jobId)) jobsToShow.push(job)
                })
            }
            if (state.filter) {
                let filter = state.filter.toLowerCase();
                var res = [];
                jobsToShow.forEach(job => {
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
            return jobsToShow;
        },
        jobsByApplyCnt(state) {
            var jobs = JSON.parse(JSON.stringify(state.jobs))
            jobs = jobs.filter(job => job.applies)
            return jobs.sort((a, b) => b.applies.length - a.applies.length)
        },
        jobsBySaveCnt(state) {
            var jobs = JSON.parse(JSON.stringify(state.jobs))
            jobs = jobs.filter(job => job.saves)
            return jobs.sort((a, b) => b.saves - a.saves)
        },
        jobsByCreatedAt(state) {
            var jobs = JSON.parse(JSON.stringify(state.jobs))
            jobs = jobs.filter(job => job.createdAt)
            return jobs.sort((a, b) => b.createdAt - a.createdAt)
        },
        skills(state) {
            var skills = [];
            state.jobs.forEach(job => {
                job.reqSkills.forEach(skill => {
                    if (!skills.includes(skill)) skills.push(skill)
                })
            })
            return skills;
        },
        userPostedJobs(state, commit, rootState) {
            const userId = rootState.UserStore.loggedinUser._id;
            var userJobs = [];
            state.jobs.forEach(job => {
                if (job.owner._id === userId) userJobs.push(job)
            })
            return userJobs
        },
        userSavedJobs(state, commit, rootState) {
            const savedJobsIds = rootState.UserStore.loggedinUser.savedJobsIds;
            return state.jobs.filter(job => savedJobsIds.includes(job._id))
        },
        userAppliedJobs(state, commit, rootState) {
            const appliedJobsIds = rootState.UserStore.loggedinUser.appliedJobsIds;
            return state.jobs.filter(job => appliedJobsIds.includes(job._id))
        },
        userArchivedJobs(state, commit, rootState) {
            const archivedJobsIds = rootState.UserStore.loggedinUser.archivedJobsIds;
            return state.jobs.filter(job => archivedJobsIds.includes(job._id))
        },
        userInfo(state, commit, rootState) {
            const user = rootState.UserStore.loggedinUser
            return {
                username: user.username,
                email: user.email,
                expSalary: user.expSalary,
                img: user.img,
                skills: user.skills,
                _id: user._id,
                cv: user.cv
            }
        },
        match: (state, commit, rootState) => job => {
            const user = rootState.UserStore.loggedinUser
            var salaryMatch = job.salary / user.expSalary;
            if (job.salary > user.expSalary) salaryMatch = 1
            var sharedSkills = job.reqSkills.filter(skill => user.skills.includes(skill))
            var skillsMatch = sharedSkills.length / job.reqSkills.length
            return Math.floor((skillsMatch + salaryMatch) * 50)
        }
    },
    actions: {
        async applyForm(context, { app }) {
            await context.dispatch({ type: "updateJob", job: app.job })
            await context.dispatch({ type: "updateUser", user: app.user })
        },
        async loadJobs(context) {
            const jobs = await JobService.query()
            context.commit({ type: 'setJobs', jobs })
            return jobs;
        },
        async updateJob(context, { job }) {
            const updatedJob = await JobService.update(job)
            context.commit({ type: 'updateJob', updatedJob })
        },
        async addJob(context, { job }) {
            const addedJob = await JobService.add(job)
            context.commit({ type: 'addJob', addedJob })
        },
        async loadCurrJob({ commit }, { id }) {
            const job = await JobService.getById(id)
            commit({ type: 'setCurrJob', job });
        },
        async removeJob(context, { id }) {
            await JobService.remove(id)
            context.commit({ type: 'removeJob', id })
        },
        resetCurrJob(context) {
            context.commit({ type: 'resetCurrJob' })
        }
    }
})