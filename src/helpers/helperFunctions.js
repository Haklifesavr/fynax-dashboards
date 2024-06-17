import {
  colorList,
  treemapConfig__generator,
  colorDarknessChecker,
  cb_color_cycle,
  colorMap,
} from "./constants";
import { usePapaParse } from 'react-papaparse';

import _, { map } from 'underscore';

const combined_bar_charts_colors = [
  "blue",
  "white",
  //more colors to add when need arises
]

const helpers = {
  formatBytes: (bytes, decimals = 1) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  },
  sleep: (sleepDuration) => {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {
      /* Do nothing */
    }
  },
  printformData: (formData) => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  },
  formatCurrency: (value) => {
    let formatter = new Intl.NumberFormat("en-gb", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  },
  sortObject: (obj) => {
    //This doesn't work
    const newObj = Object.keys(obj)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = obj[key];

        return accumulator;
      }, {});

    return newObj;
  },

  cleanData: (obj) => {
    const sum = obj.data.reduce((a, b) => a + b, 0);
    const newLabels = [];
    const newData = [];
    obj.labels.forEach((label, index) => {
      if (100 * (obj.data[index] / sum) > 2.2) {
        newLabels.push(label);
        newData.push(obj.data[index]);
      }
    });

    obj.data = [...newData];
    obj.labels = [...newLabels];

    return obj;
  },
  dedupeData: (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      // eslint-disable-next-line no-loop-func
      const non_combined_charts = value.filter(val => val.combined_key === '')
      const combined_charts = value.filter(val => val.combined_key !== '')
      // addming uniqueness in combined_charts
      const arr = {}
      combined_charts.forEach(element => {
        if (!(element.combined_key in arr)) {
          arr[element.combined_key] = element
        }
      });
      obj[key] = [...Object.values(arr), ...non_combined_charts]
    }
    return obj;
  },

  exportCSVFile(items) {
    var blob = new Blob([items], { type: 'text/csv;charset=utf-8;' });
    return blob;
    // if (navigator.msSaveBlob) { // IE 10+
    //   navigator.msSaveBlob(blob, "abc.csv");
    // } else {
    //   var link = document.createElement("a");
    //   if (link.download !== undefined) { // feature detection
    //     // Browsers that support HTML5 download attribute
    //     var url = URL.createObjectURL(blob);
    //     link.setAttribute("href", url);
    //     link.setAttribute("download", "abc.csv");
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // }
  },


  ///////////////////////////

};

