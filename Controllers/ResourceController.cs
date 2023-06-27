using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using VeilStats.Helpers;
using Resource = VeilWebTranslations.Resource;

namespace VeilStats.Controllers
{
    public class ResourceController : BaseController
    {
        [HttpGet]
        public ActionResult GetResources(string id)
        {
            var colDescriptions = typeof(Resource).GetProperties().Where(w => w.Name.StartsWith(id))
                                 .ToDictionary(p => p.Name, p => p.GetValue(null) as string);
            return Content(JsonConvert.SerializeObject(colDescriptions, Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");

        }

        public ActionResult SetCulture(string id)
        {
            ClearCache();

            // Validate input
            id = CultureHelper.GetImplementedCulture(id);

            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = id;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = id;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
            return View();
        }

        public ActionResult Refresh()
        {
            SessionSingleton.Current.ScriptId = new Random().Next(999999999).ToString();
            return View();
        }

        private void ClearCache()
        {
            try
            {
                Response.RemoveOutputCacheItem(Url.Action("GetLiveData", "Home"));
                Response.RemoveOutputCacheItem(Url.Action("GetPriceData", "Home"));
                Response.RemoveOutputCacheItem(Url.Action("GetBlockCount", "Home"));
                Response.RemoveOutputCacheItem(Url.Action("About", "Home"));
                Response.RemoveOutputCacheItem(Url.Action("Testnet", "Home"));
                Response.RemoveOutputCacheItem(Url.Action("Mainnet", "Home"));


                Response.RemoveOutputCacheItem(Url.Action("GetPosDiff", "Charts"));
                Response.RemoveOutputCacheItem(Url.Action("GetPowDiff", "Charts"));
                Response.RemoveOutputCacheItem(Url.Action("GetTxCount", "Charts"));
                Response.RemoveOutputCacheItem(Url.Action("GetMoneySupply", "Charts"));
                Response.RemoveOutputCacheItem(Url.Action("GetBlockSplit", "Charts"));
                Response.RemoveOutputCacheItem(Url.Action("GetBlockSplitPercent", "Charts"));

                Response.RemoveOutputCacheItem(Url.Action("GetStakeEfficiency", "DenomEfficiency"));

                Response.RemoveOutputCacheItem(Url.Action("GetSuprnova", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("GetBsod", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("GetNLPool", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("GetCoinblockers", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("GetVeilMine", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("GetGOS", "Pow"));
                Response.RemoveOutputCacheItem(Url.Action("CoinMine", "Pow"));

                Response.RemoveOutputCacheItem(Url.Action("GetEfficiency", "StakeDistribution"));

                Response.RemoveOutputCacheItem(Url.Action("GetTxCount", "Transactions"));
                Response.RemoveOutputCacheItem(Url.Action("GetDailyTxCount", "Transactions"));
            }
            catch (Exception ex)
            {
                var s = "";
            }
        }
    }
}