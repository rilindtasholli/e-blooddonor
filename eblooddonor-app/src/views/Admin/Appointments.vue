<template>
  <v-app id="appointments">
    <div class="main">
      <h1><font-awesome-icon :icon="['fas', 'calendar-check']" /> All Appointments</h1>

      <div>
        <h3 v-if="!appointments">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="appointments"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Appointments</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <!-- Modal -->
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>

                  <v-card-title v-if="isDelete" class="text-h5 text-center">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to delete?
                  </v-card-title>

                   <v-card-title v-else class="text-h5 text-center">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to approve?
                  </v-card-title>


                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save"
                      >YES</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog> <!-- End of Delete Modal -->

            </v-toolbar>
            <v-container>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-container>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <!-- <v-icon 
              class="mx-3"
             small @click="deleteItem(item)"> 
             mdi-delete 
            </v-icon> -->

              <v-btn v-if="item.status == 'Pending'"
              style="margin-right= 100px"
              color="primary"
              small
              @click="approveItem(item)"
              >Approve</v-btn
            >
          </template>
          <!-- <template v-slot:no-data>
                    <v-btn
                        color="primary"
                        @click="initialize"
                    >
                        Reset
                    </v-btn>
                    </template> -->
        </v-data-table>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data: () => ({
    search: "",
    dialog: false,
    isDelete: false,
    headers: [
        {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        },
        { text: "Announcement", value: "announcement" },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
        { text: "User", value: "user" },
        { text: "Actions", value: "actions", sortable: false },
    ],

    itemIndex: -1,
    itemID: {
        id: "",
        announcement: "",
        date: "",
        status: "",
        user: "",
    },
    defaultItem: {
        id: "",
        announcement: "",
        date: "",
        status: "",
        user: "",
    },

   appointments : [
        {
            id: 'asd654asd4as4d6',
            announcement: 'test',
            date: '2022-05-18',
            status: 'approved',
            user: 'Filan'
        }
    ],

    showError: false,
        
    }),

    created() {
      this.updateAppointmentList()
    },

    computed: {
        ...mapGetters(["getAppointments"]),
        formTitle() {
            return this.itemIndex === -1 ? "New Appointment" : "Edit Appointment";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        isDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {
        ...mapActions(['getAllAppointments', "approveAppointment"]),

        updateAppointmentList(){
          this.getAllAppointments().then(()=>{
            this.appointments = this.getAppointments
          }).catch((error) => {
            console.log(error)
          })
          
        },

        approveItem(item) {
            this.itemIndex = this.appointments.indexOf(item);
            this.itemID = item.id;
            this.isDelete = false
            this.dialog = true;
        },

        deleteItem(item) {
            this.itemIndex = this.appointments.indexOf(item);
            this.itemID = item.id;
            this.isDelete = true;
            this.dialog = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.itemID = "";
                this.itemIndex = -1;
            });
            //this.removeErrorMessage();
        },

        save() {
          if(!this.isDelete){

            //approve appointment
            this.approveAppointment(this.itemID).then(() => {
              this.updateAppointmentList();
            }).catch((error) => {
              console.log(error)
            })

          }else{
            //delete appointment
          }
          
          this.close()
        }
    }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#error {
  color: rgb(201, 63, 63);
}

svg{
  margin-right: 10px;
  color: rgb(201, 63, 63);
}
</style>
