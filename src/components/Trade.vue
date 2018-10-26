<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group horizontal description="Let's make a deal.">
      <div>
        <b-form-group horizontal description="Are you buying or selling?">
          <b-form-select v-model="form.trans" :options="trans" class="mb-3" />
        </b-form-group>
        <b-form-group horizontal description="Which coin are you trading?">
          <b-form-select 
            v-model="form.coin"
            :options="coins"
            class="mb-3" 
          />
        </b-form-group>
        <b-form-group horizontal description="At which exchange?">
          <b-form-select 
            v-model="form.exchange" 
            :options="exchanges" 
            @change="onCoin()"
            class="mb-3" 
          />
        </b-form-group>
        <b-form-group horizontal description="Here is the current market price">
          <b-form-input readonly v-model="form.price" type="number"/>
        </b-form-group>
        <b-form-group horizontal description="How many coins to buy/sell?">
          <b-form-input v-model="form.quantity" type="number" placeholder="Enter a quantity" />
        </b-form-group>
        <div>Selected: <strong>{{ `${form.coin}, ${form.exchange}, ${form.price}, ${form.quantity}`}}</strong></div>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form-group>
  </b-form>
</template>




<script>
import { postTransaction } from '../services/api';


export default {

  props: {
    prices: Array
  },

  data() {
    return {
      form: {
        trans: null,
        coin: null,
        exchange: null,
        price: null,
        quantity: null
      },
      trans: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: 1, text: 'Buy' },
        { value: -1, text: 'Sell' }
      ],
      coins: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: 'BTC', text: 'Bitcoin (BTC)' },
        { value: 'ETH', text: 'Ethereum (ETH)' }
      ],
      exchanges: [
        { value: null, text: 'Please select an option', disabled: true },
        { value: 'Fake Market', text: 'CoinMarketCap.com' }
      ],
      show: true
    };
  },
  methods: {
    onCoin() {
      const quote = this.prices.find(quote => quote.symbol === this.form.coin);
      this.form.price = quote.price;
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(
        {
          coin: this.form.coin,
          exchange: this.form.exchange,
          price: this.form.price,
          quantity: this.form.quantity * this.form.trans
        }
      ));

      // postTransaction({
      //   action: 'buy',
      //   currency: this.form.coin,
      //   exchange: this.form.exchange,
      //   price: this.form.price,
      //   quantity: this.form.quantity * this.form.trans
      // });
      postTransaction({
        currency: this.form.coin,
        exchange: this.form.exchange,
        price: this.form.price,
        quantity: this.form.quantity * this.form.trans
      });

      this.onReset(evt);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.trans = null;
      this.form.coin = null;
      this.form.exchange = null;
      this.form.price = null;
      this.form.quantity = null;
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => this.show = true);
    }
  }
};
</script>

<style scoped>



</style>
