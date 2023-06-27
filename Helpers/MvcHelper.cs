
using System.Collections.Generic;
using System.Web.Mvc;

namespace VeilStats.Helpers
{
    public class MvcHelper
    {
        public static List<string> GetErrors(ViewDataDictionary viewData)
        {
            var colError = new List<string>();
            foreach (ModelState modelState in viewData.ModelState.Values)
            {
                foreach (ModelError error in modelState.Errors)
                {
                    colError.Add(error.ErrorMessage);
                }
            }
            return colError;
        }
    }
}