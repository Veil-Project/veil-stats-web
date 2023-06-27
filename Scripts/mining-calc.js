$(document).ready(function () {
    $("#frmMiningCalc").submit(function (event) {
        var dataString;
        event.preventDefault();
        event.stopImmediatePropagation();

        $("#divResults").html("<div class='text-center' style='height:225px'><div class='veil-spinner'></div></div>");
        var action = $("#frmMiningCalc").attr("action");
        // Setting.
        dataString = new FormData($("#frmMiningCalc").get(0));
        contentType = false;
        processData = false;
        $.ajax({
            type: "POST",
            url: action,
            data: dataString,
            dataType: "json",
            contentType: contentType,
            processData: processData,
            success: function (result) {
                // Result.
                onAjaxRequestSuccess(result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#divResults").html("<div class='text-center' style='height:225px'>!Error</div>");
            }
        });
    }); //end .submit()
});

var onAjaxRequestSuccess = function (result) {
    CreateTableFromJSON('divResults', result.Results);
}