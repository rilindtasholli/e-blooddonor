import AppointmentService from "@/services/AppointmentService";

const state = {
    appointments:null, 
    appointment: null
};

const getters = {
    getAppointments: (state) => state.appointments,
    getAppointment: (state) => state.appointment,
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
        async getAllAppointments({commit}){
            await AppointmentService.GetAppointments().then((response) => {
                commit('SET_APPOINTMENTS', response.data);
            }).catch((error) => {
                throw error
            });
        },

          async getUserAppointments({commit}, id){
            await AppointmentService.GetUserAppointments(id).then((response) => {
                commit('SET_APPOINTMENTS', response.data);
            }).catch((error) => {
                throw error
            });
        },

        async editAppointment({commit}, appointment){
            await AppointmentService.EditAppointment(appointment)
            .then(()=> {
                commit('CLEAR_DATA');
            }).catch((error)=>{
                throw error
            });
        },

        async deleteAppointment({commit}, id){
            await AppointmentService.DeleteAppointment(id).then(()=>{
                commit('CLEAR_DATA');
            }).catch((error)=>{
                throw error
            });
        },

        async createAppointment({commit}, appointment){
          await AppointmentService.CreateAppointment(appointment).then(()=>{
            commit('CLEAR_DATA');
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


