import AnnouncementService from '@/services/AnnouncementService';

const state = {
    announcements: null,
    announcement: null
};

const getters = {
    getAnnouncements: (state) => state.announcements,
    getAnnouncement: (state) => state.announcements,
}

const mutations = {
    SET_ANNOUNCEMENTS(state, data){
        state.announcements = data;
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
    async getAllannouncement({ commit }){
        await AnnouncementService.GetAnnouncement().then((response) => {
            commit('SET_ANNOUNCEMENTS', response.data);
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