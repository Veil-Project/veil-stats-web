
function CreateDiffLineGraph(data, chartCtrID, chartContainerID, chartLoadingID) {
    var chart = new CanvasJS.Chart(chartCtrID,
        {
            animationEnabled: true,
            zoomEnabled: true,
            backgroundColor: 'transparent',
            toolTip: {
                fontFamily: "NoirPro, sans-serif",
                fontSize: 18,
                borderColor: 'rgb(128, 252, 253)',
                fontColor: 'white',
                backgroundColor: '#0d124a',
                contentFormatter: function (e) {
                    var content = " ";
                    for (var i = 0; i < e.entries.length; i++) {
                        content += "<strong>" + GetTranslationText("Script_Block") + " # " + e.entries[i].dataPoint.x + "</strong><br/>" +
                                    e.entries[i].dataPoint.label + "<br/>" +
                            GetTranslationText("Script_Difficulty") + ": " + hashHelper.formatDiff(e.entries[i].dataPoint.y);
                    }
                    return content;
                }
            },
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
                titleFontFamily: 'NoirPro, sans-serif',
                labelFontFamily: 'NoirPro, sans-serif',
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
            data: [
                {
                    type: "line",
                    lineColor: "rgb(128, 252, 253)", //**Change the color here
                    dataPoints: data
                }
            ]
        });

    ShowGraph(chartContainerID, chartLoadingID);
    chart.render();
}

function CreateMoneySupplyLineGraph(data, chartCtrID, chartContainerID, chartLoadingID) {  
    var chart = new CanvasJS.Chart(chartCtrID,
        {
            animationEnabled: true,
            zoomEnabled: true,
            backgroundColor: 'transparent',
            toolTip: {
                fontFamily: "NoirPro, sans-serif",
                fontSize: 18,
                borderColor: 'rgb(128, 252, 253)',
                fontColor: 'white',
                backgroundColor: '#0d124a',
                contentFormatter: function (e) {
                    var content = " "; 
                    for (var i = 0; i < e.entries.length; i++) {
                        content += "<strong>" + GetTranslationText("Script_Block") + " # " + e.entries[i].dataPoint.x + "</strong><br/>"
                            + e.entries[i].dataPoint.label + "<br/>" + GetTranslationText("Script_TotalSupply") + ": " +
                            e.entries[i].dataPoint.y.toLocaleString(undefined, { minimumFractionDigits: 2 });
                    }
                    return content;
                }
            },
            axisX: {
                labelFontColor: "white",
                titleFontFamily: 'NoirPro, sans-serif',
                labelFontFamily: 'NoirPro, sans-serif',
                labelAngle: 0
            },
            axisY: {
                labelFontColor: "white",
                titleFontFamily: 'NoirPro, sans-serif',
                labelFontFamily: 'NoirPro, sans-serif',
                includeZero: false
            },
            data: [
                {
                    type: "line",
                    lineColor: "rgb(128, 252, 253)", //**Change the color here
                    dataPoints: data
                }
            ]
        });

    ShowGraph(chartContainerID, chartLoadingID);
    chart.render();
}

function CreateTxCountLineGraph(data, chartCtrID, chartContainerID, chartLoadingID) {
    var chart = new CanvasJS.Chart(chartCtrID,
        {
            animationEnabled: true,
            zoomEnabled: true,
            backgroundColor: 'transparent',
            toolTip: {
                fontFamily: "NoirPro, sans-serif",
                fontSize: 18,
                borderColor: 'rgb(128, 252, 253)',
                fontColor: 'white',
                backgroundColor: '#0d124a',
                contentFormatter: function (e) {
                    var content = " ";
                    for (var i = 0; i < e.entries.length; i++) {
                        content += "<strong>" + GetTranslationText("Script_Block") + " # " + e.entries[i].dataPoint.x + "</strong><br/>"
                            + e.entries[i].dataPoint.label + "<br/>" +
                            GetTranslationText("Script_Transactions") + ": " + e.entries[i].dataPoint.y;
                    }
                    return content;
                }
            },
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
                titleFontFamily: 'NoirPro, sans-serif',
                labelFontFamily: 'NoirPro, sans-serif',
                includeZero: true
            },
            data: [
                {
                    type: "line",
                    lineColor: "rgb(128, 252, 253)", //**Change the color here
                    dataPoints: data
                }
            ]
        });

    ShowGraph(chartContainerID, chartLoadingID);
    chart.render();
}

