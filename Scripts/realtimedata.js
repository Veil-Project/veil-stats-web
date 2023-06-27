function triggerCalls() {
    setTimeout(function () {
        LoadRealTimeData();
    }, 20); // milliseconds

    setTimeout(function () {
        LoadPriceData();
    }, 20); // milliseconds    

    setTimeout(function () {
        LoadBlockTypeCount();
    }, 20); // milliseconds 
}


function LoadRealTimeData() {
    $.ajax({
        url: '/Home/GetLiveData',
        type: 'GET',
        success: function (data) {
            $("#divBlockNumber").text(data.CurrentBlock.Id.toLocaleString());
            $("#divBlockDate").text(data.CurrentBlock.Date);
            $("#divBlockTime").text(data.CurrentBlock.Time);
            $("#divProgPowDiff").text(hashHelper.formatDiff(data.CurrentProgpowDiff.diff).toLocaleString());
            $("#divRandomXDiff").text(hashHelper.formatDiff(data.CurrentRandomXDiff.diff).toLocaleString());
            $("#divSHA256dDiff").text(hashHelper.formatDiff(data.CurrentShaDiff.diff).toLocaleString());
            $("#divPoSDiff").text(hashHelper.formatDiff(data.CurrentPos.diff).toLocaleString());            

            CreatePieGraph(data.VeilSupply, 'ctrVeilSupplyPie', 'divVeilSupplyPieContainer','divVeilSupplyPieLoading')
            CreatePieGraph(data.ZeroSupply, 'ctrZeroSupplyPie', 'divZeroSupplyPieContainer', 'divZeroSupplyPieLoading')
   
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadPriceData() {
    $.ajax({
        url: '/Home/GetPriceData',
        type: 'GET',
        success: function (data) {
            $("#divPriceCardLoading").addClass("display-none");
            $("#divPriceCard").removeClass("display-none");

            $("#lblUsdPrice").text(hashHelper.formatToFixed5(data.veil.usd));
            $("#lblEurPrice").text(hashHelper.formatToFixed5(data.veil.eur));
            $("#lblBtcPrice").text(hashHelper.formatToFixed8(data.veil.btc));
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadBlockTypeCount() {
    $.ajax({
        url: '/Home/GetBlockCount',
        type: 'GET',
        success: function (data) {
            $("#divPosBlockCount").text(data.PosBlocks.toLocaleString());
            $("#divPowBlockCount").text(data.PowBlocks.toLocaleString());
            $("#divPosBlockCount24hr").text(data.PosBlocks24hr.toLocaleString());
            $("#divPowBlockCount24hr").text(data.PowBlocks24hr.toLocaleString());
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}


function LoadSupplyGraph(data) {
    var ctx = document.getElementById('ctrZeroSupplyPie').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: ['Zerocoin', 'Other'],
            datasets: [{
                backgroundColor: [
                    'rgb(128, 252, 253)',
                    'rgb(16, 90, 239)'
                ],
                borderColor: 'rgb(8 11 46)',
                data: data
            }]
        },

        // Configuration options go here
        options: {
            rotation: 90,
            legend: {
                labels: {
                    fontFamily: 'NoirPro, sans-serif',
                    fontColor: "lightgrey",
                    fontSize: 16
                }
            },
            tooltips: {
                titleFontFamily: 'NoirPro, sans-serif',
                bodyFontFamily: 'NoirPro, sans-serif',
                footerFontFamily: 'NoirPro, sans-serif',
                bodyFontSize: 16,
                displayColors: false,
                callbacks: {
                    label: function (tooltipItems, data) {
                        return data.datasets[0].data[tooltipItems.index] + '%';
                    }
                }
            },
            showAllTooltips: true
        }
    });
}

function LoadDenomGraph(data) {
    var denoms = [];
    data.forEach(function (element, i) {
        denoms.push(toCleanPercent(element.percentOfSupply));
    });

    var ctx1 = document.getElementById('ctrZeroDenomPie').getContext('2d');
    var chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: ['10', '100', '1000', '10000'],
            datasets: [{
                backgroundColor: [
                    'rgb(16, 90, 239)',
                    'rgb(57, 145, 201)',
                    'silver',
                    'rgb(128, 252, 253)'
                    
                ],
                borderColor: 'rgb(8 11 46)',
                data: denoms
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontFamily: 'NoirPro, sans-serif',
                    fontColor: "lightgrey",
                    fontSize: 20
                }
            },
            tooltips: {
                titleFontFamily: 'NoirPro, sans-serif',
                bodyFontFamily: 'NoirPro, sans-serif',
                footerFontFamily: 'NoirPro, sans-serif',
                bodyFontSize: 16,
                displayColors: false,
                callbacks: {
                    label: function (tooltipItems, data) {
                        return data.datasets[0].data[tooltipItems.index] + '%';
                    }
                }
            },
            showAllTooltips: true
        }
    });
}

function toCleanPercent(value) {
    return parseFloat((value).toFixed(2))
}