$.ajax({
  type: "GET",
  url: "cgi/controller.php",
  dataType: "json"
}).done(function(json) {
  var chart = new CanvasJS.Chart("chartContainer", {
    axisX: {
      valueFormatString: "M/D H:mm",
    },
    axisY: {
      valueFormatString: "##.0",
      gridDashType: "dash",
      interval: 1.0,
      includeZero: false,
      interlacedColor: "#F0F8FF"
    },
    zoomEnabled: true,
    data: [{
      type: "spline",
      xValueType: "dateTime",
      xValueFormatString: "M/D H:mm",
      yValueFormatString: "##.#℃",
      markerType: "none",
      dataPoints: json
    }]
  });
  chart.render();
});
