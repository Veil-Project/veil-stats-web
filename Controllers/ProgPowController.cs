using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class ProgPowController : BaseController
    {
        // GET: Pos
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetDiff(string id)
        {
            return GetChartJson("PowDiffProgPow", id);
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetSeq(string id)
        {
            return GetChartJson("PowDiffProgPow", id);
        }
    }
}