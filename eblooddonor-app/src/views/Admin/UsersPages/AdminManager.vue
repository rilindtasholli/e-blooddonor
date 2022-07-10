<template>
  <v-app id="users">
   
    <div class="main">
      <BackButtonVue></BackButtonVue>
      <h1><font-awesome-icon :icon="['fas', 'user-shield']" /> Admin Manager</h1>

      <div>
        <h3 v-if="!admins">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="admins"
          :items-per-page="5"
          :search="search"
          sort-by="id"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Users</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

            <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="addNewAdmin()"
                      >
                    New Admin
            </v-btn>

              <!-- Modal -->
              <v-dialog v-model="modal" max-width="680px">
                <v-card v-if="modalType == 'CONFIRM'">
                  <v-card-title v-if="setRole == 'ADMIN'" class="text-h5 text-center py-9">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to change role to <strong style="background-color: rgba(0, 200, 83, 0.5);">Admin</strong>?
                  </v-card-title>

                  <v-card-title v-if="setRole == 'SUPERADMIN'" class="text-h5 text-center py-9">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to change role to  <strong style="background-color: rgb(0, 191, 165, 0.5);">SuperAdmin</strong>?
                  </v-card-title>

                  <v-card-title v-else-if="setRole == 'USER'" class="text-h5 text-center py-9">
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
                    Are you sure you want to remove admin role?
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

                <v-card v-if="modalType == 'ADD'">
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <!-- 1st Row -->
                      <v-row>
                        <v-col cols="12" sm="8" md="8">
                          <v-text-field
                            v-model="itemID"
                            label="Enter User ID"
                          ></v-text-field>
                        </v-col>

                        
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="8" md="8">
                          <v-select
                            :items="AdminRoles"
                            v-model="setRole"
                            label="Select a Role"
                          ></v-select>
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
           <template v-slot:item.actions="{ item }">
            <v-btn
              class="mx-1"
              color="red lighten-1"
              small
              @click="changeRoleSimpleUser(item)">
              Remove
            </v-btn>
            
         <!-- <template v-slot:[`item.actions`]="{ item }"> -->
            <v-btn v-if="item.role == 'SuperAdmin'"
              class="mx-1"
              color="green accent-4"
              small
              @click="changeRoleAdmin(item)">
              Set Admin
            </v-btn>
             
            <v-btn v-if="item.role == 'Admin'"
              class="mx-1"
              color="teal accent-4"
              small
              @click="changeRoleSuperAdmin(item)">
              Set SuperAdmin
            </v-btn>

            <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
           
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
import { mapGetters, mapActions } from "vuex"
import BackButtonVue from "@/components/BackButton.vue"

export default {
    components:{
      BackButtonVue
    },
    data: () => ({
    search: "",
    modal: false,
    modalType: "",
    headers: [
        {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
        },
        { text: "Full Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "location", value: "location" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
    ],

    itemIndex: -1,
    itemID: "",
    setRole: "",
    AdminRoles: ["ADMIN", "SUPERADMIN"],
    admins: [
        {
            id: 'asd654asd4as4d6',
            name: 'Filan Fisteku',
            email: 'filan@gmail.com',
            location: 'Prishtinë',
            role: 'USER'
        }
    ],

    showError: false,
        
    }),

    created(){
        this.updateAdminList();
    },

    computed: {
        ...mapGetters(["getAdmins"]),
        formTitle() {
            return this.itemIndex === -1 ? "Add New Admin" : "Edit Item";
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
        ...mapActions(["getAllAdmins", "setUserRole"]),

        updateAdminList(){
            this.getAllAdmins().then(()=>{
              this.admins = this.getAdmins
            }).catch((error) => {
              console.log(error)
            })
        },

        changeRoleAdmin(item) {
            this.itemIndex = this.admins.indexOf(item);
            this.itemID = item.id;
            this.setRole = "ADMIN";
            this.modalType = "CONFIRM";
            this.modal = true;
        },

        changeRoleSuperAdmin(item) {
            this.itemIndex = this.admins.indexOf(item);
            this.itemID = item.id;
            this.setRole = "SUPERADMIN";
            this.modalType = "CONFIRM";
            this.modal = true;
        },

        changeRoleSimpleUser(item) {
            this.itemIndex = this.admins.indexOf(item);
            this.itemID = item.id;
            this.setRole = "USER";
            this.modalType = "CONFIRM";
            this.modal = true;
        },

        addNewAdmin() {
            this.modalType = "ADD";
            this.modal = true;
        },

        close() {
            this.itemIndex = -1;
            this.itemID = "";
            this.setRole = "";
            this.modal = false;
            // this.removeErrorMessage();
        },

        save() {
            var data = {
                id: this.itemID,
                role: this.setRole
            }
            
            this.setUserRole(data).then(() => {
                this.updateAdminList();
            }).catch((error) => {
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

strong{
    padding: 3px;
    margin: 0 5px;
    border-radius: 5px;
}

h1{
  margin-top: 50px;
}
</style>
