CanvasJS.addColorSet('zeropie',
    [
        'rgb(16, 90, 239)',
        'rgb(57, 145, 201)',
        'silver',
        'rgb(128, 252, 253)'
    ]); 

function explodePie(e) {
    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();

}

function CreatePieGraph(data, chartCtrID, chartContainerID, chartLoadingID) {
    var chart = new CanvasJS.Chart(chartCtrID, {
        animationEnabled: true,
        backgroundColor: 'transparent',
        responsive: true,
        startAngle: 90,
        colorSet: "zeropie",
        legend: {
            cursor: "pointer",
            itemclick: explodePie,
            horizontalAlign: "center",
            verticalAlign: "top",
            fontColor: "lightgrey",
            fontSize: 18,
            fontFamily: 'NoirPro, sans-serif',
            fontWeight: 400
            
        },
        toolTip: {
            fontFamily: "NoirPro, sans-serif",
            fontSize: 18,
            borderColor: 'rgb(128, 252, 253)',
            fontColor: 'white',
            backgroundColor: '#0d124a',
            shared: true

        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}",
            indexLabel: "#percent%",
            indexLabelFontColor: "white",
            indexLabelFontFamily: "NoirPro, sans-serif",
            indexLabelFontWeight: 400,
            indexLabelFontSize: 18,
            dataPoints: data
        }]
    });

    ShowGraph(chartContainerID, chartLoadingID);
    chart.render();

}
