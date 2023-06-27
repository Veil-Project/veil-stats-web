$(document).ready(function () {
    $(".btn-primary").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(this).siblings().removeClass("btn-cta");
        $(this).addClass("btn-cta");
        $(this).blur();
        var range = $(this).data('range');
        if ($(this).data('type') === 1) {
            LoadPosLine(range);
        } else if ($(this).data('type') === 2) {
            LoadPowLine(range);
        } else if ($(this).data('type') === 3) {
            LoadBlockSplitLine(range);
        } else if ($(this).data('type') === 4) {
            LoadMoneySupplyLine(range);
        } else if ($(this).data('type') === 5) {
            LoadBlockSplitPercentLine(range);
        }
    });
});

function triggerHistoryCalls() {
    setTimeout(function () {
        LoadPosLine(1);
    }, 20);

    setTimeout(function () {
        LoadPowLine(1);
    }, 20);

    setTimeout(function () {
        LoadBlockSplitLine(1);
    }, 20);

    setTimeout(function () {
        LoadBlockSplitPercentLine(1);
    }, 20);


    setTimeout(function () {
        LoadMoneySupplyLine(1);
    }, 20);

    setTimeout(function () {
        LoadLastBlockTime();
    }, 20);
}

function LoadPowLine(range) {
    $("#divPowDiffLineContainer").addClass("visibility-hidden");
    $("#divPowDiffLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Charts/GetPowDiff/' + range,
        type: 'GET',
        success: function (data) {
            DiffMovingAverageGraph(data, 'ctrPowDiffLine', 'divPowDiffLineContainer', 'divPowDiffLineLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadPosLine(range) {
    $("#divPosDiffLineContainer").addClass("visibility-hidden");
    $("#divPosDiffLineLoading").removeClass("display-none");

    $.ajax({
        url: '/Charts/GetPosDiff/' + range,
        type: 'GET',
        success: function (data) {
            DiffMovingAverageGraph(data, 'ctrPosDiffLine', 'divPosDiffLineContainer', 'divPosDiffLineLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadMoneySupplyLine(range) {
    $("#divMoneySupplyLineContainer").addClass("visibility-hidden");
    $("#divMoneySupplyLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Charts/GetMoneySupply/' + range,
        type: 'GET',
        success: function (data) {
            CreateMoneySupplyLineGraph(data, 'ctrMoneySupplyLine', 'divMoneySupplyLineContainer', 'divMoneySupplyLineLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadBlockSplitLine(range) {
    $("#divBlockSplitLineContainer").addClass("visibility-hidden");
    $("#divBlockSplitLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Charts/GetBlockSplit/' + range,
        type: 'GET',
        success: function (data) {
            VeilStackAreaChartMultiSeries(data, 'ctrBlockSplitLine', 'divBlockSplitLineContainer', 'divBlockSplitLineLoading',
                                            'spanBlockSplitLastUpdated','', false);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadBlockSplitPercentLine(range) {
    $("#divBlockSplitPercentLineContainer").addClass("visibility-hidden");
    $("#divBlockSplitPercentLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Charts/GetBlockSplitPercent/' + range,
        type: 'GET',
        success: function (data) {
            VeilStackAreaChartMultiSeries(data, 'ctrBlockSplitPercentLine', 'divBlockSplitPercentLineContainer', 'divBlockSplitPercentLineLoading',
                                          'spanBlockSplitPercentLastUpdated','%', true);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadLastBlockTime() {
    $.ajax({
        url: '/Home/GetLiveData',
        type: 'GET',
        success: function (data) {
            $('.last-update-text').each(function (i, obj) {
                $(this).text(data.CurrentBlock.Date + ' ' + data.CurrentBlock.Time);
            });
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}