<template>
    <tr v-if="cheapestConnection">
        <td class="vld-parent">
            <loading :active.sync="loader.isLoading"
                     :can-cancel="true"
                     :is-full-page="false"
                     :width="40"
                     :height="40"
            ></loading>
        </td>
        <td>{{ date }}</td>
        <td>{{ getTransport(cheapestConnection) }}</td>
        <td>{{ getDeparture(cheapestConnection) }}</td>
        <td>{{ getArrival(cheapestConnection) }}</td>
        <td>{{ getDuration(cheapestConnection) }}</td>
        <td>{{ getPrice(cheapestConnection) }}</td>
    </tr>
</template>

<script>
    import service from "../../services/TravelService";
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'TravelList',
        props: {
            date: String
        },
        components: {
            Loading
        },
        data() {
            return {
                data: [],
                cheapestConnection: null,
                loader: {
                    isLoading: false,
                }
            }
        },
        created() {
            this.fetchData();
        },
        computed: {
            params() {
                return {
                    from: 'c.3173435',
                    to: 'c.3169070',
                    lang: 'en_us',
                    dt: this.date,
                    currency: 'USD',
                    adult_passengers: 1
                }
            },
        },
        methods: {
            fetchData() {
                this.showLoader();
                service.list(this.params)
                    .then((res) => {
                        this.data = res.data;
                        if (Array.isArray(this.data.result) && this.data.result.length > 0) {
                            this.cheapestConnection = this.getCheapestConnection();
                        }
                    })
                    .catch((err) => {
                        this.$notify({
                            group: 'general',
                            type: 'warn',
                            title: 'Error',
                            text: err.message
                        });
                    })
                    .finally(() => {
                        this.hideLoader();
                    });
            },
            getCheapestConnection() {
                return this.data.result.reduce((prev, current) => {
                    const segmentsSum = (acc, val) => acc + parseFloat(val.priceVal);
                    const prevPrice = parseFloat(prev.priceVal) || prev.segments.reduce(segmentsSum, 0);
                    const currentPrice = parseFloat(current.priceVal) || current.segments.reduce(segmentsSum, 0);

                    return (currentPrice < prevPrice) ? current : prev;
                });
            },
            getTransport(connection) {
                return connection.transport;
            },
            getDuration(connection) {
                return connection.duration;
            },
            getDeparture(connection) {
                return connection.segments ? connection.segments[0].departure : null;
            },
            getArrival(connection) {
                return connection.segments ? connection.segments[connection.segments.length - 1].arrival : null
            },
            getPrice(connection) {
                if (connection.price) {
                    return connection.price;
                }

                if (connection.segments) {
                    const val = connection.segments.reduce((acc, curr) => {
                        return acc + curr.priceVal
                    }, 0);

                    return `${val.toFixed(2)} ${this.data.price.currencySymbol}`
                }

                return null;
            },
            showLoader() {
                this.loader.isLoading = true;
            },
            hideLoader() {
                this.loader.isLoading = false;
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

</style>
