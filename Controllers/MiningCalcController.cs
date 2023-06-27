using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VeilStats.Helpers;
using VeilStats.Models;

namespace VeilStats.Controllers
{
    //public class MiningCalcController : BaseController
    //{
    //    // GET: MiningCalc
    //    public ActionResult Index()
    //    {

    //        var oMiningCalc = GetDefaultModel();
    //        try
    //        {
    //            FillResultRows(oMiningCalc, true);
    //        }
    //        catch (Exception ex)
    //        {
    //            var o = "";
    //        }

    //        return View("Index", oMiningCalc);
    //    }

    //    [HttpPost]
    //    [AllowAnonymous]
    //    [ValidateAntiForgeryToken]
    //    public ActionResult Index([Bind(Include = "HashRate,Difficulty,BlockReward,Power,PowerCost,Fees,ExchangeRate,BtcValue,HashRatePerCoin,Diff24hr")] MiningCalc calcModel)
    //    {
    //        calcModel.Results = new List<MiningCalcResult>();

    //        if (!ModelState.IsValid)
    //        {
    //            foreach (string szError in MvcHelper.GetErrors(ViewData))
    //            {
    //                ModelState.AddModelError("", szError);
    //            }
    //            return View(calcModel);
    //        }

    //        try
    //        {
    //            FillResultRows(calcModel, false);
    //        }
    //        catch (Exception ex)
    //        {
    //            var o = "";
    //        }

    //        return DataToJson(calcModel);
    //    }

    //    private MiningCalc GetDefaultModel()
    //    {
    //        var oDefault = new MiningCalc()
    //        {
    //            HashRate = 100,
    //            Difficulty = 3500.0m,
    //            BlockReward = 50,
    //            Power = 200,
    //            PowerCost = 0.1m,
    //            Fees = 1.0m,
    //            ExchangeRate = 0.00000500m,
    //            BtcValue = 10350.94m,
    //            Results = new List<MiningCalcResult>(),
    //            HashRatePerCoin = 50m,
    //            Diff24hr = 3500.00m
    //        };
    //        return oDefault;
    //    }

    //    private void FillResultRows(MiningCalc model, bool overrideResults)
    //    {
    //        var oPriceData = GetPriceData();
    //        var oSecretMinerData = GetMinerData();

    //        if (overrideResults)
    //        {
    //            model.ExchangeRate = oPriceData.veil.btc;
    //            model.BtcValue = oPriceData.bitcoin.usd;
    //            model.Difficulty = oSecretMinerData.Diff24hr;
    //            model.Diff24hr = oSecretMinerData.Diff24hr;
    //            model.HashRatePerCoin = oSecretMinerData.HashNeeded;
    //        }

    //        if(model.HashRatePerCoin <= 0)
    //        {
    //            model.HashRatePerCoin = 50m;
    //        }
    //        if (model.BlockReward <= 0)
    //        {
    //            model.BlockReward = 1;
    //        }
    //        if (model.Diff24hr <= 0)
    //        {
    //            model.Diff24hr = 1;
    //        }

    //        var dDiffMargin = (model.Diff24hr - model.Difficulty) / model.Diff24hr;
    //        var dBlockRewardMargin = (model.BlockReward - 50m) / 50m;
    //        var dEstRewards = (model.HashRate / model.HashRatePerCoin) * (1 + dDiffMargin + dBlockRewardMargin);

    //        var dFees = dEstRewards * (model.Fees / 100);
    //        dEstRewards -= dFees;

    //        var o24hrResults = new MiningCalcResult()
    //        {
    //            Per = "Day",
    //            Fees = dFees,
    //            EstRewards = dEstRewards,
    //            RevBtc = dEstRewards * model.ExchangeRate,
    //            RevFiat = Convert.ToDecimal(dEstRewards) * Convert.ToDecimal(model.ExchangeRate) * model.BtcValue,
    //            Cost = (model.Power / 1000) * model.PowerCost * 24m
    //        };
    //        model.Results.Add(CopyAndAdjustRow(o24hrResults, (1m / 24m), "Hour"));
    //        model.Results.Add(o24hrResults);
    //        model.Results.Add(CopyAndAdjustRow(o24hrResults, 7m, "Week"));
    //        model.Results.Add(CopyAndAdjustRow(o24hrResults, 30m, "Month"));
    //        model.Results.Add(CopyAndAdjustRow(o24hrResults, 365m, "Year"));
    //    }

    //    private MiningCalcResult CopyAndAdjustRow(MiningCalcResult copyRow, decimal scale, string span)
    //    {
    //        var oNewRow = new MiningCalcResult()
    //        {
    //            Per = span,
    //            Fees = (copyRow.Fees * scale),
    //            EstRewards = (copyRow.EstRewards * scale),
    //            RevBtc = (copyRow.RevBtc * scale),
    //            RevFiat = copyRow.RevFiat * Convert.ToDecimal(scale),
    //            Cost = copyRow.Cost * Convert.ToDecimal(scale)
    //        };

    //        return oNewRow;
    //    }

    //    private PriceData GetPriceData()
    //    {
    //        try
    //        {
    //            // Get timestamp from server file.
    //            var dtLastSave = GetFileTimestampAppData("MiningCalc", "price");

