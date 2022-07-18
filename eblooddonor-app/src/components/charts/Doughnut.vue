<template>
  <Doughnut
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
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
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
          backgroundColor: ['#e64545', '#47d663', '#e08b4a', '#e0cf4a', '#36c7bb', '#3277a8', '#6e66fa'],
          data: [80, 20, 15, 30, 40, 35, 25]
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
        plugins: {
          legend: {
            position: 'left'
          }
        }
      }
    }
  }
}
</script>
