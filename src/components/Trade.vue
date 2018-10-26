<template>
  <div class="trade-container">
    <b-form class="trade-form" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group horizontal description="Let's make a deal.">
        <div>
          <b-form-group horizontal description="Are you buying or selling?">
            <b-form-select v-model="form.trans" :options="trans"  />
          </b-form-group>
          <b-form-group horizontal description="Which coin are you trading?">
            <b-form-select 
              v-model="form.coin"
              :options="coins"
            />
          </b-form-group>
          <b-form-group horizontal description="At which exchange?">
            <b-form-select 
              v-model="form.exchange" 
              :options="exchanges" 
              @change="onCoin()"
            />
          </b-form-group>
          <b-form-group horizontal description="Here is the current market price">
            <b-form-input readonly v-model="form.price" type="number"/>
          </b-form-group>
          <b-form-group horizontal description="How many coins to buy/sell?">
            <b-form-input v-model="form.quantity" type="number" placeholder="Enter a quantity" />
          </b-form-group>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form-group>
    </b-form>
  </div>
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
        { value: 'ETH', text: 'Ethereum (ETH)' },
        { value: 'XRP', text: 'Ripple (XRP)' },
        { value: 'BCH', text: 'Bitcoin Cash (BCH)' },
        { value: 'EOS', text: 'EOS (EOS)' },
        { value: 'XLM', text: 'Stellar (XLM)' },
        { value: 'LTC', text: 'Litecoin (LTC)' },
        { value: 'ADA', text: 'Cardano (ADA)' },
        { value: 'USDT', text: 'Tether (USDT)' },
        { value: 'XMR', text: 'Monero (XMR)' }
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


      postTransaction({
        currency: this.form.coin,
        exchange: this.form.exchange,
        quantity: this.form.quantity * this.form.trans
      })
        .catch(err => {
          if(!err) alert(
            `You ${this.form.trans ? 'bought' : 'sold'} ${this.form.quantity} ${this.form.coin}s on ${this.form.coin} at ${this.form.price} per ${this.form.coin}!
            `
          );
          else alert(`Error: ${err}`);
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

.trade-container {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  5px 0;
}

.prices h1 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}


.trade-form {
  margin: 0 5px;
  width: 90%;
}

.text {
  color: #7f8386;
}

button {
  margin: 8px;
  width: 90px;
}




</style>
