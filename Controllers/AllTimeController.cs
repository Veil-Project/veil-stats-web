using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class AllTimeController : BaseController
    {
        // GET: AllTime
        public ActionResult Index()
        {
            return View();
        }
    }
}