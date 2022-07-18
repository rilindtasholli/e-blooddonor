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

              <router-link to="/admin/users/manager">
                  <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        >
                       Admin Manager
                    </v-btn>
                 </router-link>

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

        </v-data-table>
      </div>
    </div>
    
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

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
        { text: "location", value: "location" }
    ],

    editedIndex: -1,
    editedItem: {
        id: "",
        name: "",
        email: "",
        bloodType: "",
        location: "",
    },
    defaultItem: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        bloodType: "",
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
        ...mapActions(["getAllUsers", "editUser"]),

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

            // var editedUser = {
            //     id: this.editedItem.id,
            //     firtName: this.editedItem.firstName,
            //     email: this.editedItem.email,
            //     bloodType: this.editedItem.bloodType,
            //     location: this.editedItem.location
            // }

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
