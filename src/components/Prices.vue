<template>
  <div class="prices">
    
    <h2>Prices for Top 10 Coins</h2>

    <b-table striped hover class="text" :items="items"></b-table>

  </div>    
</template>

<script>
import axios from 'axios';
import bTable from 'bootstrap-vue/es/components/table/table';

// Vue.component('b-table', bTable);

import { getPrices } from '../services/api';


export default {
  components: {
    bTable
  },
  data() {
    return {
      info: null,
      items: null
    };
  },
  mounted() {

    getPrices()
      .then(prices => this.items = prices);

    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response.data.bpi));
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    }
  },
};
</script>

<style>

.prices {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.prices h1 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}

.text {
  color: #606162;
}


</style>
