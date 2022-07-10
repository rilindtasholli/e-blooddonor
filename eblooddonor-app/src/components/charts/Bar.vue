<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    labels: {
      type: Array,
      default: () => ["Prishtinë", "Mitrovicë", "Pejë", "Prizren", "Ferizaj", "Gjilan", "Gjakovë"]
    },
    datasets: {
      type: Array,
      default: () => [
        {
            label: 'Users',
            backgroundColor: ['#e64545', '#47d663', '#e08b4a', '#e0cf4a', '#36c7bb', '#3277a8', '#6e66fa'],
            data: [40, 20, 12, 39, 10, 40, 39, 50],
        }
      ]
    }
  },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: this.datasets,
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
            legend: {
                labels: {
                    boxWidth: 0
                }
            }
        }
        
      }
    }
  }
}
</script>
