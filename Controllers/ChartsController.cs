using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VeilStats.DTO.Chart;

namespace VeilStats.Controllers
{
    public class ChartsController : BaseController
    {
        // GET: Charts
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetPosDiff(string id)
        {
            return GetChartJson("PosDiff", id);           
        }

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        //[HttpGet]
        //public ActionResult GetPowDiff(string id)
        //{
        //    return GetChartJson("PowDiff", id);           
        //}

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        //[HttpGet]
        //public ActionResult GetTxCount(string id)
        //{
        //    return GetChartJson("TxCount", id);           
        //}

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        //[HttpGet]
        //public ActionResult GetMoneySupply(string id)
        //{
        //    return GetChartJson("MoneySupply", id);
        //}

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        //[HttpGet]
        //public ActionResult GetBlockSplit(string id)
        //{
        //    return GetChartJson("BlockSplit", id);
        //}

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        //[HttpGet]
        //public ActionResult GetBlockSplitPercent(string id)
        //{
        //    return GetChartJson("BlockSplitPercent", id);
        //}
    }
}