import HttpService from './HttpService'

export default {
    query,
    save,
    remove,
    getById
}

function query() {
    return HttpService.get('job/post');
}

function save(post) {
    if (post._id) {
        return HttpService.put(`job/post/${post._id}`, post);
    } else {
        return HttpService.post(`job/post`, post);
    }
}

function remove(postId) {
    return HttpService.delete(`job/post/${postId}`);
}

function getById(postId) {
    return HttpService.get(`job/post/${postId}`);
}