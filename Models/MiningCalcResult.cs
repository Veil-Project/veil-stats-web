using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace VeilStats.Models
{
    public partial class MiningCalcResult
    {
        public string Per = "";
        public decimal Fees { get; set; }
        [JsonProperty(PropertyName = "Est. Rewards")]
        public decimal EstRewards { get; set; }
        [JsonProperty(PropertyName = "Rev. BTC")]
        public decimal RevBtc { get; set; }
        [JsonProperty(PropertyName = "Rev. $")]
        public decimal RevFiat { get; set; }
        public decimal Cost { get; set; }
        public decimal Profit
        {
            get { return RevFiat - Cost; }
        }
    }
}