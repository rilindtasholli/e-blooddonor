import MessageService from "../../services/MessageService";

const state = {
    message: null
};

const getters = {
    getMessages: (state)=>state.message
};

const mutations = {
    SET_MESSAGE(state, data){
        state.message = data;
    },
    CLEAR_DATA(state){
        state.message = null;
    }
}

const actions = {
    async getMessages({commit}){
        await MessageService.getAllMessages().then((response)=>{
            commit('SET_MESSAGE', response.data);
        })
        .catch((error)=>{
            throw error
        });
    },

    async createMessage({commit},message){
        await MessageService.createMessages(message).then(()=>{
            commit('CLEAR_DATA');
        })
        .catch((error)=>{
            throw error
        });
    },

    async deleteMessages({commit}, id){
        await MessageService.deleteMessages(id).then(()=>{
            commit('CLEAR_DATA');
        })
        .catch((error)=>{
            throw error
        });
    },
};

export default{
    state,
    getters,
    mutations,
    actions
};

