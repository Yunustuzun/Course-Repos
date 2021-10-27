sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Label",
    "yt/demo3/lib/GoogleCharts",
], function (Control, GoogleCharts) {
    'use strict';

    return Control.extend("yt.demo3.controls.PieChart.PieChart", {

        metadata: {
            properties: {
                data: { type: "array", defaultValue: [] },
                options: { type: "object", defaultValue: {} },

                width: { type: "string", defaultValue : "" },
                height: { type: "string",  defaultValue :  "" },
            }
        },
        onInit: function (params) {

        },

        onAfterRendering: function (params) {

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(this._drawChart.bind(this));

        },
        _drawChart: function (params) {

            var chartData = this.getProperty("data");
            var chartOptions = this.getProperty("options");

            var data = google.visualization.arrayToDataTable(chartData);
            var context = this.getDomRef();

            var chart = new google.visualization.PieChart(context);

            chart.draw(data, chartOptions);
        },
        renderer: function (rm, control) {


            var hw = `width : ${control.getProperty("width")}; height : ${control.getProperty("height")} `

            
            rm.write("<div");
            rm.writeControlData(control);
            rm.writeClasses();
            rm.writeAttribute("id", control.getId() + "--customText");
            rm.writeAttribute("style", hw);
            rm.write(">");
            // rm.write("<span>HELLO WORLD</span>");
            rm.write("</div>");
        },
    })

});