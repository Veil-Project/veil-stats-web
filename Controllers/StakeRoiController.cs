using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using VeilStats.ApiModel;
using VeilStats.DTO.RealTime;
using VeilStats.Helpers;

namespace VeilStats.Controllers
{
    public class StakeRoiController : BaseController
    {
        // GET: StakeFrequency
        //[OutputCache(Duration = 30, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        //[OutputCache(Duration = 30, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetStakeA()
        {
            try
            {
                var oPrice = GetStakeASub();
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
        private StakeADTO GetStakeASub()
        {
            var oResult = new StakeADTO();

            var oRealTimeData = GetLiveData();
            oResult.ZerocoinAmount = oRealTimeData.TotalZerocoinSupply;
            oResult.PosBlocks = GetBlockCount();
            oResult.DailyVeil = (long)(oResult.ZerocoinAmount / oResult.PosBlocks);
            oResult.WeeklyVeil = (long)(oResult.DailyVeil / 7);
            oResult.MonthlyVeil = (long)(oResult.DailyVeil / 30);
            oResult.LastUpdate = oRealTimeData.CurrentBlock.Date + " " + oRealTimeData.CurrentBlock.Time;
            return oResult;
        }

        private int GetBlockCount()
        {
            try
            {
                var oWebR = WebRequest.Create(GetBaseUrl() + "home/GetBlockCount");
                oWebR.ContentType = "application/json; charset=utf-8;";
                oWebR.Method = "GET";
                oWebR.Timeout = 6000;

                var stream = oWebR.GetResponse().GetResponseStream();
                var reader = new StreamReader(stream);
                var NetworkData = reader.ReadToEnd();
                var oBlockCount = JsonConvert.DeserializeObject<BlockCount>(NetworkData);
                return oBlockCount.PosBlocks24hr;
            }
            catch (Exception ex)
            {
                return 720;
            }
        }

        private RealTimeData GetLiveData()
        {
            try
            {
                var oWebR = WebRequest.Create(GetBaseUrl() + "home/GetLiveData");
                oWebR.ContentType = "application/json; charset=utf-8;";
                oWebR.Method = "GET";
                oWebR.Timeout = 6000;

                var stream = oWebR.GetResponse().GetResponseStream();
                var reader = new StreamReader(stream);
                var NetworkData = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<RealTimeData>(NetworkData);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private string GetBaseUrl()
        {
            return Request.Url.AbsoluteUri.Replace(Request.Url.PathAndQuery, "") + '/';
        }

        private class StakeADTO
        {
            public long ZerocoinAmount { get; set; }
            public string LastUpdate { get; set; }
            public int PosBlocks { get; set; }
            public long DailyVeil { get; set; }
            public long WeeklyVeil { get; set; }
            public long MonthlyVeil { get; set; }
        }

        private class BlockCount
        {
            public int PosBlocks24hr { get; set; }
        }
    }
}