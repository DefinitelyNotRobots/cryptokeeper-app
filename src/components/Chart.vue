<!-- No template because https://github.com/apertureless/vue-chartjs#single-file-components -->
<!-- See more notes here, including the attention and limitations statements: https://vue-chartjs.org/#/home?id=example -->

<script>
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  data() {
    return {
      gradient: null,
      gradient2: null
    };
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)');
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.renderChart(this.chartData, this.options);      
  },
};
</script>
