/* eslint-disable no-dupe-keys */
// Material Dashboard 2 PRO React base styles
import { responsiveFontSizes } from "@mui/material";
import { fontWeight } from "@mui/system";
import colors from "assets/theme/base/colors";
// import ChartDataLabels from "chartjs-plugin-labels";
const { gradients, dark } = colors;
const cb_colors=['#377eb8', '#ff7f00', '#4daf4a',
'#f781bf', '#a65628', '#984ea3',
'#999999', '#e41a1c', '#dede00'];
function configs(labels, datasets) {
  const backgroundColors = [];
  console.log("SCREEN SIZE", window.innerWidth)

  if (datasets.backgroundColors) {
    datasets.backgroundColors.forEach((color) =>
      gradients[color]
        ? backgroundColors.push(gradients[color].state)
        : backgroundColors.push(dark.main)
    );
  } else {
    backgroundColors.push(dark.main);
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: cb_colors,
          fill: true,
          data: datasets.data,
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 1
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: `${(window.innerWidth <600 ? "bottom" : "right")}`,
          fullSize: false,
          align:"right",
          fontSize: 40,
          
          title:{
            display:false
          },
          labels: {
            textAlign:"left",
            usePointStyle: true,
            boxWidth: 40,
            padding:15,  
            font: {
              size: 14,
              weight: "bold"
            }     
          }
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                  label += '';
              }
              return label;
          },
        }
      },
        // datalabels: {
        //   display: true,
        //   align: 'bottom',
        //   backgroundColor: '#ccc',
        //   borderRadius: 3,
        //   font: {
        //     size: 12,
        //   },
        //   color: 'white',
        //   formatter: (val, context) => {
        //     // Grab the label for this value
        //     const label = context.chart.data.labels[context.dataIndex];  
        //     // Format the number with 2 decimal places
        //     const formattedVal = Intl.NumberFormat('en-US', {
        //       minimumFractionDigits: 2,
        //     }).format(val);
        //     // Put them together
        //     return `${label}: ${formattedVal}`;
        //   },
        // },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  };
}

export default configs;