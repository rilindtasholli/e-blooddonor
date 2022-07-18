import AnnouncementService from '@/services/AnnouncementService';
import LoggerService from '@/services/LoggerService';

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

    async createAnnouncement({ commit }, {announcement, userData}){
        await AnnouncementService.CreateAnnouncement(announcement).then((response) => {
            commit('CLEAR_DATA');

            var logData ={
                userId: userData.id,
                user: userData.fullName,
                action: `Created announcement: id(${response.data.id})`
            }

            LoggerService.CreateLog(logData);

        }).catch((error) => {
            throw error
        });
    },


    async editAnnouncement({ commit }, {announcement, userData}){
        await AnnouncementService.EditAnnouncement(announcement).then(() => {
            commit('CLEAR_DATA');

            var logData ={
                userId: userData.id,
                user: userData.fullName,
                action: `Edited announcement: id(${announcement.id})`
            }

            LoggerService.CreateLog(logData);

        }).catch((error) => {
            throw error
        });
    },

    async deleteAnnouncement({ commit }, {id, userData}){
        await AnnouncementService.DeleteAnnouncement(id).then(() => {
            commit('CLEAR_DATA');

            var logData ={
                userId: userData.id,
                user: userData.fullName,
                action: `Deleted announcement: id(${id})`
            }

            LoggerService.CreateLog(logData);
            
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