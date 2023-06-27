function DenomEfficiencyGraph(data, chartCtrID, chartContainerID, chartLoadingID, lastUpdatedID) {
    $("#" + lastUpdatedID).html(data.Efficiency.LastBlockTime);
    debugger;
    var chart1 = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: 'transparent',
        axisX: {
            labelFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            labelFontFamily: 'NoirPro, sans-serif',
            labelAngle: 0,
            labelFormatter: function (e) {
                try {
                    if (e.label == null) { return; }
                    var characterLimit = 7;
                    if (e.label.length >= characterLimit) {
                        return e.label.slice(0, e.label.length).substring(0, characterLimit - 1).trim();
                    }
                }
                catch (ex) {
                }
                return e.label;
            }
        },
        axisY: {
            title: GetTranslationText("Script_Efficiency"),
            suffix: "%",
            labelFontColor: "white",
            labelFontFamily: 'NoirPro, sans-serif',
            titleFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            includeZero: false
        },
        toolTip: {
            shared: true,
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            backgroundColor: '#0d124a',
            fontFamily: "NoirPro, sans-serif",
            fontColor: "white",
            contentFormatter: function (e) {
                var content = "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'> " + GetTranslationText("Script_Efficiency") + " </div>";
                for (var i = 0; i < e.entries.length; i++) {
                    var szColor = "rgb(128, 252, 253)";
                    if (i == 1) {
                        szColor = "silver";
                    } else if (i == 2) {
                        szColor = "rgb(57, 145, 201)";
                    } else if (i == 3) {
                        szColor = "rgb(16, 90, 239)";
                    }
                    content += "<span style='color: " + szColor + ";'>" + e.entries[i].dataSeries.name + "</span>: ";

                    var szClass = e.entries[i].dataPoint.y > 100 ? "color-lime" : "color-orangered";
                    content += "<span class='" + szClass + "'>" + e.entries[i].dataPoint.y + "%</span>"; + "%";
                    content += "<br/>";
                }
                content += "<div style='padding-top:5px;'><strong>" + GetTranslationText("Script_Block") + " # " + e.entries[0].dataPoint.x + "</strong></div>"
                content += "<div>" + e.entries[0].dataPoint.label + " </div>";

                return content;
            }
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            fontColor: "white",
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 'normal',
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            name: "10000",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Efficiency.Series4,
            lineColor: "rgb(128, 252, 253)",
            color: "rgb(128, 252, 253)"
        },
        {
            type: "line",
            name: "1000",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Efficiency.Series3,
            lineColor: "silver",
            color: "silver",
            markerColor: "silver"
        },
        {
            type: "line",
            name: "100",
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Efficiency.Series2,
            lineColor: "rgb(57, 145, 201)",
            color: "rgb(57, 145, 201)",
            markerColor: "rgb(57, 145, 201)"
        },
        {
            type: "line",
            name: "10",
            showInLegend: true,
            markerSize: 0,
            visible: true,
            yValueFormatString: "#,###.00",
            dataPoints: data.Efficiency.Series1,
            lineColor: "rgb(16, 90, 239)",
            color: "rgb(16, 90, 239)",
            markerColor: "rgb(16, 90, 239)"
        }]
    });

    ShowGraph(chartContainerID, chartLoadingID);
    chart1.render();
}

