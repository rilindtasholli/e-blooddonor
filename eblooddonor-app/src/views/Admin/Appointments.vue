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

              <!-- New/Edit Modal -->
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        New Item
                    </v-btn>
                </template> -->
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <!-- 1st Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.announcement"
                            label="Announcement"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      
                      <!-- 2nd Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Appointment date"
                          ></v-text-field>
                        </v-col>
                      </v-row>


                      <!-- 3rd Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                           <v-text-field
                            v-model="editedItem.status"
                            label="Status"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                       <!-- 4th Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                           <v-text-field
                            v-model="editedItem.user"
                            label="User"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                    </v-container>

                    <!-- Error Message -->
                    <p v-if="showError" id="error">
                      <font-awesome-icon
                        :icon="['fas', 'circle-exclamation']"
                      />
                      {{ errorMessage }}
                    </p>
                  </v-card-text>
                  
                   <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Delete Modal -->
              <v-dialog v-model="dialogDelete" max-width="450px">
                <v-card>
                  <v-card-title class="text-h5 text-center">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to delete?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
            <v-icon style="margin-left: 5px"
             small @click="deleteItem(item)"> mdi-delete </v-icon>
                <v-btn
              style="margin-right= 100px"
              color="primary"
              small
              @click="approve(item)"
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
    dialogDelete: false,
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

    editedIndex: -1,
    editedItem: {
        id: "",
        name: "",
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
            announcement: 'Kerkese Gjaku',
            date: '2022-05-18',
            status: 'pending',
            user: 'Filan'
        }
    ],

    showError: false,
        
    }),

    created(){
      this.updateAppointmentList();
    },

    computed: {
        ...mapGetters(["appointments"]),
        formTitle() {
            return this.editedIndex === -1 ? "New Appointment" : "Edit Appointment";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {

        ...mapActions(["getAllAppointments", 
        "deleteAppointment", "editAppointment"]),

        updateAppointmentList(){
          this.getAllAppointments().then(()=>{
            this.appointments = this.getAllAppointments
          }).catch((error)=>{
            console.log(error)
          })
        },

        editItem(item) {
            this.editedIndex = this.appointments.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.appointments.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.removeErrorMessage();
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            this.editAppointment(this.editedItem).then(()=>{
              this.updateAppointmentList();
            }).catch((error)=>{
              console.log(error)
            })
          this.close();
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
