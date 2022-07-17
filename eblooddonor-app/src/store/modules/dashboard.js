import DashboardService from '@/services/DashboardService';

const state = {
    donationsNumber: null,
    donationsFromLastMonths: null,
    donationsFromLocations: null,

    usersNumber: null,
    usersFromLocations: null,
    topDonators: null
};

const getters = {
    getDonationsNumber: (state) => state.donationsNumber,
    getDonationsFromLastMonths: (state) => state.donationsFromLastMonths,
    getDonationsFromLocations: (state) => state.donationsFromLocations,
    
    getUsersNumber: (state) => state.usersNumber,
    getUsersFromLocations: (state) => state.usersFromLocations,
    getTopDonators: (state) => state.topDonators
}

const mutations = {
    SET_DONATIONS_DATA(state, data){
        state.donationsNumber = data.donationsNumberResponse.value.data.donationsNumber;
        state.donationsFromLastMonths = data.monthlyDonationsResponse.value.data.monthlyDonations;
        state.donationsFromLocations = data.locationDonationsResponse.value.data.locationDonations
    },
    SET_USERS_DATA(state, data){
        state.usersNumber = data.usersNumberResponse.value.data.usersNumber;
        state.usersFromLocations = data.locationUsersResponse.value.data.locationDonations;
        state.topDonators = data.topDonatorsResponse.value.data.topDonators
    },
    CLEAR_DATA(state){
        state.donationsNumber = null;
        state.usersNumber = null;
        state.donationsFromLastMonths = null;
    }
};

const actions = {
    async getDonationsData({ commit }){
        await DashboardService.GetDonationsData().then((response) => {
            console.log(response)
            commit('SET_DONATIONS_DATA', response);
            
        }).catch((error) => {
            throw error
        });
    },
    async getUsersData({ commit }){
        await DashboardService.GetUsersData().then((response) => {
            console.log(response)
            commit('SET_USERS_DATA', response);
            
        }).catch((error) => {
            throw error
        });
    }

};

export default {
    state,
    getters,
    mutations,
    actions
};