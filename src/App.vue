<template>
  <div class="app">
    <h1>Crypto Monitor</h1>
    <img alt="blockchain" src="./assets/blockchain.png">

    <Prices></Prices>

    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Line Chart</h2>
          <Chart :chartData="chartData1" :options="options1" />
        </div>
        <div class="Chart2">
          <h2>Streaming Chart</h2>
          <StreamingChart :chartData="chartData2" :options="options2" />
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
import StreamingChart from './components/StreamingChart.vue';
import RandomChart from './components/RandomChart.vue';
import Prices from './components/Prices.vue';



// var color = Chart.helpers.color;

export default {
  name: 'app',
  components: {
    Chart, RandomChart, Prices, StreamingChart
  },
  data() {
    return {
      chartData1: {
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
      options1: { responsive: true, maintainAspectRatio: false },


      chartData2: {
        datasets: [{
          label: 'Dataset 1 (linear interpolation)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: []
        }, {
          label: 'Dataset 2 (cubic interpolation)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          cubicInterpolationMode: 'monotone',
          data: []
        }]
      },
      options2: {
        title: {
          display: true,
          text: 'Line chart (hotizontal scroll) sample'
        },
        scales: {
          xAxes: [{
            type: 'realtime',
            realtime: {
              onRefresh: function(chart) {
                chart.data.datasets.forEach(function(dataset) {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random()
                  });
                });
              },
              delay: 2000
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'value'
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      }



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