function DiffMovingAverageGraph(data, chartCtrID, chartContainerID, chartLoadingID, lastUpdatedID) {
    $("#" + lastUpdatedID).html(data.LastBlockTime);
    var chart = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: 'transparent',
        axisX: {
            labelFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            labelFontFamily: 'NoirPro, sans-serif',
            labelAngle: 0,
            labelFormatter: function (e) {
                try {
                    if (e.label == null) { return; }
                    var characterLimit = 12;
                    if (e.label.length >= characterLimit) {
                        return e.label.slice(0, e.label.length).substring(0, characterLimit - 1).trim();
                    }
                }
                catch (ex) {
                }
                return e.label;
            }
        },
        axisY: {
            labelFontColor: "white",
            labelFontFamily: 'NoirPro, sans-serif',
            titleFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            includeZero: false,
            labelFormatter: function (e) {
                try {
                    if (e.value == null) { return; }
                    return hashHelper.formatDiff(e.value);
                }
                catch (ex) {
                }
                return e.value;
            }
        },
        toolTip: {
            shared: true,
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            backgroundColor: '#0d124a',
            fontFamily: "NoirPro, sans-serif",
            fontColor: "white",
            contentFormatter: function (e) {
                var content = "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'> " + GetTranslationText("Script_Difficulty") + " </div>";
                var szSeriesName = GetTranslationText("Script_Live");
                for (var i = 0; i < e.entries.length; i++) {
                    var szColor = "silver";
                    if (i == 1) {
                        szColor = "rgb(16, 90, 239)";
                        szSeriesName = GetTranslationText("Script_0_5DayMA");
                    } else if (i == 2) {
                        szColor = "rgb(128, 252, 253)";
                        szSeriesName = GetTranslationText("Script_1DayMA");
                    } else if (i == 3) {
                        szColor = "rgb(57, 145, 201)";
                        szSeriesName = GetTranslationText("Script_3DayMA");
                    }
                    content += "<span style='color: " + szColor + ";'>" + szSeriesName + "</span>: ";
                    content += "<span>" + hashHelper.formatDiff(e.entries[i].dataPoint.y) + "</span>"; + "%";
                    content += "<br/>";
                }
                content += "<div style='padding-top:5px;'><strong>" + GetTranslationText("Script_Block") + " # " + e.entries[0].dataPoint.x + "</strong></div>"
                content += "<div>" + e.entries[0].dataPoint.label + " </div>";

                return content;
            }
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            fontColor: "white",
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 'normal',
            itemclick: toogleDataSeries
        },
        data: [{
            type: "area",
            name: GetTranslationText("Script_Live"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series1,
            lineColor: "silver",
            color: "#585858",
            markerColor: "silver"
        },
        {
            type: "line",
            name: GetTranslationText("Script_0_5DayMA"),
            lineThickness: 3,
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series2,
            lineColor: "rgb(16, 90, 239)",
            color: "rgb(16, 90, 239)",
            markerColor: "rgb(16, 90, 239)"
        },
        {
            type: "line",
            name: GetTranslationText("Script_1DayMA"),
            lineThickness: 3,
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series3,
            lineColor: "rgb(128, 252, 253)",
            color: "rgb(128, 252, 253)",
            markerColor: "rgb(128, 252, 253)"
        },
        {
            type: "line",
            name: GetTranslationText("Script_3DayMA"),
            lineThickness: 3,
            showInLegend: true,
            markerSize: 0,
            visible: false,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series4,
            lineColor: "rgb(57, 145, 201)",
            color: "rgb(57, 145, 201)",
            markerColor: "rgb(57, 145, 201)"
        }]
    });
    chart.render();
    ShowGraph(chartContainerID, chartLoadingID);

}

function TxMovingAverageGraph(data, chartCtrID, chartContainerID, chartLoadingID, lastUpdatedID) {
    $("#" + lastUpdatedID).html(data.LastBlockTime);
    var chart = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: 'transparent',
        axisX: {
            labelFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            labelFontFamily: 'NoirPro, sans-serif',
            labelAngle: 0
            //labelFormatter: function (e) {
            //    try {
            //        if (e.label == null) { return; }
            //        var characterLimit = 7;
            //        if (e.label.length >= characterLimit) {
            //            return e.label.slice(0, e.label.length).substring(0, characterLimit - 1).trim();
            //        }
            //    }
            //    catch (ex) {
            //    }
            //    return e.label;
            //}
        },
        axisY: {
            labelFontColor: "white",
            labelFontFamily: 'NoirPro, sans-serif',
            titleFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            includeZero: false,
            labelFormatter: function (e) {
                try {
                    if (e.value == null) { return; }
                    return hashHelper.formatDiff(e.value);
                }
                catch (ex) {
                }
                return e.value;
            }
        },
        toolTip: {
            shared: true,
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            backgroundColor: '#0d124a',
            fontFamily: "NoirPro, sans-serif",
            fontColor: "white",
            contentFormatter: function (e) {
                var content = "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'> " + GetTranslationText("Script_Transactions") + " </div>";
                for (var i = 0; i < e.entries.length; i++) {
                    var szColor = "silver";
                    if (i == 1) {
                        szColor = "rgb(128, 252, 253)";
                    }
                    content += "<span style='color: " + szColor + ";'>" + e.entries[i].dataSeries.name + "</span>: ";
                    content += "<span>" + hashHelper.formatDiff(e.entries[i].dataPoint.y) + "</span>"; + "%";
                    content += "<br/>";
                }
                content += "<div style='padding-top:5px;'><strong>" + GetTranslationText("Script_Block") + " # " + e.entries[0].dataPoint.x + "</strong></div>"
                content += "<div>" + e.entries[0].dataPoint.label + " </div>";
                return content;
            }
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            fontColor: "white",
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 'normal',
            itemclick: toogleDataSeries
        },
        data: [{
            type: "area",
            name: GetTranslationText("Script_0_5DayMA"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series1,
            lineColor: "silver",
            color: "#585858",
            markerColor: "silver"
        },
        {
            type: "line",
            name: GetTranslationText("Script_7DayMA"),
            lineThickness: 3,
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series2,
            lineColor: "rgb(128, 252, 253)",
            color: "rgb(128, 252, 253)",
            markerColor: "rgb(128, 252, 253)"
        }]
    });
    chart.render();
    ShowGraph(chartContainerID, chartLoadingID);
}

