<template>
  <div class="prices">
    
    <h2>Bitcoin Price Index</h2>

    <div
      v-for="currency in info"
      class="text"
      :key="currency.description"
    >
      {{ currency.description }}:

      <span class="text">
        <span class="text" v-html="currency.symbol"></span>
        {{ currency.rate_float | currencydecimal }}
      </span>
    </div>

    <h2>Dummy Table</h2>

    <b-table striped hover class="text" :items="items"></b-table>

  </div>    
</template>

<script>
import axios from 'axios';
import bTable from 'bootstrap-vue/es/components/table/table';

// Vue.component('b-table', bTable);


export default {
  components: {
    bTable
  },
  data() {
    return {
      info: null,
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    };
  },
  mounted() {
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
