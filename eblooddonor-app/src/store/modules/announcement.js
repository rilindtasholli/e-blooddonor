import AnnouncementService from '@/services/AnnouncementService';

const state = {
    announcements: null,
    announcement: null,
    pages: null
};

const getters = {
    getAnnouncements: (state) => state.announcements,
    getCurrentAnnouncement: (state) => state.announcement,
    getPages: (state) => state.pages
}

const mutations = {
    SET_ANNOUNCEMENTS(state, data){
        state.announcements = data.announcements;
        state.pages = data.pages;
    },
    SET_ANNOUNCEMENT(state, data){
        state.announcement = data;
    },
    CLEAR_DATA(state){
        state.announcements = null;
        state.announcement = null;
    }
};

const actions = {
    async getAllAnnouncements({ commit }, page){
        await AnnouncementService.GetAnnouncements(page).then((response) => {
            commit('SET_ANNOUNCEMENTS', response.data);
        }).catch((error) => {
            throw error
        });
    },

    async getAnnouncement({ commit }, id){
        await AnnouncementService.GetAnnouncement(id).then((response) => {
            commit('SET_ANNOUNCEMENT', response.data);
        }).catch((error) => {
            throw error
        });
    },

    async createAnnouncement({ commit }, announcement){
        await AnnouncementService.CreateAnnouncement(announcement).then(() => {
            commit('CLEAR_DATA');
        }).catch((error) => {
            throw error
        });
    },


    async editAnnouncement({ commit }, announcement){
        await AnnouncementService.EditAnnouncement(announcement).then(() => {
            commit('CLEAR_DATA');
        }).catch((error) => {
            throw error
        });
    },

    async deleteAnnouncement({ commit }, id){
        await AnnouncementService.DeleteAnnouncement(id).then(() => {
            commit('CLEAR_DATA');
        }).catch((error) => {
            throw error
        });
    },

};

export default {
    state,
    getters,
    mutations,
    actions
};