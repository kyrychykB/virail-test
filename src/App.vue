<template>
    <div id="app">
        <travel msg="Welcome to our Travels App"/>
        <notifications group="general"/>
    </div>
</template>

<script>
    import travel from './components/travel/list.vue'

    export default {
        name: 'App',
        components: {
            travel
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
