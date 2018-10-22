<template>
  <div class="app">
    <h1>Crypto Monitor</h1>
    <img alt="blockchain" src="./assets/blockchain.png">

    <Prices></Prices>

    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Line Chart</h2>
          <Chart :chartData="chartData" :options="options" />
        </div>
        <div class="RandomChart">
          <RandomChart/>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import Chart from './components/Chart.vue';
import RandomChart from './components/RandomChart.vue';
import Prices from './components/Prices.vue';


export default {
  name: 'app',
  components: {
    Chart, RandomChart, Prices
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40]
          }, {
            label: 'Data Two',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    };
  }
};

</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.Chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin:  25px 0;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>
