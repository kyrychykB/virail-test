<template>
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col"></th>
            <th scope="col">date</th>
            <th scope="col">transport</th>
            <th scope="col">departure</th>
            <th scope="col">arrival</th>
            <th scope="col">duration</th>
            <th scope="col">price</th>
        </tr>
        </thead>
        <tbody>
        <item v-for="(date, idx) in dateRange" :key="idx" :date="date"/>
        </tbody>
    </table>
</template>

<script>
    import item from './item.vue';
    import moment from 'moment';

    export default {
        name: "TravelIndex",
        components: {
            item
        },
        data() {
            return {
                reportDays: 7
            }
        },
        computed: {
            dateRange() {
                return [...new Array(this.reportDays)].map((i, idx) => {
                    return moment().add(idx, 'days').format('YYYY-MM-D');
                })
            }
        }
    }
</script>

<style scoped>

</style>