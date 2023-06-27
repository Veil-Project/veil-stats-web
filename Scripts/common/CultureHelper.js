GetScriptTranslations = function (resourcePrefix) {
    return $.ajax({
        url: '/Resource/GetResources/' + resourcePrefix,
        type: 'GET',
        async: !1,
        error: function (e) {            
            console.log(e.responseText);
        }
    });
};

GetTranslationText = function (fieldName) {
    var oTranslations = JSON.parse(document.getElementById("hdnScriptTranslations").value);
    var szText = oTranslations[fieldName];
    return szText;
};

