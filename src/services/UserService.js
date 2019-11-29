
import HttpService from './HttpService'
import UtilService from './UtilService'

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

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}




async function login(userCred) {
    // const user = await HttpService.post('auth/login', userCred)


    // switch to get and find user in DB by ID and display that user

    const user = await HttpService.post('user', userCred)
    return _handleLogin(user)
}






async function signup(userCred) {
    // const user = await HttpService.post('auth/signup', userCred)
    
    userCred._id = UtilService.makeId();
    const user = await HttpService.post('user', userCred)
    
    return _handleLogin(user)
}
async function logout() {
    // await HttpService.post('auth/logout');
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user');
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}