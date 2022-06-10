<template>
  <v-app id="users">
    <div class="main">
      <h1><font-awesome-icon :icon="['fas', 'users']" /> All Users</h1>

      <div>
        <h3 v-if="!users">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="users"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Users</v-toolbar-title>
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
                            v-model="editedItem.firstName"
                            label="First Name"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.lastName"
                            label="Last Name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      
                      <!-- 2nd Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.email"
                            label="Email"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="cities"
                            v-model="editedItem.location"
                            label="location"
                          ></v-select>
                        </v-col>
                      </v-row>

                      <!-- 3rd Row -->
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="bloodtypes"
                            v-model="editedItem.bloodType"
                            label="Blood Type"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="roles"
                            v-model="editedItem.role"
                            label="Role"
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
              </v-dialog> <!-- End of Edit Modal -->

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
           <template v-slot:item.actions="{ item }">
         <!-- <template v-slot:[`item.actions`]="{ item }"> -->
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "BloodType", value: "bloodType" },
        // { text: "Role", value: "role" },
        { text: "location", value: "location" },
        { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
        id: "",
        name: "",
        email: "",
        bloodType: "",
        role: "",
        location: "",
    },
    defaultItem: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        bloodType: "",
        role: "",
        location: "",
    },

    users: [
        {
            id: 'asd654asd4as4d6',
            firstName: 'Filan',
            lastName: 'Fisteku',
            email: 'filan@gmail.com',
            bloodType: 'B+',
            role: 'user',
            location: 'Prishtinë'
        }
    ],

    showError: false,
        
    }),

    created(){
        this.updateUserList();
    },

    computed: {
        ...mapGetters(["roles", "cities", "bloodtypes", "getUsers"]),
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        ...mapActions(["getAllUsers", "editUser", "deleteUser"]),

        updateUserList(){
            this.getAllUsers().then(()=>{
              this.users = this.getUsers
            }).catch((error) => {
              console.log(error)
            })
        },

        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.deleteUser(this.editedItem.id).then(() => {
              this.updateUserList();
            }).catch((error) => {
              console.log(error)
            })

            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            // this.removeErrorMessage();
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            this.editUser(this.editedItem).then(() => {
              this.updateUserList();
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
</style>
