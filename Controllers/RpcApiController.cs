using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class RpcApiController : BaseController
    {
        // GET: RpcApi
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 60, VaryByParam = "", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult getblockchaininfo()
        {
            return GetRpcDataFile("getblockchaininfo");
        }

        [OutputCache(Duration = 60, VaryByParam = "", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult getchainalgostats()
        {
            return GetRpcDataFile("getchainalgostats");
        }
    }
}