using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VeilStats.ApiModel;
using VeilStats.DTO.RealTime;
using VeilStats.Helpers;
using VeilWebTranslations;

namespace VeilStats.Controllers
{
    public class HomeController : BaseController
    {
        private string _szExplorerUrl = "http://explorer.veil-project.com/";

        public HomeController()
        {
            if (SessionSingleton.Current.IsTestnet)
            {
                _szExplorerUrl = "https://testnet.veil-project.com/";
            }
        }

        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 30, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetLiveData()
        {
            try
            {
                var oBlock = GetBlockchainInfo();
                if (oBlock == null)
                {
                    return Json(new { Error = "An error occurred - no reponse from explorer." });
                }
                var oRealTimeData = new RealTimeData();
                oRealTimeData.CurrentBlock.Id = oBlock.blocks;

                System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                var dtUtcTime = dtDateTime.AddSeconds(oBlock.mediantime);
                var neutral = System.Globalization.CultureInfo.CreateSpecificCulture(CultureHelper.GetCurrentNeutralCulture());
                var dtfi = neutral.DateTimeFormat; 
                oRealTimeData.CurrentBlock.Date = string.Format(dtfi, "{0:ddd, dd MMM yyyy}", dtUtcTime);
                oRealTimeData.CurrentBlock.Time = string.Format(dtfi, "{0:HH:mm:ss UTC}", dtUtcTime);

                oRealTimeData.CurrentPos.diff = oBlock.difficulty_pos;
                oRealTimeData.CurrentProgpowDiff.diff = oBlock.difficulty_progpow;
                oRealTimeData.CurrentRandomXDiff.diff = oBlock.difficulty_randomx;
                oRealTimeData.CurrentShaDiff.diff = oBlock.difficulty_sha256d;
                long iTotalZeroCoins = 0;
                foreach (var oZeroType in oBlock.zerocoinsupply)
                {
                    if (oZeroType.denom.Equals("total", StringComparison.OrdinalIgnoreCase))
                    {
                        iTotalZeroCoins = oZeroType.amount;
                        break;
                    }
                }
                oRealTimeData.TotalZerocoinSupply = iTotalZeroCoins;

                foreach (var oZeroType in oBlock.zerocoinsupply.OrderBy(o => o.denom))
                {
                    if (oZeroType.denom.Equals("total", StringComparison.OrdinalIgnoreCase))
                    {
                        continue;
                    }
                    oRealTimeData.ZeroSupply.Add(new PieSlice((decimal)(oZeroType.amount / (double)iTotalZeroCoins) * 100, oZeroType.denom));
                }
                var dZeroSupply = ((decimal)iTotalZeroCoins / (decimal)(oBlock.moneysupply / 100000000)) * 100;
                var oMoneySupply = GetVeilProjectBalances();

                var dBudgetAmt = (oMoneySupply.team_budget / (decimal)(oBlock.moneysupply / 100000000)) * 100;
                var dLabdAmt =  (oMoneySupply.foundation_budget / (decimal)(oBlock.moneysupply / 100000000)) * 100;

                // Veil Supply
                oRealTimeData.VeilSupply.Add(new PieSlice(dZeroSupply, Resource.RealTime_Zerocoin));
                oRealTimeData.VeilSupply.Add(new PieSlice(dBudgetAmt, Resource.RealTime_VeilBudgetExcess));
                oRealTimeData.VeilSupply.Add(new PieSlice((100 - dZeroSupply - dBudgetAmt - dLabdAmt), Resource.RealTime_Other));
                oRealTimeData.VeilSupply.Add(new PieSlice(dLabdAmt, Resource.RealTime_VeilFoundation));

                return Content(JsonConvert.SerializeObject(oRealTimeData, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            DateFormatHandling = DateFormatHandling.IsoDateFormat
                        }), "application/json");
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }

