function triggerHistoryCalls() {
    setTimeout(function () {
        Load1Day();
    }, 50);

    setTimeout(function () {
        Load3Day();
    }, 50);

    setTimeout(function () {
        Load7Day();
    }, 50);

    setTimeout(function () {
        LoadLastBlockTime();
    }, 50);
}

function Load1Day() {
    $("#div1DayColumnContainer").addClass("visibility-hidden");
    $("#div1DayLoading").removeClass("display-none");
    $.ajax({
        url: '/DenomEfficiency/GetStakeEfficiency/1',
        type: 'GET',
        success: function (data) {
            DenomEfficiencyChart(data, 'ctr1DayColumn', 'div1DayColumnContainer', 'div1DayLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function Load3Day() {
    $("#div3DayColumnContainer").addClass("visibility-hidden");
    $("#div3DayLoading").removeClass("display-none");
    $.ajax({
        url: '/DenomEfficiency/GetStakeEfficiency/2',
        type: 'GET',
        success: function (data) {
            DenomEfficiencyChart(data, 'ctr3DayColumn', 'div3DayColumnContainer', 'div3DayLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function Load7Day() {
    $("#div7DayColumnContainer").addClass("visibility-hidden");
    $("#div7DayLoading").removeClass("display-none");
    $.ajax({
        url: '/DenomEfficiency/GetStakeEfficiency/3',
        type: 'GET',
        success: function (data) {
            DenomEfficiencyChart(data, 'ctr7DayColumn', 'div7DayColumnContainer', 'div7DayLoading');
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