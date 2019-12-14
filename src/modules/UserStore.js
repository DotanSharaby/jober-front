import UserService from '../services/UserService.js'
import SocketService from '../services/SocketService.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser: localLoggedinUser,
        users: [],
        newNotifys: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            if (state.loggedinUser) SocketService.emit("room", state.loggedinUser._id);
            return state.loggedinUser;
        },
        newNotifys: state => id => state.newNotifys.filter(notify => {
            return notify.jobId === id
        })
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId);
        },
        updateUser(state, { updatedUser }) {
            const idx = state.users.findIndex(user => user._id === updatedUser._id);
            state.users.splice(idx, 1, updatedUser);
            state.loggedinUser = updatedUser;
        },
        setNotify(state, { app }) {
            const newNotify = {
                userId: app.user._id,
                jobId: app.job._id
            }
            state.newNotifys.push(newNotify);
        },
        removeNotify(state, { jobId }) {
            state.newNotifys = state.newNotifys.filter(notify => notify.jobId !== jobId)
        }
    },
    actions: {
        async login(context, { userCred }) {
            const user = await UserService.login(userCred);
            context.commit({ type: 'setUser', user });
            SocketService.emit("room", user._id);
            return user;
        },
        async signup(context, { userCred }) {
            const user = await UserService.signup(userCred);
            context.commit({ type: 'setUser', user });
            return user;
        },
        async logout(context) {
            await UserService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },
        async loadUsers(context) {
            const users = await UserService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
        async removeUser(context, { userId }) {
            await UserService.remove(userId);
            context.commit({ type: 'removeUser', userId });
        },
        async updateUser(context, { user }) {
            const updatedUser = await UserService.update(user);
            context.commit({ type: 'updateUser', updatedUser });
        },
        async checkEmail(context, { email }) {
            const users = await UserService.getUsers();
            const res = users.find(user => user.email === email)
            return res;
        },
        setNewNotify(context, { app }) {
            context.commit({ type: 'setNotify', app })
            return app;
        },
        removeNotify(context, { jobId }) {
            context.commit({ type: 'removeNotify', jobId })
        }
    }
}