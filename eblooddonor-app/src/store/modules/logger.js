import LoggerService from "../../services/LoggerService";

const state = {
    logs: null
};

const getters = {
    getLogs: (state) => state.logs
};

const mutations = {
    SET_LOGS(state, data){
        state.logs = data.logs;
    },
    CLEAR_DATA(state){
        state.logs = null;
    }
}

const actions = {
    async getAllLogs({commit}){

        await LoggerService.GetAllLogs().then((response)=>{
            console.log(response.data)
            commit ('SET_LOGS', response.data);
        })
        .catch((error)=>{
            throw error
        });
    },

    async createLog({commit}, logger){
        await LoggerService.CreateLog(logger).then(()=>{
            commit('CLEAR_DATA');
        })
        .catch((error)=>{
            throw error
        });
    },

    async deleteLog({commit}, logger){
        await LoggerService.DeleteLog(logger).then(()=>{
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