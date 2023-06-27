using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class DenomEfficiencyController : BaseController
    {
        // GET: Zerocoin
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetStakeEfficiency(string id)
        {
            return GetChartJson("ZerocoinStake", id);
        }
    }
}