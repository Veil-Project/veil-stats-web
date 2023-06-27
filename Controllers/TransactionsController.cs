using System.Web.Mvc;

namespace VeilStats.Controllers
{
    public class TransactionsController : BaseController
    {
        // GET: Transactions
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetTxCount(string id)
        {
            return GetChartJson("TxCount", id);
        }

        [OutputCache(Duration = 240, VaryByParam = "id", Location = System.Web.UI.OutputCacheLocation.Server)]
        [HttpGet]
        public ActionResult GetDailyTxCount(string id)
        {
            return GetChartJson("DailyTxCount", id);
        }
    }
}