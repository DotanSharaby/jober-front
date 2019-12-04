import HttpService from './HttpService'

export default {
    query,
    add,
    update,
    remove,
    getById
}

function query() {
    return HttpService.get('job');
}

function add(job) {
    return HttpService.post('job/edit', job);
}

function update(job) {
    return HttpService.put(`job/edit/${job._id}`, job);
}

function remove(jobId) {
    return HttpService.delete(`job/${jobId}`);
}

function getById(jobId) {
    return HttpService.get(`job/${jobId}`);
}