const chartsFactory = {
  getChart: (data, type) => {
    switch (type.toUpperCase()) {
      case "PIE":
        return chartsFactory.getPIE(data);
      case "LINE":
        return chartsFactory.getLINE(data);
      case "BAR":
        return chartsFactory.getBAR(data);
      case "TREEMAP":
        return chartsFactory.getTREEMAP(data);
      case "SCORECARD":
        return chartsFactory.getSCORECARD(data);
      case "COMBINEDBAR":
        return chartsFactory.getBARCOMBINED(data);
      default:
        console.log("NO CHARTS FOUND, PLEASE CHECK YOUR PREFIX");
        break;
    }
  },

  getSCORECARD: (data) => {
    const score_card = {
      combined_key: data.combined_key,
      type: "SCORECARD",
      data: `${data.label}\n${data.prefix}${data.prefix === "" ? helpers.formatCurrency(data.data) : data.data
        }`,
      title: data.title,
    };
    return score_card;
  },

  getPIE: (data) => {
    const chart_pie = {
      type: "PIE",
      labels: labelsAndDataFactory.extendedLabels_withPercentageandValue(
        data.labels,
        data.data
      ),
      datasets: {
        label: data.name,
        data: data.data.map((num) => Math.round(num)),
        backgroundColors: [...Object.values(cb_color_cycle)],
      },
    };
    return chart_pie;
  },

  getBAR: (data) => {
    const chart_bar = {
      combined_key: data.combined_key,
      type: "BAR",
      labels: labelsAndDataFactory.extendedLabels_withPercentage(
        data.labels,
        data.data
      ),
      datasets: {
        label: data.name,
        data: data.data.map((num) => Math.round(num)),
        backgroundColors: [
          "info",
          "primary",
          "success",
          "warning",
          "error",
          "light",
          "grey",
          "dark",
        ],
      },
    };
    return chart_bar;
  },

  getBARCOMBINED: (data) => {
    data = _.sortBy(data, "name")
    data = data.reverse()
    const barcom = {
      combined_key: data[0].combined_key,
      type: "COMBINEDBAR",
      labels: data[0].labels,
      label: data.map((val) => val.name).join(" vs "),
      datasets: data.map((val, index) => {
        return {
          label: val.name,
          data: val.data,
          color: combined_bar_charts_colors[index]
        }
      })
    };
    return barcom;
  },

  getLINE: (data) => {
    const chart_line = {
      combined_key: data.combined_key,
      labels: labelsAndDataFactory.extendedLabels_withPercentage(
        data.labels,
        data.data
      ),
      datasets: {
        label: data.name,
        data: data.data.map((num) => Math.round(num)),
        backgroundColors: [
          "info",
          "primary",
          "dark",
          "success",
          "warning",
          "error",
          "light",
          "grey",
        ],
      },
    };
    return chart_line;
  },

  getTABLE: (data) => {
    const rows_data = [];
    const cols_data = [];
    let loop;
    for (let j = 0; j < Object.keys(data).length; j++){
      let key = Object.keys(data)[j]
      if (typeof data[key] === "object"){
        loop = data[key];
        break;
      }
    }
    let index = 0;
    for (let i = 0; i < loop.length; i++) {
      let rows_dict = {};
      for (let j = 0; j < Object.keys(data).length; j++){
        let cols_dict = {};
        let key = Object.keys(data)[j]
        if (typeof data[key] === "object"){
          rows_dict[key] = data[key][i];
        if (i === 0){
          cols_dict["Header"] = key;
          cols_dict["accessor"] = key;
          cols_data[index] = cols_dict;
          index = index + 1;
        }
      }
      rows_data[i] = rows_dict;
    }
  }
    const table_data = {columns: cols_data, rows: rows_data}
    return table_data;
  },

  getSHEET: (data) => {
    const rows_data = [];
    let loop;
    for (let j = 0; j < Object.keys(data).length; j++){
      let key = Object.keys(data)[j]
      if (typeof data[key] === "object"){
        loop = data[key];
        break;
      }
    }
    for (let i = 0; i < loop.length; i++) {
      let rows_dict = {};
      for (let j = 0; j < Object.keys(data).length; j++){
        let key = Object.keys(data)[j]
        if (typeof data[key] === "object"){
          rows_dict[key] = data[key][i];
      }
      rows_data[i] = rows_dict;
    }
  }
    return rows_data;
  },

  getTREEMAP: (data) => {
    helpers.cleanData(data);
    const chart_tree = {
      combined_key: data.combined_key,
      type: "TREEMAP",
      labels: labelsAndDataFactory.extendedLabels_withPercentageandValue(
        data.labels,
        data.data
      ),
      datasets: {
        label: data.name,
        data: data.data.map((num) => Math.round(num)),
        backgroundColors: [...cb_color_cycle],
      },
    };
    return chart_tree;
  },
};

const labelsAndDataFactory = {
  extendedLabels_withPercentageandValue: (labels, data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return labels.map((label, index) => {
      return `${label} (${Math.round(
        100 * (data[index] / sum)
      )}%) ${helpers.formatCurrency(Math.round(data[index]))}`;
    });
  },

  extendedLabels_onlyPercentageAndValue: (labels, data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return labels.map((label, index) => {
      return `${Math.round(100 * (data[index] / sum))})%\n ${Math.round(
        data[index]
      )}`;
    });
  },
  extendedLabels_withPercentage: (labels, data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return labels.map((label, index) => {
      return `${label} (${Math.round(100 * (data[index] / sum))}%)`;
    });
  },
};

const chart_priorities = ["SCORECARD", "PIE", "TREEMAP", "LINE", "BAR"];

const prioritizer = {
  first: (arr, low, high, x, n) => {
    if (high >= low) {
      // (low + high)/2;
      let mid = low + Math.floor((high - low) / 2);

      if ((mid === 0 || x > arr[mid - 1]) && arr[mid] === x) return mid;
      if (x > arr[mid]) return prioritizer.first(arr, mid + 1, high, x, n);
      return prioritizer.first(arr, low, mid - 1, x, n);
    }
    return -1;
  },

  sortAccording: (A1, A2, m, n) => {
    let temp = [];
    let visited = [];

    for (let i = 0; i < m; i++) {
      temp[i] = A1[i];
      visited[i] = 0;
    }

    temp.sort(function (a, b) {
      return a - b;
    });

    let ind = 0;

    for (let i = 0; i < n; i++) {
      let f = prioritizer.first(temp, 0, m - 1, A2[i], m);
      // If not present, no need to proceed
      if (f === -1) {
        continue;
      }
      for (let j = f; j < m && temp[j] === A2[i]; j++) {
        A1[ind++] = temp[j];
        visited[j] = 1;
      }
    }
    for (let i = 0; i < m; i++) {
      if (visited[i] === 0) A1[ind++] = temp[i];
    }
  },
};

export {
  helpers,
  chartsFactory,
  labelsAndDataFactory,
  prioritizer,
  chart_priorities,
};
