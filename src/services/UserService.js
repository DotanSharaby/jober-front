
import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}

function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await HttpService.put(`user/${user._id}`, user);
    return _handleLogin(user)
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

async function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}