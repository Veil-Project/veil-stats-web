$(document).ready(function () {
    $(".btn-primary").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(this).siblings().removeClass("btn-cta");
        $(this).addClass("btn-cta");
        $(this).blur();
        var range = $(this).data('range');
        if ($(this).data('type') === 1) {
            LoadTxCountLine(range);
        } else if ($(this).data('type') === 2) {
            LoadDailyTxCountLine(range);
        }
    });
});


function triggerTransactionCalls() {
    setTimeout(function () {
        LoadTxCountLine(1);
    }, 20);

    setTimeout(function () {
        LoadDailyTxCountLine(1);
    }, 20);

    setTimeout(function () {
        LoadLastBlockTime();
    }, 20);
}


function LoadTxCountLine(range) {
    $("#divTxCountLineContainer").addClass("visibility-hidden");
    $("#divTxCountLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Charts/GetTxCount/' + range,
        type: 'GET',
        success: function (data) {
            CreateTxCountLineGraph(data, 'ctrTxCountLine', 'divTxCountLineContainer', 'divTxCountLineLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}


function LoadDailyTxCountLine(range) {
    $("#divDailyTxCountLineContainer").addClass("visibility-hidden");
    $("#divDailyTxCountLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Transactions/GetDailyTxCount/' + range,
        type: 'GET',
        success: function (data) {
            TxMovingAverageGraph(data, 'ctrDailyTxCountLine', 'divDailyTxCountLineContainer', 'divDailyTxCountLineLoading');
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