<template>
  <div class="prices">
    
    <h2>Your Holdings</h2>

    <b-table striped hover class="text" :items="items"></b-table>

  </div>    
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table';

// Vue.component('b-table', bTable);

import { getAccounts } from '../services/api';


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
    getAccounts()
      .then(accounts => this.items = accounts.currencies);
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
