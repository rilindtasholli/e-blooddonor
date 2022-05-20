import AuthenticationService from '@/services/AuthenticationService';

const state = {
    userData: null,
    userRoles: null,
    jwt: null
};

const getters = {
    userData: (state) => state.userData,
    jwt: (state) => state.jwt,
    isAuthenticated: (state) => state.userData ? true : false
}

const mutations = {
    SET_USER_DATA(state, data){
        state.userData = data.user;
        state.jwt = {
            token: data.token,
            expiration: data.expiration
        };
        localStorage.setItem('jwt', data.token)
    },
    CLEAR_USER_DATA(state){
        state.userData = null;
        state.roles =null;
        state.jwt = null;
    }
};

const actions = {
    async Login({ commit }, userData){
        await AuthenticationService.Login(userData).then((response) => {
            commit('SET_USER_DATA', response.data);
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

    Test(){
        AuthenticationService.Test().then((response) => {
            console.log(response)
        }).catch((error) => {
            console.error(error);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};