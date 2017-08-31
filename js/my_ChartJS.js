const color_tansparent = 'rgba(0, 0, 0, 0)';
const color_richblue = 'rgba(12, 176, 224, 1)';
const color_white = 'rgba(255, 255, 255, 1)';
const color_gray = 'rgba(187, 187, 187, 1)';

const data = {
    datasets: [{
        backgroundColor: color_tansparent,
        borderColor: color_richblue,
        pointRadius: 0,
    }, ]
};

const options = {
    title: {
        display: true,
        text: 'water temp'
    },
    tooltips: {
        // mode: 'index',
        // intersect: false,
        // callbacks: {
        //     title: function(arr, data) { return moment(arr[0].xLabel, 'x').format('YYYY/MM/DD h:mm'); },
        //     label: function(tooltipItem, data) { return tooltipItem.yLabel + '℃'; },
        // },
    },
    legend: {
        display: false,
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false,
                color: color_gray,
            },
            type: 'time',
            time: {
                displayFormats: {
                    day: 'M/D',
                    hour: 'M/D h:mm',
                },
            },
            ticks: {
                callback: function(value, index, values) {
                    if (index != 0 && index != values.length - 1) {
                        return value;
                    }
                }
            },
        }],
        yAxes: [{
            gridLines: {
                color: color_gray,
                borderDash: [10, 15],
            },
            ticks: {
                stepSize: 2,
                callback: function(value, index, values) {
                    return value + '℃';
                }
            },
        }],
    }
};

$.ajax({
    type: 'GET',
    url: 'app/get_temp.php',
    dataType: 'json'
}).done(function(d) {

    let data_daily = d.filter(function(item, index) {
        let base = parseInt(moment().subtract(1, 'days').format('x'));
        if (item.x > base) return true;
    });

    let data_hourly6 = d.filter(function(item, index) {
        let base = parseInt(moment().subtract(6, 'hour').format('x'));
        if (item.x > base) return true;
    });

    $("#tab_menu_6h").on('click', function() {
        let dat = data;
        let opt = options;

        dat.datasets[0].data = data_hourly6;
        opt.scales.xAxes[0].time.min = Math.min.apply(null, data_hourly6.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.max = Math.max.apply(null, data_hourly6.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.unit = 'hour';
        opt.scales.yAxes[0].ticks.stepSize = 1;

        let chart_6h = new Chart($("#mycanvas"), {
            type: 'line',
            data: dat,
            options: opt
        });
    });

    $("#tab_menu_daily").on('click', function() {
        let dat = data;
        let opt = options;

        dat.datasets[0].data = data_daily;
        opt.scales.xAxes[0].time.min = Math.min.apply(null, data_daily.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.max = Math.max.apply(null, data_daily.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.unit = 'hour';
        opt.scales.yAxes[0].ticks.stepSize = 2;

        new Chart($("#mycanvas"), {
            type: 'line',
            data: dat,
            options: opt
        });
    });

    $("#tab_menu_weekly").on('click', function() {
        let dat = data;
        let opt = options;

        dat.datasets[0].data = d;
        opt.scales.xAxes[0].time.min = Math.min.apply(null, d.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.max = Math.max.apply(null, d.map(function(o) {
            return o.x;
        }));
        opt.scales.xAxes[0].time.unit = 'day';
        opt.scales.yAxes[0].ticks.stepSize = 2;

        let chart_weekly = new Chart($("#mycanvas"), {
            type: 'line',
            data: dat,
            options: opt
        });
    });

    $('#tab_menu_daily').click();
});