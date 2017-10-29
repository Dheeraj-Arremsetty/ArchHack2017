// Draw the chart and set the chart values

function drawChart() {
    console.log("requesting resource");
    
    $.ajax({
        type:'GET',
        url: "https://4cx9iq8gdb.execute-api.us-east-1.amazonaws.com/test_api",
        dataType: 'json',
        success: function (jsonData) {
            var status = jsonData.turn_on;
            var x = document.getElementById("status");
            if (!status) {
                x.style.color = "#FF0000"; //red - stop
            } else {
                x.style.color = "#00FF00"; //green - running
            }
            var tempC = jsonData.temperature;
            var tempF = tempC * 1.8 + 32;
            $("#temp").html(tempF+'&deg;F');
            var timeStamp = jsonData.timestamp;
            $("#timestamp").html(timeStamp);
            drawMotionChart(eval(jsonData));
            drawLineChart(eval(jsonData));
            drawColumnChart(eval(jsonData));
        },
    });
}

function drawMotionChart(jsonData) {
    var motionChartData = new google.visualization.DataTable();
    motionChartData.addColumn('number', 'Seconds');
    motionChartData.addColumn('number', 'Disturbance Level');
    jsonData.change_in_motion;
    for (var i = 0; i < jsonData.change_in_motion.length; i++) {
        motionChartData.addRow([i, jsonData.change_in_motion[i]]);
    }
    var motionChartOptions = {
        title: 'Motion Chart',
        legend: 'none',
        hAxis: { title: 'Seconds' },
    };

    var motionChart = new google.visualization.LineChart(document.getElementById('motionchart'));
    motionChart.draw(motionChartData, motionChartOptions);

}

function drawLineChart(jsonData) {
    console.log(jsonData);
    var lineChartData = new google.visualization.DataTable();
    // columns head
    lineChartData.addColumn('string', 'avg_sleep_days');
    lineChartData.addColumn('number', 'Hours');
    // rows data
    lineChartData.addRow(['Monday', jsonData.avg_sleep_days[0]]);
    lineChartData.addRow(['Tuesday', jsonData.avg_sleep_days[1]]);
    lineChartData.addRow(['Wednesday', jsonData.avg_sleep_days[2]]);
    lineChartData.addRow(['Thursday', jsonData.avg_sleep_days[3]]);
    lineChartData.addRow(['Friday', jsonData.avg_sleep_days[4]]);
    lineChartData.addRow(['Saturday', jsonData.avg_sleep_days[5]]);
    lineChartData.addRow(['Sunday', jsonData.avg_sleep_days[6]]);

    var lineChartOptions = {
        title: 'Average Sleep',
        backgroundColor: '#FEF8F4',
        legend: 'none',
    };

    var lineChart = new google.visualization.LineChart(document.getElementById('linechart'));
    lineChart.draw(lineChartData, lineChartOptions);
}

function drawColumnChart(jsonData) {
    var columnChartData = new google.visualization.DataTable();
    // columns head
    columnChartData.addColumn('string', 'Day');
    columnChartData.addColumn('number', 'Hours');
    // rows data
    columnChartData.addRow(['Day1', jsonData.last_seven_days[0]]);
    columnChartData.addRow(['Day2', jsonData.last_seven_days[1]]);
    columnChartData.addRow(['Day3', jsonData.last_seven_days[2]]);
    columnChartData.addRow(['Day4', jsonData.last_seven_days[3]]);
    columnChartData.addRow(['Day5', jsonData.last_seven_days[4]]);
    columnChartData.addRow(['Day6', jsonData.last_seven_days[5]]);
    columnChartData.addRow(['Day7', jsonData.last_seven_days[6]]);

    var columnChartOptions = {
        title: 'LastDays',
        bar: { groupWidth: "35%" },
        legend: 'none',
    };
    var columnChart = new google.visualization.ColumnChart(document.getElementById('columnchart'));
    columnChart.draw(columnChartData, columnChartOptions);

}


