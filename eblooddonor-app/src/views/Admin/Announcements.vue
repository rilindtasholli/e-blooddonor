<template>
  <v-app id="announcements">
    <div class="main">
      <h1> <font-awesome-icon :icon="['fas', 'bullhorn']" /> All Announcements</h1>

      <div>
        <h3 v-if="!announcements">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="announcements"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Announcements</v-toolbar-title>
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
                            v-model="editedItem.title"
                            label="Title"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.description"
                            label="Description"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="location"
                            v-model="editedItem.location"
                            label="Location"
                          ></v-select>
                        </v-col>
                     

                      <!-- 3rd Row -->
                      
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="bloodtypes"
                            v-model="editedItem.bloodType"
                            label="Blood Type"
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
        
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "BloodType", value: "bloodType" },
        { text: "Location", value: "location" },
        { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
        id: "",
        title: "",
        description: "",
        bloodType: "",
        location: "",
    },
    defaultItem: {
        id: "",
        title: "",
        description: "",
        bloodType: "",
        location: "",
    },

    announcements: [
        {
            id: 'asd654asd4as4d6',
            title: "Kerkese Gjaku",
            description: 'Urgjente',
            bloodType: 'B+',
            location: 'Prishtinë'
        }
    ],

    showError: false,
        
    }),

     created(){
        this.updateAnnouncementList();
    },

    computed: {
        ...mapGetters(["location", "bloodtypes", "getAnnouncements"]),
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
      ...mapActions(["getAllAnnouncements", "editAnnouncement", "deleteAnnouncement"]),

        updateAnnouncementList(){
            this.getAllAnnouncements().then(()=>{
              this.announcements = this.getAllAnnouncements
            }).catch((error) => {
              console.log(error)
            })
        },
        editItem(item) {
            this.editedIndex = this.announcements.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.announcements.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
           this.deleteAnnouncement(this.editedItem.id).then(() => {
              this.updateAnnouncementList();
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
           this.editAnnouncement(this.editedItem).then(() => {
              this.updateAnnouncementList();
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
