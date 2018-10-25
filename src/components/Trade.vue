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
      else if (this.name.length > 0) return 'Enter at least 4 characters';
      else return 'Please enter something';
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : '';
    }
  },
  data() {
    return {
      name: ''
    };
  }
};
</script>

<style scoped>



</style>
