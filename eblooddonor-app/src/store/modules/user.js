import UserService from '@/services/UserService';
import LoggerService from '@/services/LoggerService';

const state = {
    users: null,
    user: null,
    admins: null
};

const getters = {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getAdmins: (state) => state.admins
}

const mutations = {
    SET_USERS(state, data){
        state.users = data;
    },
    SET_USER(state, data){
        state.user = data;
    },
    SET_ADMINS(state, data){
        state.admins = data;
    },
    CLEAR_DATA(state){
        state.users = null;
        state.user = null;
    }
};

const actions = {
    async getAllUsers({ commit }){
        await UserService.GetUsers().then((response) => {
            commit('SET_USERS', response.data);
        }).catch((error) => {
            throw error
        });
    },

    async editUser({ commit }, user){
        console.log(user);
        await UserService.EditUser(user).then(() => {
            commit('CLEAR_DATA');
        }).catch((error) => {
            throw error
        });
    },

    //  async updateMe({ commit }, user){
    //     await UserService.UpdateMe(user).then(() => {
    //         commit('CLEAR_DATA');
    //     }).catch((error) => {
    //         throw error
    //     });
    // },

    async getAllAdmins({ commit }){
        await UserService.GetAdmins().then((response) => {
            commit('SET_ADMINS', response.data);
        }).catch((error) => {
            throw error
        });
    },

    async setUserRole({ commit }, {setRoleData, userData}){
        await UserService.SetUserRole(setRoleData.id, setRoleData.role).then(() => {
            commit('CLEAR_DATA');

            var logData ={
                userId: userData.id,
                user: userData.fullName,
                action: `Edited user(${setRoleData.id}) role to: ${setRoleData.role}`
            }

            LoggerService.CreateLog(logData);
        }).catch((error) => {
            throw error
        });
    }

    // async deleteUser({ commit }, id){
    //     await UserService.DeleteUser(id).then(() => {
    //         commit('CLEAR_DATA');
    //     }).catch((error) => {
    //         throw error
    //     });
    // },

    // Test(){
    //     AuthenticationService.Test().then((response) => {
    //         console.log(response)
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // },
};

export default {
    state,
    getters,
    mutations,
    actions
};