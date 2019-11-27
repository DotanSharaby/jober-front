import HttpService from './HttpService'

export default {
    query,
    add,
    remove,
    update,
    getById
}

function query() {
    return HttpService.get('job');
}

function add(job) {
    return HttpService.post(`job`, job);
}

function remove(jobId) {
    return HttpService.delete(`job/${jobId}`);
}

function update(job) {
    return HttpService.put(`job/${job._id}`, job);
}

function getById(jobId) {
    return HttpService.get(`job/${jobId}`);
}