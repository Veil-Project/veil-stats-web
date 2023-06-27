using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using VeilStats.Helpers;
using System.Threading;
using VeilStats.ApiModel;

namespace VeilStats.Controllers
{
    public class BaseController : Controller
    {
        private string _szDatasetFilePath = VeilStatConst.JsonDatasetsFilePath;

        public BaseController()
        {
            if (SessionSingleton.Current != null && string.IsNullOrWhiteSpace(SessionSingleton.Current.ScriptId))
            {
                SessionSingleton.Current.ScriptId = "17";
            }
            if (SessionSingleton.Current.IsTestnet)
            {
                _szDatasetFilePath = VeilStatConst.JsonDatasetsTestnetFilePath;
            }
        }

        public ActionResult GetRpcDataFile(string rpcCmd)
        {
            try
            {
                var oChart = System.IO.File.ReadAllText(Server.MapPath(Path.Combine(_szDatasetFilePath, "rpc", rpcCmd, "data.json")));
                var oCharJson = JsonConvert.DeserializeObject(DecompressJson(oChart));
                return Content(JsonConvert.SerializeObject(oCharJson, Formatting.Indented,
                                new JsonSerializerSettings
                                {
                                    DateFormatHandling = DateFormatHandling.IsoDateFormat
                                }), "application/json");
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }



        public string GetRpcJson(string rpcCmd)
        {
            try
            {
                var oChart = System.IO.File.ReadAllText(Server.MapPath(Path.Combine(_szDatasetFilePath, "rpc", rpcCmd, "data.json")));
                var oCharJson = JsonConvert.DeserializeObject(DecompressJson(oChart));
                return JsonConvert.SerializeObject(oCharJson, Formatting.Indented,
                                new JsonSerializerSettings
                                {
                                    DateFormatHandling = DateFormatHandling.IsoDateFormat
                                });
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       });
            }
        }


        public ActionResult GetChartJson(string graphType, string dateRange)
        {
            try
            {
                var oChart = System.IO.File.ReadAllText(Server.MapPath(Path.Combine(_szDatasetFilePath, graphType, dateRange, "data.json")));
                var oCharJson = JsonConvert.DeserializeObject(DecompressJson(oChart));
                return Content(JsonConvert.SerializeObject(oCharJson, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            DateFormatHandling = DateFormatHandling.IsoDateFormat
                        }), "application/json");
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }

        public static string DecompressJson(string compressedString)
        {
            byte[] decompressedBytes;
            var compressedStream = new MemoryStream(Convert.FromBase64String(compressedString));
            using (var decompressorStream = new DeflateStream(compressedStream, CompressionMode.Decompress))
            {
                using (var decompressedStream = new MemoryStream())
                {
                    decompressorStream.CopyTo(decompressedStream);
                    decompressedBytes = decompressedStream.ToArray();
                }
            }

            return Encoding.UTF8.GetString(decompressedBytes);
        }

        public ContentResult DataToJson(object data)
        {
            try
            {
                return Content(JsonConvert.SerializeObject(data, Formatting.Indented,
                        new JsonSerializerSettings
                        {
                            DateFormatHandling = DateFormatHandling.IsoDateFormat
                        }), "application/json");
            }
            catch (Exception ex)
            {
                return Content(JsonConvert.SerializeObject("Critical Error!", Formatting.Indented,
                       new JsonSerializerSettings
                       {
                           DateFormatHandling = DateFormatHandling.IsoDateFormat
                       }), "application/json");
            }
        }

        public string GetFileJson(string folder, string filename)
        {
            try
            {
                return System.IO.File.ReadAllText(Server.MapPath(Path.Combine(_szDatasetFilePath, folder, filename + ".json")));
            }
            catch (Exception ex)
            {
                return "Critical Error!";
            }
        }

        public DateTime GetFileTimestampAppData(string folder, string filename)
        {
            return GetFileTimestamp(VeilStatConst.AppDataFilePath, folder, filename);
        }

        public DateTime GetFileTimestamp(string basePath, string folder, string filename)
        {
            try
            {
                var oChart = new FileInfo(Server.MapPath(Path.Combine(basePath, folder, filename + ".json")));
                if (oChart != null)
                {
                    return oChart.LastWriteTime;
                }
                return DateTime.Now.AddDays(-5);
            }
            catch (Exception ex)
            {
                return DateTime.Now.AddDays(-5);
            }
        }

        public void WriteJsonFileAppData(string folder, string filename, object data)
        {
            var oData = JsonConvert.SerializeObject(data, Formatting.None,
                                new JsonSerializerSettings
                                {
                                    DateFormatHandling = DateFormatHandling.IsoDateFormat
                                });
            System.IO.File.WriteAllText(Server.MapPath(Path.Combine(VeilStatConst.AppDataFilePath, folder, filename + ".json")), oData);
        }

        public T GetJsonFileAppData<T>(string folder, string filename)
        {
            return GetJsonFile<T>(VeilStatConst.AppDataFilePath, folder, filename);
        }

        public T GetJsonFile<T>(string basePath, string folder, string filename)
        {
            var szJson = System.IO.File.ReadAllText(Server.MapPath(Path.Combine(basePath, folder, filename + ".json")));
            return JsonConvert.DeserializeObject<T>(szJson);
        }

        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string cultureName = null;

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                        Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                        null;
            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe

            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return base.BeginExecuteCore(callback, state);
        }
    }
}