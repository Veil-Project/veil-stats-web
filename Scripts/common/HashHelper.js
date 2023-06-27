(function (hashHelper, $, undefined) {

    //Public Method
    hashHelper.formatDiff = function (value) {
        if (value > 100) {
            return parseFloat((value).toFixed(2)).toLocaleString();
        }
        else
        {
            return parseFloat(value).toFixed(8).toLocaleString();
        }
    };

    hashHelper.formatToFixed2 = function (value) {
        return parseFloat(value).toFixed(2).toLocaleString();
    };

    hashHelper.formatToFixed5 = function (value) {
        return parseFloat(value).toFixed(5).toLocaleString();
    };

    hashHelper.formatToFixed8 = function (value) {
        return parseFloat(value).toFixed(8).toLocaleString();
    };

    hashHelper.formatHashRate = function (value) {
        try {
            value = +value || 0;
            if (value <= 0) {
                return '0 kH/s';
            }

            var dTemp;
            if (value > 1000000000000000000000) {
                dTemp = (parseFloat(value) / 1000000000000000000000).toFixed(2) + ' ZH/s';
            } else if (value > 1000000000000000000) {
                dTemp = (parseFloat(value) / 1000000000000000000).toFixed(2) + ' EH/s';
            } else if (value > 1000000000000000) {
                dTemp = (parseFloat(value) / 1000000000000000).toFixed(2) + ' PH/s';
            } else if (value > 1000000000000) {
                dTemp = (parseFloat(value) / 1000000000000).toFixed(2) + ' TH/s';
            } else if (value > 1000000000) {
                dTemp = (parseFloat(value) / 1000000000).toFixed(2) + ' GH/s';
            } else if (value > 1000000) {
                dTemp = (parseFloat(value) / 1000000).toFixed(2) + ' MH/s';
            } else {
                dTemp = (parseFloat(value) / 1000).toFixed(2) + ' kH/s';
            }
            return dTemp;
        } catch (ex) {
            return '0 kH/s';
        }
    };

}(window.hashHelper = window.hashHelper || {}, jQuery));