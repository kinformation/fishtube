var default_elements = {
  title: {
    text: "water temperature",
  },
  axisX: {
    valueFormatString: "M/D H:mm",
  },
  axisY: {
    valueFormatString: "##.0",
    gridDashType: "dash",
    interval: 2.0,
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
    dataPoints: [],
  }]
};

$.ajax({
  type: "GET",
  url: "app/get_temp.php",
  dataType: "json"
}).done(function(data) {
  var chart = new CanvasJS.Chart("chart", default_elements);
  chart.render();
  chart.data[0].set("dataPoints", data);

  $("#tab_menu_6h").on('click', function() {
    dt = new Date();
    chart.axisX[0].set("minimum", dt.setHours(dt.getHours() - 6));
    chart.axisX[0].set("intervalType", "hour");
    chart.axisX[0].set("interval", 1);
    chart.axisX[0].set("valueFormatString", "M/D H:mm");
    chart.axisY[0].set("interval", 0.5);
  });

  $("#tab_menu_daily").on('click', function() {
    dt = new Date();
    chart.axisX[0].set("minimum", dt.setDate(dt.getDate() - 1));
    chart.axisX[0].set("intervalType", "hour");
    chart.axisX[0].set("interval", 3);
    chart.axisX[0].set("valueFormatString", "M/D H:mm");
    chart.axisY[0].set("interval", 2.0);
  });

  $("#tab_menu_weekly").on('click', function() {
    dt = new Date();
    chart.axisX[0].set("minimum", dt.setDate(dt.getDate() - 7));
    chart.axisX[0].set("intervalType", "day");
    chart.axisX[0].set("interval", 1);
    chart.axisX[0].set("valueFormatString", "M/D");
    chart.axisY[0].set("interval", 2.0);
  });

  $('#tab_menu_daily').click();
});
