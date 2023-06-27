using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class StakeDistributionController : BaseController
    {
        // GET: StakeDistribution
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetEfficiency(string id)
        {
            return GetChartJson("DenomEfficiency", id);
        }

        //[OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetTable()
        {
            return DataToJson(GetFileJson("DenomEfficiencyRaw","json"));
        }
    }
}