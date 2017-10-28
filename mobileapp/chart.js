// Draw the chart and set the chart values
function drawChart() {

    $.ajax({
        url: "https://4cx9iq8gdb.execute-api.us-east-1.amazonaws.com/test_api",
        dataType: "json",
        cors: true,
        success: function (jsonData) {
            //debugger;
            var status = jsonData.turn_on;
            if( status=== false)
            {

            } else {
                
            }
            var lineChartData = new google.visualization.DataTable();
            // columns head
            lineChartData.addColumn('string', 'avg_sleep_days');
            lineChartData.addColumn('number', 'Hours');
            // rows data
            lineChartData.addRow(['Monday', jsonData.result.avg_sleep_days[0]]);
            lineChartData.addRow(['Tuesday', jsonData.result.avg_sleep_days[1]]);
            lineChartData.addRow(['Wednesday', jsonData.result.avg_sleep_days[2]]);
            lineChartData.addRow(['Thursday', jsonData.result.avg_sleep_days[3]]);
            lineChartData.addRow(['Friday', jsonData.result.avg_sleep_days[4]]);
            lineChartData.addRow(['Saturday', jsonData.result.avg_sleep_days[5]]);
            lineChartData.addRow(['Sunday', jsonData.result.avg_sleep_days[6]]);

            var lineChartOptions = {
                title: 'Average Sleep',
                width: '100%',
                height: '100%',
                legend: 'none',
            };

            var lineChart = new google.visualization.LineChart(document.getElementById('linechart'));
            lineChart.draw(lineChartData, lineChartOptions);

            var columnChartData = new google.visualization.DataTable();
            // columns head
            columnChartData.addColumn('string', 'Day');
            columnChartData.addColumn('number', 'Hours');
            // rows data
            columnChartData.addRow(['Day1', jsonData.result.last_seven_days[0]]);
            columnChartData.addRow(['Day2', jsonData.result.last_seven_days[1]]);
            columnChartData.addRow(['Day3', jsonData.result.last_seven_days[2]]);
            columnChartData.addRow(['Day4', jsonData.result.last_seven_days[3]]);
            columnChartData.addRow(['Day5', jsonData.result.last_seven_days[4]]);
            columnChartData.addRow(['Day6', jsonData.result.last_seven_days[5]]);
            columnChartData.addRow(['Day7', jsonData.result.last_seven_days[6]]);

            var columnChartOptions = {
                title: 'Average Sleep',
                backgroundColor: '#FEF8F4',
                width: '100%',
                height: '100%',
                bar: {groupWidth: "35%"},
                legend: 'none',
            };
            var columnChart = new google.visualization.ColumnChart(document.getElementById('columnchart'));
            columnChart.draw(columnChartData, columnChartOptions);

        }
    });
}


