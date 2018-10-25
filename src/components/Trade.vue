<template>
  <!-- <form>
    <label for="min">Minutes<br />
      <input type="number" v-model="minutes" name="time_m" id="min" min="0" max="59">
		</label>
		<label for="sec">Seconds<br />
      <input type="number" v-model="seconds" name="time_s" id="sec" max="59" min="0">
    </label>
    <button type="button" @click="sendTime">Set time</button>
  </form> -->
  <b-form-group
      horizontal
      id="fieldset1"
      description="Let's make a deal."
      label="Enter your transaction details"
      label-for="input1"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
  >
    <div>
      <b-form-select v-model="selected1" :options="options1" class="mb-3" />
      <b-form-select v-model="selected2" :options="options2" class="mb-3" />
      <div>Selected: <strong>{{ selected1, selected2, selected3 }}</strong></div>
    </div>
    <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
  </b-form-group>
  
</template>




<script>

// select action: 
    // select currency: 
    // select exchange: 
    // (show current price)
    // number quantity


export default {
  computed: {
    state() {
      return this.name.length >= 4 ? true : false;
    },
    invalidFeedback() {
      if(this.name.length > 4) return '';
      else if(this.name.length > 0) return 'Enter at least 4 characters';
      else return 'Please enter something';
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : '';
    }
  },
  data() {
    return {
      name: '',
      selectedCoin: null,
      optionsCoin: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: {'C': '3PO'}, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      selectedExchange: null,
      optionsExchange: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: {'C': '3PO'}, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    };
  }
};
</script>

<style scoped>



</style>
