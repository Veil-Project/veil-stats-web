$(document).ready(function () {
    $(".btn-primary").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(".btn-primary").removeClass("btn-cta");
        $(this).addClass("btn-cta");
        $(this).blur();
        var range = $(this).data('range');
        if ($(this).data('type') === 1) {
            LoadAllMA(range);
        }
    });
});


function triggerStakeDistributionCalls() {
    setTimeout(function () {
        LoadAllMA(1);
    }, 50);
}

function LoadAllMA(range) {
    $("#divAllMaLineContainer").addClass("visibility-hidden");
    $("#divAllMaLineLoading").removeClass("display-none");
    $.ajax({
        url: '/StakeDistribution/GetEfficiency/' + range,
        type: 'GET',
        success: function (data) {
            DenomEfficiencyGraph(data, 'ctrAllMaLine', 'divAllMaLineContainer', 'divAllMaLineLoading', 'spanAllMaLastUpdated');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}