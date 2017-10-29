// Draw the chart and set the chart values

function drawChart() {
    $.ajax({
        type: 'GET',
        url: "https://4cx9iq8gdb.execute-api.us-east-1.amazonaws.com/test_api",
        dataType: 'json',
        success: function (jsonData) {
            var status = jsonData.turn_on;
            var x = document.getElementById("status");
            if (!status) {
                x.style.color = "#FF0000"; //red - stop
            } else {
                x.style.color = "#00FF00"; //green - running
                drawMotionChart(eval(jsonData));
            }
            var tempC = jsonData.temperature[0];
            var tempF = tempC * 1.8 + 32;
            $("#temp").html(tempF + '&deg;F');
            var humidity = jsonData.temperature[1];
            $("#humidity").html(humidity + '%');

            var timeStamp = jsonData.timestamp;
            $("#timestamp").html(timeStamp);

            drawLineChart(eval(jsonData));
            drawColumnChart(eval(jsonData));
        },
    });
}

function drawMotionChart(jsonData) {
    var motionChartData = new google.visualization.DataTable();
    motionChartData.addColumn('number', 'Seconds');
    motionChartData.addColumn('number', 'Left motion');
    motionChartData.addColumn('number', 'Right motion');

    for (var i = 0; i < jsonData.change_in_motion_left.length || i < jsonData.change_in_motion_right.length; i++) {
        var l = (jsonData.change_in_motion_left[i] <= 0) ? 0 : jsonData.change_in_motion_left[i];
        var r = (jsonData.change_in_motion_right[i] <= 0) ? 0 : jsonData.change_in_motion_right[i];
        motionChartData.addRow([i, l, r]);
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


function loadhistory() {

    $.ajax({
        type: 'GET',
        url: "./mobileapp/datahistory.json",
        dataType: 'json',
        success: function (data) {
            console.log("in data history");
            var table_data = '';

            $.each(data, function (key, val) {
                table_data += "<tr>";
                table_data += "<td>" + val.Date + "</td>";
                table_data += "<td>" + val.Day + "</td>";
                table_data += "<td>" + val.HoursSlept + "</td>";
                table_data += "<td>" + val.Temperature + "</td>";
                table_data += "<td>" + val.Humidity + "</td>";
                table_data += "<td>" + val.REMCycletime + "</td>";
                table_data += "<td>" + val.NREMCycletime + "</td>";
                table_data += "</tr>";
            });

            $('#sleephistorytable').append(table_data);
        }
    });
}