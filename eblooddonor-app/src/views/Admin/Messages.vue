<template>
  <v-app id="messages">
    <div class="main">
      <h1><font-awesome-icon :icon="['fas', 'message']" /> All Messages</h1>

      <div>
        <h3 v-if="!messages">Loading...</h3>

        <v-data-table
          v-else
          :headers="headers"
          :items="messages"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Messages</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

             
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
import { mapGetters } from "vuex";

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
        { text: "First Name", value: "fname" },
        { text: "Last Name", value: "lname" },
        { text: "Email", value: "email" },
        { text: "Message", value: "message"},
        { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
        id: "",
        name: "",
        email: "",
        message: ""
    },
    defaultItem: {
        id: "",
        fname: "",
        lname: "",
        email: "",
        message: ""
    },

    messages: [
        {
            id: 'asd654asd4as4d6',
            fname: 'Filan',
            lname: 'Fisteku',
            email: 'filan@gmail.com',
            message: 'test'
        }
    ],

    showError: false,
        
    }),

    computed: {
        ...mapGetters(["cities", "bloodtypes"]),
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
        editItem(item) {
            this.editedIndex = this.messages.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.messages.indexOf(item);
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
