const tz_ja = -9 * 60;

let hc = Highcharts;
hc.setOptions({
    global: {
        timezoneOffset: tz_ja
    }
});

let opt = {
    chart: {
        zoomType: 'x'
    },
    credits: {
        enabled: false
    },
    exporting: {
        buttons: {
            contextButton: {
                enabled: false,
            },
        },
    },
    title: {
        text: 'water temperature'
    },
    yAxis: {
        title: {
            text: 'temperature'
        },
        labels: {
            format: '{value}℃'
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%m/%d',
            hour: '%k:%M',
        }
    },
    legend: {
        enabled: false,
    },
    tooltip: {
        xDateFormat: '%Y/%m/%d %k:%M',
        valueSuffix: '℃'
    },
    series: [{
        name: 'temp',
        turboThreshold: 0,
    }]
};

$.ajax({
    type: 'GET',
    url: 'app/get_temp.php',
    dataType: 'json'
}).done(function(d) {
    opt.series[0].data = d;

    $("#tab_menu_6h").on('click', function() {
        opt.xAxis.min = parseInt(moment().subtract(6, 'hour').format('x'));
        hc.chart('chart', opt);
    });

    $("#tab_menu_daily").on('click', function() {
        opt.xAxis.min = parseInt(moment().subtract(1, 'days').format('x'));
        hc.chart('chart', opt);
    });

    $("#tab_menu_weekly").on('click', function() {
        opt.xAxis.min = undefined;
        hc.chart('chart', opt);
    });

    $('#tab_menu_daily').click();
});