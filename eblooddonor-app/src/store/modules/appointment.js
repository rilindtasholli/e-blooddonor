import AppointmentService from "@/services/AppointmentService";
import LoggerService from '@/services/LoggerService';

const state = {
    appointments:null, 
    appointment: null
};

const getters = {
    getAppointments: (state) => state.appointments,
    getCurrentAppointment: (state) => state.appointment,
}

const mutations = {
    SET_APPOINTMENTS(state, data){
        state.appointments = data;
    },
    SET_APPOINTMENT(state, data){
        state.appointment = data;
    },
    CLEAR_DATA(state){
        state.appointments = null;
        state.appointment = null;
    }
}

    const actions = {
        async getAllAppointments({commit},page){
            await AppointmentService.GetAppointments(page).then((response) => {
                commit('SET_APPOINTMENTS', response.data);
            }).catch((error) => {
                throw error
            });
        },

          async getAppointment({commit}, id){
            await AppointmentService.GetAppointment(id).then((response) => {
                commit('SET_APPOINTMENT', response.data);
            }).catch((error) => {
                throw error
            });
        },

        async createAppointment({commit}, appointment){
          await AppointmentService.CreateAppointment(appointment).then(()=>{
            commit('CLEAR_DATA');
          }).catch((error)=>{
            throw error
          });
        },
        async deleteAppointment({ commit }, id){
            await AppointmentService.DeleteAppointment(id).then(() => {
                commit('CLEAR_DATA');
            }).catch((error) => {
                throw error
            });
        },

        async approveAppointment({commit}, {id, userData}){
            await AppointmentService.ApproveAppointment(id).then(()=>{
                commit('CLEAR_DATA');

                var logData ={
                    userId: userData.id,
                    user: userData.fullName,
                    action: `Approved appointment: id(${id})`
                }
        
                LoggerService.CreateLog(logData);
            }).catch((error)=>{
                throw error
            });
        }

    };

export default{
    state, 
    getters,
    mutations,
    actions
}