function VeilLineChartMultiSeriesInteger(data, chartCtrID, chartContainerID, chartLoadingID, lastUpdatedID, dataSeriesIcon) {
    $("#" + lastUpdatedID).html(data.LastBlockTime);
    var chart = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: 'transparent',
        axisX: {
            labelFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            labelFontFamily: 'NoirPro, sans-serif',
            labelAngle: 0,
            labelFormatter: function (e) {
                try {
                    if (e.label == null) { return; }
                    var characterLimit = 7;
                    if (e.label.length >= characterLimit) {
                        return e.label.slice(0, e.label.length).substring(0, characterLimit - 1).trim();
                    }
                }
                catch (ex) {
                }
                return e.label;
            }
        },
        axisY: {
            labelFontColor: "white",
            labelFontFamily: 'NoirPro, sans-serif',
            titleFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            includeZero: false,
            labelFormatter: function (e) {
                try {
                    if (e.value == null) { return; }
                    return hashHelper.formatDiff(e.value) + dataSeriesIcon;
                }
                catch (ex) {
                }
                return e.value;
            }
        },
        toolTip: {
            shared: true,
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            backgroundColor: 'transparent',
            fontFamily: "NoirPro, sans-serif",
            fontColor: "white",
            contentFormatter: function (e) {
                var content = "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'> " + GetTranslationText("Script_PowPosSplit") + "  </div>";
                for (var i = 0; i < e.entries.length; i++) {
                    var szColor = "silver";
                    if (i == 1) {
                        szColor = "rgb(128, 252, 253)";
                    }
                    content += "<span style='color: " + szColor + ";'>" + e.entries[i].dataSeries.name + "</span>: ";
                    content += "<span>" + hashHelper.formatDiff(e.entries[i].dataPoint.y) + dataSeriesIcon + "</span>";
                    content += "<br/>";
                }
                content += "<div style='padding-top:5px;'><strong>" + GetTranslationText("Script_Block") + " # " + e.entries[0].dataPoint.x + "</strong></div>"
                content += "<div>" + e.entries[0].dataPoint.label + " </div>";

                return content;
            }
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            fontColor: "white",
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 'normal',
            itemclick: toogleDataSeries
        },
        data: [{
            type: "stackedArea100",
            name: GetTranslationText("Script_PowBlocks"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series1,
            lineColor: "silver",
            color: "#585858",
            markerColor: "silver"
        },
        {
            type: "stackedArea100",
            name: GetTranslationText("Script_PosBlocks"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series2,
            lineColor: "rgb(128, 252, 253)",
            color: "rgb(128, 232, 233)",
            markerColor: "rgb(128, 252, 253)"
        }]
    });
    chart.render();
    ShowGraph(chartContainerID, chartLoadingID);
}

