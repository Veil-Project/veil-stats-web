using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace VeilStats
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            MvcHandler.DisableMvcResponseHeader = true;
        }

        protected void Application_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            //var app = sender as HttpApplication;
            //var acceptEncoding = app.Request.Headers["Accept-Encoding"];
            //var prevUncompressedStream = app.Response.Filter;
            //if (!string.IsNullOrEmpty(acceptEncoding))
            //{
            //    acceptEncoding = acceptEncoding.ToLower();
            //    if (acceptEncoding.Contains("gzip"))
            //    {
            //        app.Response.Filter = new GZipStream(prevUncompressedStream, CompressionMode.Compress);
            //        app.Response.AppendHeader("Content-Encoding", "gzip");
            //    }
            //}
            //Response.Cache.VaryByHeaders["Accept-Encoding"] = true;
        }

        protected void Application_OnSessionStart(object sender, EventArgs e)
        {
            HttpContext.Current.Session.Add("IsTestnet", false);
        }
    }
}
