
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
    const user = HttpService.get(`user/${userId}`);
    return _handleLogin(user)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`);
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user);
}

async function login(user) {
    // const user = await HttpService.post('auth/login', userCred)

    return _handleLogin(user);
}

async function signup(userCred) {
    // const user = await HttpService.post('auth/signup', userCred)

    const user = await HttpService.post('user', userCred);

    return _handleLogin(user);
}

function logout() {
    // await HttpService.post('auth/logout');
    sessionStorage.clear();
}

async function getUsers() {
    return await HttpService.get('user');
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
}