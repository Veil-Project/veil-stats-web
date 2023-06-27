function toggleMonthly() {
    document.getElementById("lblDailyVeil").style = "display:none";
    document.getElementById("lblWeeklyVeil").style = "display:none";
    document.getElementById("lblMonthlyVeil").style = "";
}

function toggleWeekly() {
    document.getElementById("lblDailyVeil").style = "display:none";
    document.getElementById("lblMonthlyVeil").style = "display:none";
    document.getElementById("lblWeeklyVeil").style = "";
}
function toggleDaily() {
    document.getElementById("lblMonthlyVeil").style = "display:none";
    document.getElementById("lblWeeklyVeil").style = "display:none";
    document.getElementById("lblDailyVeil").style = "";
}


$(document).ready(function () {
    $(".btn-primary").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(".btn-primary").removeClass("btn-cta");
        $(this).addClass("btn-cta");
        $(this).blur();
        var range = $(this).data('range');
        if ($(this).data('type') === 3) {
            toggleMonthly();
        } else if ($(this).data('type') === 2) {
            toggleWeekly();
        }
        else {
            toggleDaily();
        }
    });
});

function triggerCalls() {
    setTimeout(function () {
        LoadSkateAData();
    }, 20); // milliseconds
}

function LoadSkateAData() {
    $.ajax({
        url: '/StakeRoi/GetStakeA',
        type: 'GET',
        success: function (data) {
            $("#lblDailyTotalZerocoins").text(data.ZerocoinAmount.toLocaleString());
            $("#lblDailyBlocks").text(data.PosBlocks.toLocaleString());
            $("#lblDailyVeil").text(data.DailyVeil.toLocaleString());
            $("#lblWeeklyVeil").text(data.WeeklyVeil.toLocaleString());
            $("#lblMonthlyVeil").text(data.MonthlyVeil.toLocaleString());
            $("#spanAllMaLastUpdated").text(data.LastUpdate);
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

