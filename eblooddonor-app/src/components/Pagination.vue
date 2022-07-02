<template>
    <div class="pagination">
        <!-- <router-link to="/asdasda">Previous</router-link>
        <router-link v-for="i in pages" :key="i" :to="{params: {page: page}}">{{ i }}</router-link>
        <router-link to="/asdasda">Next</router-link> -->
        <ul>
            <li>
                <router-link
                :to="paginateObject(currentPage - 1)"
                :class="{ disabled: currentPage <= 1 }"
                > « </router-link>
            </li>
             <li  v-for="i in pages" :key="i">
                <router-link
                :to="paginateObject(i)"
                :class="{ active: i==currentPage }"
                > {{i}} </router-link>
            </li>
            <!-- <li>{{ currentPage }} / {{ totalPages }}</li> -->
            <li>
                <router-link
                :to="paginateObject(currentPage + 1)"
                :class="{ disabled: currentPage >= pages }"
                > » </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            pages: null,
            currentPage: null
        }
    },

    created() {
        this.pages = this.getPages
    },

    computed: {
        ...mapGetters(['getPages'])
    },

    mounted() {
        this.currentPage = parseInt(this.$route.query.page) || 1;
    },

    watch: {
        $route(to) {
            this.currentPage = parseInt(to.query.page) || 1;
        },
    },

    methods: {
        paginateObject(pageTo) {
            return {
                query: {
                ...this.$route.query,
                page: pageTo,
                },
            };
        },
    }
}
</script>

<style scoped>
.pagination{
    display: flex;
    justify-content: center;
    width: 100%;
}

.pagination ul{
    list-style-type: none;
    display: flex;
}

.pagination li{
    margin: 3px;
}

.pagination li a{
    display: block;
    text-decoration: none;
    padding: 10px;
    color: black;
    /* border: solid 1px black; */
    border-radius: 10px;
    background-color: #c0ccf7;
    user-select: none;
    transition: 0.3s;
}
.pagination li a:hover{
    transform: scale(1.1);
    transition: 0.1s;
}

/* .previousBtn,
.nextBtn{
    background-color: #4f5fef;
} */

.pagination li .active{
    background-color: #be4147;
    color: white;
    pointer-events: none;
}

.pagination li .disabled{
    pointer-events: none;
    opacity: 0.5;
}
</style>
