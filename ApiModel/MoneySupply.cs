using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VeilStats.ApiModel
{
    public class MoneySupply
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 

        public decimal total_supply { get; set; }
        public decimal circulating_supply { get; set; }
        public decimal team_budget { get; set; }
        public decimal foundation_budget { get; set; }
        public string budget_address { get; set; }
        public string foundation_address { get; set; }

    }
}