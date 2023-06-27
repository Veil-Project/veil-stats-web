function triggerMiningPoolCalls() {
    setTimeout(function () {
        LoadPowLine(1);
    }, 20);
}

$.when(LoadRealTimeData(), GetSuprnova(), GetBsod(), GetNlPool(), GetCoinblockers(), GetVeilMine(), GetGOS(), CoinMine())
    .then(function (a1, a2, a3, a4, a5, a6, a7, a8) {
        CalculateNetworkStats();
    });

function CalculateNetworkStats() {
    try {
        var iWorkers = GetTotalWorkerCount();
        document.getElementById('divTotalWorkers').innerText = iWorkers.toLocaleString();
    } catch (ex) {
        document.getElementById('divTotalWorkers').innerText = "No data!";
    }
    try {
        var dPoolHashRate = GetTotalPoolHash();
        var dNetworkHashRate = GetNetworkHash();
        var dUnknownHashRate = dNetworkHashRate - dPoolHashRate;
        try { document.getElementById('divGlobalHash').innerText = FormatHashRate(dNetworkHashRate); } catch (ex) { }
        try { document.getElementById('divKnownHash').innerText = FormatHashRate(dPoolHashRate || 0); } catch (ex) { }
        try { document.getElementById('divUnknownHash').innerText = FormatHashRate(dUnknownHashRate || 0); } catch (ex) { }
    } catch (ex) {
        document.getElementById('divKnownHash').innerText = FormatHashRate(undefined);
        document.getElementById('divUnknownHash').innerText = FormatHashRate(undefined);
    }
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

function LoadRealTimeData() {
    return $.ajax({
        url: '/Home/GetLiveData',
        type: 'GET',
        success: function (data) {
            $("#divCurrentBlock").text(data.CurrentBlock.Id.toLocaleString());
            $("#divPowDiff").text(hashHelper.formatDiff(data.CurrentPow.diff));
            $('.last-update-text').each(function (i, obj) {
                $(this).text(data.CurrentBlock.Date + ' ' + data.CurrentBlock.Time);
            });
        },
        error: function (e) {
            console.log(e.responseText);
        }
    });
}

function GetSuprnova() {
    try {
        return $.ajax({
            url: '/pow/GetSuprnova',
            type: 'GET',
            success: function (data) {
                try { document.getElementById('divSuprnovaHash').innerText = FormatHashRate(data.hashrate * 1000); } catch (ex) { }
                try { document.getElementById('divSuprnovaWorkers').innerText = FormatWorkers(data.workers); } catch (ex) { }
                try { document.getElementById('divGlobalHash').innerText = FormatHashRate(data.network_hashrate); } catch (ex) { }
                try { document.getElementById('hdnSuprnovaHash').innerText = FormatRawHashRate(data.hashrate * 1000); } catch (ex) { }
                try { document.getElementById('hdnSuprnovaWorkers').innerText = FormatRawWorkers(data.workers); } catch (ex) { }
                try { document.getElementById('hdnGlobalHash').innerText = (data.network_hashrate); } catch (ex) { }
            },
            error: function (e) {
                document.getElementById('divSuprnovaHash').innerText = FormatHashRate(undefined);
                document.getElementById('divSuprnovaWorkers').innerText = 'No data!';
                document.getElementById('divGlobalHash').innerText = 'No data!';
                console.log(e.responseText);
            },
            timeout: 20000 // sets timeout to 20 seconds
        });
    } catch (ex) {
        document.getElementById('divSuprnovaHash').innerText = FormatHashRate(undefined);
        document.getElementById('divSuprnovaWorkers').innerText = 'No data!';
        document.getElementById('divGlobalHash').innerText = 'No data!';
    }
}

function GetBsod() {
    return $.ajax({
        url: '/pow/GetBsod',
        type: 'GET',
        success: function (data) {
            try { document.getElementById('divBsodHash').innerText = FormatHashRate(data.x16rt_veil.hashrate); } catch (ex) { }
            try { document.getElementById('divBsodWorkers').innerText = FormatWorkers(data.x16rt_veil.workers); } catch (ex) { }
            try { document.getElementById('hdnBsodHash').innerText = FormatRawHashRate(data.x16rt_veil.hashrate); } catch (ex) { }
            try { document.getElementById('hdnBsodWorkers').innerText = FormatRawWorkers(data.x16rt_veil.workers); } catch (ex) { }
        },
        error: function (e) {
            document.getElementById('divBsodHash').innerText = FormatHashRate(undefined);
            document.getElementById('divBsodWorkers').innerText = 'No data!';
            console.log(e.responseText);
        },
        timeout: 20000 // sets timeout to 20 seconds
    });
}

function GetNlPool() {
    try {
        return $.ajax({
            url: '/pow/GetNLPool',
            type: 'GET',
            success: function (data) {
                try { document.getElementById('divNLPoolHash').innerText = FormatHashRate(data.veil.hashrate); } catch (ex) { }
                try { document.getElementById('divNLPoolWorkers').innerText = FormatWorkers(data.veil.workers); } catch (ex) { }
                try { document.getElementById('hdnNLPoolHash').innerText = FormatRawHashRate(data.veil.hashrate); } catch (ex) { }
                try { document.getElementById('hdnNLPoolWorkers').innerText = FormatRawWorkers(data.veil.workers); } catch (ex) { }
            },
            error: function (e) {
                document.getElementById('divNLPoolHash').innerText = FormatHashRate(undefined);
                document.getElementById('divNLPoolWorkers').innerText = 'No data!';
                console.log(e.responseText);
            },
            timeout: 20000 // sets timeout to 20 seconds
        });
    } catch (ex) {
        document.getElementById('divNLPoolHash').innerText = FormatHashRate(undefined);
        document.getElementById('divNLPoolWorkers').innerText = 'No data!';
    }
}

function GetCoinblockers() {
    try {
        return $.ajax({
            url: '/pow/GetCoinblockers',
            type: 'GET',
            success: function (data) {
                try { document.getElementById('divCoinblockersHash').innerText = FormatHashRate(data.algos.x16rt.hashrate); } catch (ex) { }
                try { document.getElementById('divCoinblockersWorkers').innerText = FormatWorkers(data.algos.x16rt.workers); } catch (ex) { }
                try { document.getElementById('hdnCoinblockersHash').innerText = FormatRawHashRate(data.algos.x16rt.hashrate); } catch (ex) { }
                try { document.getElementById('hdnCoinblockersWorkers').innerText = FormatRawWorkers(data.algos.x16rt.workers); } catch (ex) { }
            },
            error: function (e) {
                document.getElementById('divCoinblockersHash').innerText = FormatHashRate(undefined);
                document.getElementById('divCoinblockersWorkers').innerText = 'No data!';
                console.log(e.responseText);
            },
            timeout: 20000 // sets timeout to 20 seconds
        });
    } catch (ex) {
        document.getElementById('divCoinblockersHash').innerText = FormatHashRate(undefined);
        document.getElementById('divCoinblockersWorkers').innerText = 'No data!';
    }
}

function GetVeilMine() {
    try {
        return $.ajax({
            url: '/pow/GetVeilMine',
            type: 'GET',
            success: function (data) {
                try { document.getElementById('divVeilMineHash').innerText = FormatHashRate(data.hashrate * 1000); } catch (ex) { }
                try { document.getElementById('divVeilMineWorkers').innerText = FormatWorkers(data.workers); } catch (ex) { }
                try { document.getElementById('hdnVeilMineHash').innerText = FormatRawHashRate(data.hashrate * 1000); } catch (ex) { }
                try { document.getElementById('hdnVeilMineWorkers').innerText = FormatRawWorkers(data.workers); } catch (ex) { }
                try { document.getElementById('hdnGlobalHash1').innerText = FormatRawWorkers(data.network_hashrate * 10000000000); } catch (ex) { }
            },
            error: function (e) {
                document.getElementById('divVeilMineHash').innerText = FormatHashRate(undefined);
                document.getElementById('divVeilMineWorkers').innerText = 'No data!';
                console.log(e.responseText);
            },
            timeout: 20000 // sets timeout to 20 seconds
        });

    } catch (ex) {
        document.getElementById('divVeilMineHash').innerText = FormatHashRate(undefined);
        document.getElementById('divVeilMineWorkers').innerText = 'No data!';
    }
}

function GetGOS() {
    try {
        return $.ajax({
            url: '/pow/GetGOS',
            type: 'GET',
            success: function (data) {
                try { document.getElementById('divGosHash').innerText = FormatHashRate(data.hashrate); } catch (ex) { }
                try { document.getElementById('divGosWorkers').innerText = FormatRawWorkers(data.workers); } catch (ex) { }
                try { document.getElementById('hdnGosHash').innerText = FormatRawHashRate(data.hashrate); } catch (ex) { }
                try { document.getElementById('hdnGosWorkers').innerText = FormatRawWorkers(data.workers); } catch (ex) { }
            },
            error: function (e) {
                document.getElementById('divGosHash').innerText = FormatHashRate(undefined);
                document.getElementById('divGosWorkers').innerText = 'No data!';
                console.log(e.responseText);
            },
            timeout: 20000 // sets timeout to 20 seconds
        });
    } catch (ex) {
        document.getElementById('divGosHash').innerText = FormatHashRate(undefined);
        document.getElementById('divGosWorkers').innerText = 'No data!';
    }
}

function CoinMine() {
    return $.ajax({
        url: '/pow/CoinMine',
        type: 'GET',
        success: function (data) {
            try { document.getElementById('divCoinmineHash').innerText = FormatHashRate(data.hashrate * 1000); } catch (ex) { }
            try { document.getElementById('divCoinmineWorkers').innerText = FormatWorkers(data.workers); } catch (ex) { }
            try { document.getElementById('hdnCoinmineHash').innerText = FormatRawHashRate(data.hashrate * 1000); } catch (ex) { }
            try { document.getElementById('hdnCoinmineWorkers').innerText = FormatRawWorkers(data.workers); } catch (ex) { }
            try { document.getElementById('hdnGlobalHash2').innerText = FormatRawWorkers(data.network_hashrate * 10000000000); } catch (ex) { }
        },
        error: function (e) {
            console.log(e.responseText);
        },
        timeout: 20000 // sets timeout to 20 seconds
    });
}

function GetTotalWorkerCount() {
    var i1 = parseInt(document.getElementById('hdnSuprnovaWorkers').innerText) || 0.0;
    var i3 = parseInt(document.getElementById('hdnBsodWorkers').innerText) || 0.0;
    var i4 = parseInt(document.getElementById('hdnNLPoolWorkers').innerText) || 0.0;
    var i5 = parseInt(document.getElementById('hdnCoinblockersWorkers').innerText) || 0.0;
    var i6 = parseInt(document.getElementById('hdnVeilMineWorkers').innerText) || 0.0;
    var i7 = parseInt(document.getElementById('hdnCoinmineWorkers').innerText) || 0.0;
    return (i1 + i3 + i4 + i5 + i6 + i7)
}

function GetTotalPoolHash() {
    var d1 = parseFloat(document.getElementById('hdnSuprnovaHash').innerText) || 0.0;
    var d3 = parseFloat(document.getElementById('hdnBsodHash').innerText) || 0.0;
    var d4 = parseFloat(document.getElementById('hdnNLPoolHash').innerText) || 0.0;
    var d5 = parseFloat(document.getElementById('hdnCoinblockersHash').innerText) || 0.0;
    var d6 = parseFloat(document.getElementById('hdnVeilMineHash').innerText) || 0.0;
    var d7 = parseFloat(document.getElementById('hdnCoinmineHash').innerText) || 0.0;
    return (d1 + d3 + d4 + d5 + d6 + d7)
}

function GetNetworkHash() {
    var d1 = parseFloat(document.getElementById('hdnGlobalHash').innerText) || 0.0;
    if (d1 > 0) {
        return d1;
    }
    var d2 = parseFloat(document.getElementById('hdnGlobalHash1').innerText) || 0.0;
    if (d2 > 0) {
        return d2;
    }

    var d3 = parseFloat(document.getElementById('hdnGlobalHash2').innerText) || 0.0;
    if (d3 > 0) {
        return d3;
    }

    return 0;
}

function FormatWorkers(workers) {
    if (workers == undefined) {
        return 'No data!';
    }
    return workers;
}

function NoData(hashRateCrtId, workersCrtId) {
    document.getElementById(hashRateCrtId).innerText = FormatHashRate(undefined);
    document.getElementById(workersCrtId).innerText = 'No data!';
}

function FormatHashRate(hashRate) {
    return hashHelper.formatHashRate(hashRate);  
}

function FormatRawHashRate(hashRate) {
    return hashRate;
}

function FormatRawWorkers(workers) {
    return workers;
}