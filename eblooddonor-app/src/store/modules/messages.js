import MessageService from "../../services/MessageService";

const state = {
    messages: null
};

const getters = {
    getMessages: (state) => state.messages
};

const mutations = {
    SET_MESSAGES(state, data){
        state.messages = data.messages;
    },
    CLEAR_DATA(state){
        state.messages = null;
    }
}

const actions = {
    async getAllMessages({commit}){
        await MessageService.GetAllMessages().then((response)=>{
            commit('SET_MESSAGES', response.data);
        })
        .catch((error)=>{
            throw error
        });
    },

    async createMessages({commit},message){

        await MessageService.CreateMessages(message).then(()=>{
            commit('CLEAR_DATA');
        })
        .catch((error)=>{
            throw error
        });
    },

    async deleteMessage({commit}, id){
        await MessageService.DeleteMessage(id).then(()=>{
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

