import AuthenticationService from '@/services/AuthenticationService';
import UserService from '@/services/UserService';

const state = {
    userData: null,
    userRoles: null,
    userAppointments: null,
    userDonations: null,
    jwt: null
};

const getters = {
    userData: (state) => state.userData,
    jwt: (state) => state.jwt,
    role: (state) => state.userRole,
    userAppointments: (state) => state.userAppointments,
    userDonations: (state) => state.userDonations,

    isAuthenticated: (state) => state.userData ? true : false,
    isAdmin: (state) => state.userRole && state.userRole.toUpperCase() == "ADMIN" ? true : false,
    isSuperAdmin: (state) => state.userRole && state.userRole.toUpperCase() == "SUPERADMIN" ? true : false,
    hasAppointment: (state) => state.userAppointments != null && state.userAppointments.length > 0,
}

const mutations = {
    SET_USER_DATA(state, data){
        state.userData = data.userData;
        state.userRole = data.userRole;
        state.userAppointments = data.userAppointments;
        state.userDonations = data.userDonations;
    },
    CLEAR_USER_DATA(state){
        state.userData = null;
        state.userRole = null;
        state.userAppointments = null;
        state.userDonations = null;
        state.jwt = null;
    },
    SET_TOKEN(state, data){
        state.jwt = {
            token: data.token,
            expiration: data.expiration
        };
        localStorage.setItem('jwt', data.token)
    }
};

const actions = {
    async Login({ commit }, userData){
        await AuthenticationService.Login(userData).then((response) => {
            commit('SET_USER_DATA', response.data.user);
            commit('SET_TOKEN', response.data);
        }).catch((error) => {
            throw error
        });
    },

    async Register({ commit }, userData){
        await AuthenticationService.Register(userData).then((response) => {
            commit('CLEAR_USER_DATA')
            return response
        }).catch((error) => {
            throw error
        });
    },

    Logout({ commit }){
        commit('CLEAR_USER_DATA')
        localStorage.removeItem('jwt')
    },

    async fetchUserData({ commit }, id){
       
        await UserService.GetUser(id).then((response) => {
            commit('SET_USER_DATA', response.data);
        }).catch((error) => {
            throw error
        });
    }

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