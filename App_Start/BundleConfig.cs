using System.Web;
using System.Web.Optimization;

namespace VeilStats
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/lib/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/lib/bootstrap.js",
                      "~/Scripts/lib/bootstrap-toggle.js"));

            bundles.Add(new ScriptBundle("~/bundles/helpers").Include(
                            "~/Scripts/common/H*",
                            "~/Scripts/common/J*",
                            "~/Scripts/common/g*"));

            bundles.Add(new ScriptBundle("~/bundles/charts").Include(
                      "~/Scripts/Charts/veil*"));            

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-toggle.css",
                      "~/Content/site.css"));   

            bundles.Add(new StyleBundle("~/Content/nav").Include(
                        "~/Content/lang-menu.css"));

            //BundleTable.EnableOptimizations = false;

        }
    }
}
