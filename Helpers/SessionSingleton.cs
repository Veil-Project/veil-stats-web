using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VeilStats.Helpers
{
    [Serializable]
    public sealed class SessionSingleton
    {
        #region Singleton

        private const string SESSION_SINGLETON_NAME = "Singleton_502E69E5-668B-E011-951F-00155DF26207";

        private SessionSingleton()
        {

        }

        public static SessionSingleton Current
        {
            get
            {
                if (HttpContext.Current.Session[SESSION_SINGLETON_NAME] == null)
                {
                    HttpContext.Current.Session[SESSION_SINGLETON_NAME] = new SessionSingleton();
                }

                return HttpContext.Current.Session[SESSION_SINGLETON_NAME] as SessionSingleton;
            }
        }

        #endregion

        public bool IsTestnet { get; set; }
        public string ScriptId { get; set; }
    }
}