function DenomEfficiencyChart(data, chartCtrID, chartContainerID, chartLoadingID) {
    var chart = new CanvasJS.Chart(chartCtrID,
        {
            animationEnabled: true,
            backgroundColor: 'transparent',
            toolTip: {
                fontFamily: "NoirPro, sans-serif",
                fontSize: 18,
                borderColor: 'rgb(128, 252, 253)',
                fontColor: 'white',
                backgroundColor: '#0d124a',
                shared: true,
                contentFormatter: function (e) {
                    var content = "";
                    var dSupply = 0.0;
                    var dStake = 0.0;
                    var szSeriesName = ""
                    content += "<div class='text-center' style='background-color: rgb(128, 252, 253); color:#0d124a'>" + e.entries[0].dataPoint.label + "</div>";
                    for (var i = 0; i < e.entries.length; i++) {
                        if (i == 0) {
                            dSupply = e.entries[i].dataPoint.y
                            szSeriesName = GetTranslationText("Script_SupplyDistribution");
                        } else {
                            dStake = e.entries[i].dataPoint.y
                            szSeriesName = GetTranslationText("Script_RewardDistribution");
                        }
                        content += szSeriesName + ": " + e.entries[i].dataPoint.y + "%";
                        content += "<br/>";
                    }

                    var dEfficiency = parseFloat(((dStake / dSupply) * 100).toFixed(2));
                    var szClass = dEfficiency > 100 ? "color-lime" : "color-orangered";
                    content += GetTranslationText("Script_Efficiency") + ": <span class='" + szClass + "'>" + dEfficiency + "%</span>";
                    return content;
                }
            },
            legend: {
                cursor: "pointer",
                fontColor: "white",
                fontFamily: 'NoirPro, sans-serif',
                fontWeight: 'normal'

            },
            axisX: {
                labelFontColor: "white",
                titleFontFamily: 'NoirPro, sans-serif',
                labelFontFamily: 'NoirPro, sans-serif',
            },
            axisY: [{
                title: GetTranslationText("Script_SupplyDistribution"),
                labelFontColor: "white",
                labelFontFamily: 'NoirPro, sans-serif',
                titleFontColor: "white",
                titleFontFamily: 'NoirPro, sans-serif',
                includeZero: false,
                suffix: "%",
                maximum: 80,
                interval: 10
            }],
            axisY2: [{
                title: GetTranslationText("Script_RewardDistribution"),
                labelFontColor: "white",
                labelFontFamily: 'NoirPro, sans-serif',
                titleFontColor: "white",
                titleFontFamily: 'NoirPro, sans-serif',
                includeZero: false,
                suffix: "%",
                axisYIndex: 1, //defaults to 0
                maximum: 80,
                interval: 10
            }
            ],
            data: [{
                type: "column",
                legendText: GetTranslationText("Script_SupplyDistribution"),
                name: "Supply Distribution",
                showInLegend: true,
                color: "rgb(128, 252, 253)",
                dataPoints: data.SupplyData,
                axisYIndex: 1
            },
            {
                type: "column",
                legendText: GetTranslationText("Script_RewardDistribution"),
                name: "Reward Distribution",
                showInLegend: true,
                axisYType: "secondary",
                color: "rgb(16, 90, 239)",
                dataPoints: data.StakeData,
                axisYIndex: 1
            }]

        });

    ShowGraph(chartContainerID, chartLoadingID);
    chart.render();
}
