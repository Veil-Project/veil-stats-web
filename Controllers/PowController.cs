using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    //public class PowController : BaseController
    //{
    //    // GET: Pow
    //    public ActionResult Index()
    //    {
    //        return View();
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetSuprnova()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://veil.suprnova.cc/index.php?page=api&action=public");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetBsod()
    //    {
    //        try
    //        {
    //            return GetUrlData("http://api.bsod.pw/api/status");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetNLPool()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://www.nlpool.nl/api/status");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }
        
    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetCoinblockers()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://veil.coinblockers.com/api/stats");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetVeilMine()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://veilmine.com/index.php?page=api&action=public");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult GetGOS()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://gos.cx/api/currencies?c=veil");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    [OutputCache(Duration = 15, VaryByParam = "none", Location = System.Web.UI.OutputCacheLocation.Server)]
    //    [HttpGet]
    //    public ActionResult CoinMine()
    //    {
    //        try
    //        {
    //            return GetUrlData("https://www2.coinmine.pl/veil/?page=api&action=public");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                            new JsonSerializerSettings()), "application/json");
    //        }
    //    }

    //    private ActionResult GetUrlData(string Url)
    //    {
    //        try
    //        {
    //            var oWebR = WebRequest.Create(Url);
    //            oWebR.ContentType = "application/json; charset=utf-8;";
    //            oWebR.Method = "GET";
    //            oWebR.Timeout = 14000;

    //            var stream = oWebR.GetResponse().GetResponseStream();
    //            var reader = new StreamReader(stream);
    //            return Content(reader.ReadToEnd(), "application/json");
    //        }
    //        catch (Exception ex)
    //        {
    //            return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
    //                          new JsonSerializerSettings()), "application/json");
    //        }
    //    }
    //}
}