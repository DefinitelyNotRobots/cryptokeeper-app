<!-- No template because https://github.com/apertureless/vue-chartjs#single-file-components -->
<!-- See more notes here, including the attention and limitations statements: https://vue-chartjs.org/#/home?id=example -->



<script>
import { Line } from 'vue-chartjs';
import 'chartjs-plugin-streaming';
import 'chart.js';
// import Pusher from 'pusher-js';
import 'pusher-js';
import moment from 'moment';
moment().format();



export default {
  extends: Line,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options);      
  },
};
</script>