        [OutputCache(Duration = 30, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetPriceData()
        {
            try
            {
                var oPrice = GetPrice();
                return Content(JsonConvert.SerializeObject(oPrice, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            DateFormatHandling = DateFormatHandling.IsoDateFormat
                        }), "application/json");
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }

        [OutputCache(Duration = 30, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetBlockCount()
        {
            try
            {
                var szDatasetFilePath = VeilStatConst.JsonDatasetsFilePath;
                if (SessionSingleton.Current.IsTestnet)
                {
                    szDatasetFilePath = VeilStatConst.JsonDatasetsTestnetFilePath;
                }

                var oDifficulty = System.IO.File.ReadAllText(Server.MapPath(Path.Combine(szDatasetFilePath, "BlockTally", "data.json")));
                var oTest = JsonConvert.DeserializeObject(oDifficulty);
                return Content(JsonConvert.SerializeObject(oTest, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            DateFormatHandling = DateFormatHandling.IsoDateFormat
                        }), "application/json");

            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }

        [OutputCache(Duration = 30000, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        public ActionResult About()
        {
            return View();
        }

        public ActionResult Error()
        {
            return View();
        }

        private BlockchainInfo GetBlockchainInfo()
        {
            try
            {
                //var oInfo = GetRpcJson("getblockchaininfo");
                var client = new RestClient("https://explorer.veil-project.com/api/getblockchaininfo");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                //request.AddHeader("Cookie", "connect.sid=s%3AKmlNmuFGvDuwZ39M7GoCGeIXNGbJ0Yz5.0K6wNQQv5o3Eowe3zvVFdWacUlWrbFhfYmU5h%2FSSVsU");
                IRestResponse response = client.Execute(request);
                //Console.WriteLine(response.Content);

                return JsonConvert.DeserializeObject<BlockchainInfo>(response.Content);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private CoinPrice GetPrice()
        {
            try
            {
                var oWebR = WebRequest.Create("https://api.coingecko.com/api/v3/simple/price?ids=veil&vs_currencies=usd,eur,btc");
                oWebR.ContentType = "application/json; charset=utf-8;";
                oWebR.Method = "GET";
                oWebR.Timeout = 6000;

                var stream = oWebR.GetResponse().GetResponseStream();
                var reader = new StreamReader(stream);
                var NetworkData = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<CoinPrice>(NetworkData);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        private MoneySupply GetVeilProjectBalances()
        {
            try
            {
                var client = new RestClient("https://explorer.veil-project.com/api/getmoneysupply");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);
                IRestResponse response = client.Execute(request);                
                var oMoneySupply = JsonConvert.DeserializeObject<MoneySupply>(response.Content);

                return oMoneySupply;
            }
            catch (Exception ex)
            {
                return  new MoneySupply();
            }
        }

        private decimal GetLabsAmount()
        {
            try
            {
                var szAddress = ConfigurationManager.AppSettings["FoundationAddress"];
                var oWebR = WebRequest.Create(_szExplorerUrl + "api/address/" + szAddress);
                oWebR.ContentType = "application/json; charset=utf-8;";
                oWebR.Method = "GET";
                oWebR.Timeout = 6000;

                var stream = oWebR.GetResponse().GetResponseStream();
                var reader = new StreamReader(stream);
                var NetworkData = reader.ReadToEnd();
                var oAddress = JsonConvert.DeserializeObject<Address>(NetworkData);
                return oAddress.balance;
            }
            catch (Exception ex)
            {
                return 0m;
            }
        }
        public ActionResult Testnet()
        {
            SessionSingleton.Current.IsTestnet = true;
            return View("Index");
        }
        public ActionResult Mainnet()
        {
            SessionSingleton.Current.IsTestnet = false;
            return View("Index");
        }

        public List<Zerocoinsupply> GetZoincoinSupply()
        {
            var colDenoms = new List<Zerocoinsupply>();

            var oWebR = WebRequest.Create(_szExplorerUrl + "rpcapi/getzerocoinsupply/");
            oWebR.ContentType = "application/json; charset=utf-8;";
            oWebR.Method = "GET";
            oWebR.Timeout = 6000;

            var stream = oWebR.GetResponse().GetResponseStream();
            var reader = new StreamReader(stream);
            var NetworkData = reader.ReadToEnd();
            colDenoms = JsonConvert.DeserializeObject<List<Zerocoinsupply>>(NetworkData);
            return colDenoms;            
        }
    }

}