    //            // If over 2 minutes get new data.
    //            if ((DateTime.Now - dtLastSave).Minutes >= 2)
    //            {
    //                PriceData oPriceData = GetPriceDataSub();
    //                WriteJsonFileAppData("MiningCalc", "price", oPriceData);
    //                return oPriceData;
    //            }
    //            else
    //            {
    //                try
    //                {
    //                    var oPriceData = GetJsonFileAppData<PriceData>("MiningCalc", "price");
    //                    return oPriceData;
    //                }
    //                catch (Exception ex)
    //                {
    //                    PriceData oPriceData = GetPriceDataSub();
    //                    WriteJsonFileAppData("MiningCalc", "price", oPriceData);
    //                    return oPriceData;
    //                }
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            return new PriceData()
    //            {
    //                bitcoin = new Bitcoin() { usd = 1, btc = 10000 },
    //                veil = new Veil() { usd = 0.082803m, btc = 0.00000815m }
    //            };
    //        }
    //    }

    //    private static PriceData GetPriceDataSub()
    //    {
    //        var oWebR = WebRequest.Create("https://api.coingecko.com/api/v3/simple/price?ids=veil,bitcoin&vs_currencies=btc,usd");
    //        oWebR.ContentType = "application/json; charset=utf-8;";
    //        oWebR.Method = "GET";
    //        oWebR.Timeout = 6000;

    //        var stream = oWebR.GetResponse().GetResponseStream();
    //        var reader = new StreamReader(stream);
    //        var NetworkData = reader.ReadToEnd();

    //        // Save the data to the server.
    //        var oPriceData = JsonConvert.DeserializeObject<PriceData>(NetworkData);
    //        return oPriceData;
    //    }

    //    private SecretData GetMinerData()
    //    {
    //        try
    //        {
    //            var oSecretData = new SecretData();

    //            // Get timestamp from server file.
    //            var dtLastSave = GetFileTimestampAppData("MiningCalc", "miner1");

    //            // If over 2 minutes old get new data.
    //            if ((DateTime.Now - dtLastSave).Minutes >= 2)
    //            {
    //                var oTemp = ConfigurationManager.AppSettings["MinerCalcAddress"];
    //                var szAddress = !string.IsNullOrWhiteSpace(oTemp) ? oTemp : "bv1q3zfgjp90u5mze3jx943vjex4n40kg0c6979dqu";
    //                var oWebR = WebRequest.Create("http://api.bsod.pw/api/wallet?address=" + szAddress);
    //                oWebR.ContentType = "application/json; charset=utf-8;";
    //                oWebR.Method = "GET";
    //                oWebR.Timeout = 6000;

    //                var stream = oWebR.GetResponse().GetResponseStream();
    //                var reader = new StreamReader(stream);
    //                var NetworkData = reader.ReadToEnd();

    //                var oMinerData = JsonConvert.DeserializeObject<MinerData>(NetworkData);
    //                var oMinerCache = new MinerCache()
    //                {
    //                    hashrate_24h = 45.2m,
    //                    revenue_one_day = Convert.ToDecimal(oMinerData.paid24h)
    //                };
    //                WriteJsonFileAppData("MiningCalc", "miner1", oMinerCache);
    //                oSecretData.HashNeeded = (oMinerCache.hashrate_24h / oMinerCache.revenue_one_day);
    //            }
    //            else
    //            {
    //                var oMinerCache = GetJsonFileAppData<MinerCache>("MiningCalc", "miner1");
    //                oMinerCache.hashrate_24h = 2080m;
    //                oSecretData.HashNeeded = (oMinerCache.hashrate_24h / oMinerCache.revenue_one_day);
    //            }

    //            oSecretData.Diff24hr = Convert.ToDecimal(GetFileJson("MiningCalc", "data"));
    //            return oSecretData;
    //        }
    //        catch (Exception ex)
    //        {
    //            return new SecretData() { HashNeeded = 0, Diff24hr = 1 };
    //        }
    //    }

    //    private class SecretData
    //    {
    //        public decimal HashNeeded { get; set; }
    //        public decimal Diff24hr { get; set; }
    //    }

    //    private class MinerCache
    //    {
    //        public decimal hashrate_24h { get; set; }
    //        public decimal revenue_one_day { get; set; }
    //    }

    //    #region "API DTOs"

    //    private class Bitcoin
    //    {
    //        public decimal btc { get; set; }
    //        public decimal usd { get; set; }
    //    }

    //    private class Veil
    //    {
    //        public decimal btc { get; set; }
    //        public decimal usd { get; set; }
    //    }

    //    private class PriceData
    //    {
    //        public Bitcoin bitcoin { get; set; }
    //        public Veil veil { get; set; }
    //    }

    //    public class MinerData
    //    {
    //        public decimal hashrate_1h { get; set; }
    //        public decimal hashrate_24h { get; set; }
    //        public int last_share_time { get; set; }
    //        public decimal paid24h { get; set;  }
    //        public List<Miner> miners { get; set; }
    //    }

    //    public class Miner
    //    {
    //        public string revenue_six_hour { get; set; }
    //        public string revenue_one_day { get; set; }
    //    }
    //    #endregion
    //}
}