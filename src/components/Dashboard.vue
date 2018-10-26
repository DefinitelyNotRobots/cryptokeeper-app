<template>
  <div class="portfolio">

    <Leaderboard :leaders="leaders" />
    <Trade :prices="prices" />
    <Holdings :accounts="accounts" />
    <Prices :prices="prices" />


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
        <!-- <div class="Chart3">
          <h2>Bitcoin Chart</h2>
          <BitcoinChart id="Bitfinex" :chartData="chartData3" :options="options3" />
        </div> -->
        <div class="RandomChart">
          <RandomChart/>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import Prices from './Prices.vue';
import Holdings from './Holdings.vue';
import Trade from './Trade.vue';
import Leaderboard from './Leaderboard.vue';

import { getPrices, getAccounts, getLeaderboard } from '../services/api';

import Chart from './Chart.vue';
import StreamingChart from './StreamingChart.vue';
import RandomChart from './RandomChart.vue';
import BitcoinChart from './BitcoinChart.vue';
import 'chartjs-plugin-streaming';


//not sure if necessary
import 'chart.js';
import 'pusher-js';
import 'moment';
// import moment from 'moment';
// moment().format();


var buf = {};
buf['Bitfinex'] = [[], []];
var id = 'Bitfinex';


var ws = new WebSocket('wss://api.bitfinex.com/ws/');
ws.onopen = function() {
  ws.send(JSON.stringify({      // send subscribe request
    'event': 'subscribe',
    'channel': 'trades',
    'pair': 'BTCUSD'
  }));
};
ws.onmessage = function(msg) {     // callback on message receipt
  var response = JSON.parse(msg.data);
  if(response[1] === 'te') {    // Only 'te' message type is needed
    buf['Bitfinex'][response[5] > 0 ? 0 : 1].push({
      x: response[3] * 1000, // timestamp in milliseconds
      y: response[4]         // price in US dollar
    });
  }
};

export default {
  name: 'dashboard',
  components: {
    Chart, RandomChart, Prices, 
    StreamingChart, BitcoinChart, 
    Holdings, Trade, Leaderboard
  },

  mounted() {
    getPrices().then(prices => {
      
      this.prices = Object.keys(prices)
        .map(symbol => ({
          symbol: symbol,
          price: prices[symbol].price,
          rank: prices[symbol].rank
        }))
        .sort((a, b) => {
          return a.rank - b.rank;
        });
      
    });
    getAccounts()
      .then(account => {      
        
        this.accounts = account.currencies.reduce((acc, coin) => {
          acc.push({
            exchange: account.exchange,
            coin: coin.name,
            quantity: coin.quantity
          });
          return acc;
        }, []);
      });

    getLeaderboard()
      .then(leaders => {
        
        console.log(leaders);

        this.leaders = leaders;

        this.leaders = leaders.reduce((acc, leader) => {
          acc.push({
            user: leader.user[0].name,
            total: leader.usd
          });
          return acc;
        }, []);
      });
  },

  data() {
    return {

      prices: null,
      accounts: null,
      leaders: null,



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
      },

      chartData3: {
        datasets: [{
          data: [],
          label: 'Buy',                     // 'buy' price data
          borderColor: 'rgb(255, 99, 132)', // line color
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // fill color
          fill: false,                      // no fill
          lineTension: 0                    // straight line
        }, {
          data: [],
          label: 'Sell',                    // 'sell' price data
          borderColor: 'rgb(54, 162, 235)', // line color
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // fill color
          fill: false,                      // no fill
          lineTension: 0                    // straight line
        }]
      },
      chartOptions3: {
        title: {
          text: 'BTC/USD (' + id + ')', // chart title
          display: true
        },
        scales: {
          xAxes: [{
            type: 'realtime' // auto-scroll on X axis
          }]
        },
        plugins: {
          streaming: {
            duration: 300000, // display data for the latest 300000ms (5 mins)
            onRefresh: function(chart) { // callback on chart update interval
              Array.prototype.push.apply(
                chart.data.datasets[0].data, buf[id][0]
              ); 
              Array.prototype.push.apply(
                chart.data.datasets[1].data, buf[id][1]
              );  
              buf[id] = [[], []]; // clear buffer
            }
          }
        }
      }



    };
  }
};

</script>

<style>
.portfolio {
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
