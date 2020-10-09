// This is starter code for a line chart with  multiple Y axes using chart.js
// On this chart we can demonstrate any potential correlation between VIX and
// COVID positivity rates from the beginning of 2020 (?) to as close to now
// as the data allow
// Meets the new .js library requirement for our project

var lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      borderColor: window.chartColors.red,
      backgroundColor: window.chartColors.red,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
      yAxisID: "y-axis-1",
    },
    {
      label: "My Second dataset",
      borderColor: window.chartColors.blue,
      backgroundColor: window.chartColors.blue,
      fill: false,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
      ],
      yAxisID: "y-axis-2",
    },
  ],
};

window.onload = function () {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = Chart.Line(ctx, {
    data: lineChartData,
    options: {
      responsive: true,
      hoverMode: "index",
      stacked: false,
      title: {
        display: true,
        text: "Volitility Index and COVID Positivity for 2020",
      },
      scales: {
        yAxes: [
          {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "left",
            id: "y-axis-1",
          },
          {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "right",
            id: "y-axis-2",

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        ],
      },
    },
  });
};

document.getElementById("randomizeData").addEventListener("click", function () {
  lineChartData.datasets.forEach(function (dataset) {
    dataset.data = dataset.data.map(function () {
      return randomScalingFactor();
    });
  });

  window.myLine.update();
});
