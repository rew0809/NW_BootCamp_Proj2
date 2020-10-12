d3.csv("assets/data/covidCasesAndSettles.csv", function(error, covidData) {
	if (error) throw error;
	// Print the tvData
  
	// Cast the hours value to a number for each piece of tvData
	covidData.forEach(function(data) {
	  data.DailyCases = +data.DailyCases;
	  data.vix = +data.vix;
	  data.sp = +data.sp;
	  data.xal = +data.xal;
  
	  // console.log(data.DailyCases)
	});

	let dates = covidData.map(d =>d.Date);
	let dailyCases = covidData.map(d =>d.DailyCases);
	let vix = covidData.map(d =>d.vix);
	let sp = covidData.map(d =>d.sp);
	let xal = covidData.map(d =>d.xal);
	
	//console.log(dates);
	var color = Chart.helpers.color;
	var lineChartData = {
		labels: dates,
		datasets: [{
			label: 'Daily COVID Cases',
			backgroundColor: color(window.chartColors.red).alpha(0.4).rgbString(),
			borderColor: window.chartColors.red,
			borderWidth: 2,
			fill: true,
			data: dailyCases,
			yAxisID: 'y-axis-1',
			pointRadius: 0,
			pointHoverRadius: 10
		}, {
			label: 'SP 500',
			borderColor: window.chartColors.blue,
			backgroundColor: window.chartColors.blue,
			fill: false,
			borderDash: [5, 5],
			data: sp,
			yAxisID: 'y-axis-2',
			pointRadius: 0,
			pointHoverRadius: 10
		}, {
			label: 'VIX (Fear Index)',
			borderColor: window.chartColors.purple,
			backgroundColor: window.chartColors.purple,
			fill: false,
			data: vix,
			yAxisID: 'y-axis-3',
			pointRadius: 3,
			pointHoverRadius: 10
		}, {
			label: 'XAL Airline Index',
			borderColor: window.chartColors.green,
			backgroundColor: window.chartColors.green,
			fill: false,
			data: xal,
			yAxisID: 'y-axis-4',
			pointRadius: 0,
			pointHoverRadius: 10
		}]
		
	};


	window.onload = function() {
		var ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = Chart.Line(ctx, {
			data: lineChartData,
			options: {
				responsive: true,
				// hoverMode: 'index',
				// stacked: false,
				title: {
					display: true,
					text: 'Market Complacency During COVID',
					fontColor: "#ffffff",
					fontSize: 30, 
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						
						ticks: {
							callback: function(dataLabel, index) {
								// Hide the label of every 2nd dataset. return null to hide the grid line too
								return index % 2 === 0 ? dataLabel : '';
							},
							fontColor: "#ffffff"
						}
					}],
					yAxes: [{
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'left',
						id: 'y-axis-1',
						scaleLabel: {
							display: true,
							labelString: 'New Daily COVID Cases',
							fontColor: window.chartColors.red,
						},
						ticks: {
							fontColor: window.chartColors.red
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.red
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-2',
						scaleLabel: {
							display: true,
							labelString: 'S&P 500 Close',
							fontColor: window.chartColors.blue
						},
						ticks: {
							fontColor: window.chartColors.blue
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.blue
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-3',
						scaleLabel: {
							display: true,
							labelString: 'VIX Close',
							fontColor: window.chartColors.purple
						},
						ticks: {
							fontColor: window.chartColors.purple
						},
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.purple
						},
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: 'right',
						id: 'y-axis-4',
						scaleLabel: {
							display: true,
							labelString: 'XAL CLose',
							fontColor: window.chartColors.green
						},
						ticks: {
							fontColor: window.chartColors.green
						},
						// grid line settings
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
							color: window.chartColors.green
						},
					}],
				}
			}
		});
	};

})