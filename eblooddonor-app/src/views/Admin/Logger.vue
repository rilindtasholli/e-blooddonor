<template>
  <v-app id="logs">
    <div class="main">
      <h1> <font-awesome-icon :icon="['fas', 'file-signature']" /> All Logs</h1>

      <div>
        <h3 v-if="!logs">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="logs"
          :items-per-page="15"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Logs</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>


              <!-- Delete Modal -->
              <v-dialog v-model="dialogDelete" max-width="450px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this information?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
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
        
        { text: "DateTime", value: "dateTime" },
        { text: "User", value: "user" },
        { text: "Action", value: "action" },
       
    ],

    editedIndex: -1,
    editedItem: {
        datetime: "",
        user: "",
        action: "",
    },
    defaultItem: {
        datetime: "",
        user: "",
        action: "",
    },

    logs: null
        
    }),

    computed: {
        ...mapGetters(["getLogs"]),
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

     created(){
      this.updateLoggersList()
    },
methods: {
    ...mapActions(["getAllLogs", "deleteLog"]),

    updateLoggersList(){
      
      this.getAllLogs().then(()=>{
        this.logs = this.getLogs
      }).catch((error) => {
        console.log(error)
      })
        
    },

    deleteItem(item) {
      this.editedIndex = this.loggers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteLog(this.editedItem._id);
      this.closeDelete();
      setTimeout(() => {

        this.getAllLogs();
      }, 1000);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      this.close();
      setTimeout(() => {
        this.getLoggers();
      }, 1000);
    },
  },
}
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