<template>
   <button @click="$router.back()">
     <font-awesome-icon icon="fas fa-arrow-left"></font-awesome-icon>
   </button>
</template>

<script>
export default {}
</script>

<style scoped>
    button{
        width: 100px;
        height: 35px;
        border: none;
        border-radius: 8px;
        margin: 5px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        background: linear-gradient(138deg, rgb(147, 198, 241) 0%, rgb(179, 142, 221) 100%);
    }
    button:hover{
        background: linear-gradient(138deg, rgb(127, 186, 235) 0%, rgb(166, 120, 218) 100%);
    }
    button:active:hover{
        transform: scale(0.95);
        transition: 0.01s;
    }
</style>