function VeilStackAreaChartMultiSeries(data, chartCtrID, chartContainerID, chartLoadingID, lastUpdatedID, dataSeriesIcon, stackChart) {
    $("#" + lastUpdatedID).html(data.LastBlockTime);
    var szChartType = 'area';
    if (stackChart == true) {
        szChartType = 'stackedArea100';
    }
    var chart = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        zoomEnabled: true,
        backgroundColor: 'transparent',
        rangeChanged: stackChart ? rangeChanged : null,
        axisX: {
            labelFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            labelFontFamily: 'NoirPro, sans-serif',
            labelAngle: 0,
            labelFormatter: function (e) {
                try {
                    if (e.label == null) { return; }
                    var characterLimit = 7;
                    if (e.label.length >= characterLimit) {
                        return e.label.slice(0, e.label.length).substring(0, characterLimit - 1).trim();
                    }
                }
                catch (ex) {
                }
                return e.label;
            }
        },
        axisY: {
            labelFontColor: "white",
            labelFontFamily: 'NoirPro, sans-serif',
            titleFontColor: "white",
            titleFontFamily: 'NoirPro, sans-serif',
            includeZero: false,
            labelFormatter: function (e) {
                try {
                    if (e.value == null) { return; }
                    return hashHelper.formatDiff(e.value) + dataSeriesIcon;
                }
                catch (ex) {
                }
                return e.value;
            }
        },
        toolTip: {
            shared: true,
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            backgroundColor: '#0d124a',
            fontFamily: "NoirPro, sans-serif",
            fontColor: "white",
            contentFormatter: function (e) {
                var content = "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'> " + GetTranslationText("Script_PowPosSplit") + " </div>";
                for (var i = 0; i < e.entries.length; i++) {
                    var szColor = "silver";
                    if (i == 1) {
                        szColor = "rgb(128, 252, 253)";
                    }
                    content += "<span style='color: " + szColor + ";'>" + e.entries[i].dataSeries.name + " (24hr)</span>: ";
                    content += "<span>" + hashHelper.formatDiff(e.entries[i].dataPoint.y) + dataSeriesIcon + "</span>";
                    content += "<br/>";
                }
                content += "<div style='padding-top:5px;'><strong>" + GetTranslationText("Script_Block") + " # " + e.entries[0].dataPoint.x + "</strong></div>"
                content += "<div>" + e.entries[0].dataPoint.label + " </div>";

                return content;
            }
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: false,
            fontColor: "white",
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 'normal',
            itemclick: (!stackChart ? toogleDataSeries: null)
        },
        data: [{
            type: szChartType,
            name: GetTranslationText("Script_PowBlocks"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series1,
            lineColor: "silver",
            color: "#585858",
            markerColor: "silver"
        },
        {
            type: szChartType,
            name: GetTranslationText("Script_PosBlocks"),
            showInLegend: true,
            markerSize: 0,
            yValueFormatString: "#,###.00",
            dataPoints: data.Series2,
            lineColor: "rgb(128, 252, 253)",
            color: "rgb(128, 232, 233)",
            markerColor: "rgb(128, 252, 253)"
        }]
    });

    chart.render();
    if (stackChart == true) {
        changeAxisMinimum(chart);
    }
    ShowGraph(chartContainerID, chartLoadingID);
}

function rangeChanged(e) {
    rangeChangeZoom(e.chart, e.axisX[0].viewportMinimum, e.axisX[0].viewportMaximum);
}



function toogleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function rangeChangeZoom(chart, minZoomPoint, maxZoomPoint) {
    debugger;
    var minY = 100.0;
    var maxY = 1.0;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
        if (chart.data[0].dataPoints[i].x >= minZoomPoint && maxZoomPoint <= chart.data[0].dataPoints[i].x) {
            if (chart.data[0].dataPoints[i].y < minY) {               
                minY = chart.data[0].dataPoints[i].y
            }            

            if (chart.data[0].dataPoints[i].y > maxY) {
                maxY = chart.data[0].dataPoints[i].y;
            }
        }
    }
    var datasetPadding = (maxY - minY) * .12;
    chart.axisY[0].set("minimum", minY - datasetPadding);
    chart.axisY[0].set("maximum", maxY + datasetPadding);
    chart.render();
}

function changeAxisMinimum(chart) {
    var minY = 100.0;
    var maxY = 1.0;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
        if (chart.data[0].dataPoints[i].y < minY) {
            minY = chart.data[0].dataPoints[i].y;
        }
        if (chart.data[0].dataPoints[i].y > maxY) {
            maxY = chart.data[0].dataPoints[i].y;
        }
    }
    var datasetPadding = (maxY - minY) * .08;
    chart.axisY[0].set("minimum", minY - datasetPadding);
    chart.axisY[0].set("maximum", maxY + datasetPadding);
    chart.render();
}