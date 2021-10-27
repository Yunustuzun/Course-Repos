/* global Chart */
sap.ui.define([
    "sap/ui/core/Control",
    "yt/demo1/control/GoogleChart/lib/GoogleChart"
], function (Control, GoogleChartJS) {
    "use strict";

    var DonutChart = Control.extend("yt.demo1.control.DonutChart", {

        metadata: {

            properties: {
                "data": {
                    type: "array",
                    defaultValue: []
                },
                "options": {
                    type: "object",
                    defaultValue: {}
                }
            }
        },

        init: function () {
        },

        onAfterRendering: function () {
            var radarData = {
                labels: [],
                datasets: []
            };

            var dataProperty = this.getProperty("data");
            var optionsProperty = this.getProperty("options");

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart.bind(this));

            function drawChart() {

                var data = google.visualization.arrayToDataTable(dataProperty);


                var context = this.getDomRef();

                var chart = new google.visualization.PieChart(context);

                chart.draw(data, optionsProperty);
            }

        },

        renderer: function (rm, control) {
            rm.write("<div");
            rm.writeControlData(control);
            rm.writeClasses();
            rm.writeAttribute("id", control.getId() + "--googlechart");
            rm.writeAttribute("width", "1200px");
            rm.writeAttribute("height", "900px");
            rm.write(">");
            rm.write("</div>");
        }

    });


    return DonutChart;


}, /* bExport= */ true);