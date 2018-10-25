<template>
  <form>
    <label for="min">Minutes<br />
      <input type="number" v-model="minutes" name="time_m" id="min" min="0" max="59">
		</label>
		<label for="sec">Seconds<br />
      <input type="number" v-model="seconds" name="time_s" id="sec" max="59" min="0">
    </label>
    <button type="button" @click="sendTime">Set time</button>
  </form>
</template>

<script>
export default {

};
</script>

<style scoped>



</style>
