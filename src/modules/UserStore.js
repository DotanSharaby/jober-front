import UserService from '../services/UserService.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser;
        }
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
        updateUser(state, {updatedUser}) {
            const idx = state.users.findIndex(user => user._id === updatedUser._id);
            state.users.splice(idx, 1, updatedUser);
        }
    },
    actions: {
        async login(context, { userCred }) {
            const users = await context.dispatch({ type: 'loadUsers' });
            const user = users.find(currUser => {
                return currUser.email === userCred.email &&
                    currUser.password === userCred.password
            })
            if (!user) return null;
            await UserService.login(user);
            context.commit({ type: 'setUser', user });
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
            return users;
        },
        async removeUser(context, { userId }) {
            await UserService.remove(userId);
            context.commit({ type: 'removeUser', userId });
        },
        async saveUser(context, { user }) {
            const updatedUser = await UserService.update(user);
            context.commit({ type: 'updateUser', updatedUser });
        }
    }
}