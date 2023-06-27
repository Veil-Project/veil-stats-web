$(document).ready(function () {
    $(".btn-primary").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        $(this).siblings().removeClass("btn-cta");
        $(this).addClass("btn-cta");
        $(this).blur();
        var range = $(this).data('range');
        if ($(this).data('type') === 1) {
            LoadDiffLine(range);
        } else if ($(this).data('type') === 2) {
            LoadSeqLine(range);
        } 
    });
});

function triggerLoad() {
    setTimeout(function () {
        LoadDiffLine(1);
    }, 20);

    //setTimeout(function () {
    //    LoadSeqLine(1);
    //}, 20);    
}

function LoadDiffLine(range) {
    $("#divDiffLineContainer").addClass("visibility-hidden");
    $("#divDiffLineLoading").removeClass("display-none");
    $.ajax({
        url: '/Sha/GetDiff/' + range,
        type: 'GET',
        success: function (data) {
            DiffMovingAverageGraph(data, 'ctrDiffLine', 'divDiffLineContainer', 'divDiffLineLoading');
            $('.last-update-text').each(function (i, obj) {
                $(this).text(data.LastBlockTime);
            });
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function LoadSeqLine(range) {
    $("#divSeqLineContainer").addClass("visibility-hidden");
    $("#divSeqLineLoading").removeClass("display-none");

    $.ajax({
        url: '/Sha/GetSeq/' + range,
        type: 'GET',
        success: function (data) {
            DiffMovingAverageGraph(data, 'ctrSeqLine', 'divSeqLineContainer', 'divSeqLineLoading');
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}