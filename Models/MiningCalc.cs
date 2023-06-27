using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VeilStats.Models
{
    public partial class MiningCalc
    {
        [Required]
        [Range(0.01, 100000000000000000)]
        [DisplayName("Hash rate")]
        public decimal HashRate { get; set; }

        [Required]
        [Range(0.01, 100000000000000000)]
        public decimal Difficulty { get; set; }

        [Required]
        [Range(1, 50)]
        [DisplayName("Block reward")]
        public int BlockReward { get; set; }

        [Required]
        [Range(1, 100000000)]
        public decimal Power { get; set; }

        [Required]
        [Range(0.00000000, 1)]
        [DisplayName("Power cost")]
        public decimal PowerCost { get; set; }

        [Required]
        [Range(0, 50)]
        public decimal Fees { get; set; }

        [Required]
        [Range(0.00000001, 1000000000)]
        [DisplayFormat(DataFormatString = "{0:0.00000000}", ApplyFormatInEditMode = true)]
        [DisplayName("Exchange rate")]
        public decimal ExchangeRate { get; set; }

        [Required]
        [Range(.00001, 100000000000)]
        [DisplayName("BTC value")]
        public decimal BtcValue { get; set; }

        [Required]
        [Range(0.01, 100000000000000000)]
        [DisplayName("Hash rate per coin")]
        [DisplayFormat(DataFormatString = "{0:0.00##}", ApplyFormatInEditMode = true)]
        public decimal HashRatePerCoin { get; set; }

        [Required]
        [Range(0.01, 100000000000000000)]
        [DisplayName("Avg Diff 24hr")]
        [DisplayFormat(DataFormatString = "{0:0.00}", ApplyFormatInEditMode = true)]
        public decimal Diff24hr { get; set; }

        [NotMapped]
        public List<MiningCalcResult> Results { get; set; }

        [NotMapped]
        public string ResultsJson
        {
            get
            {
                return JsonConvert.SerializeObject(Results, Formatting.Indented,
                    new JsonSerializerSettings { DateFormatHandling = DateFormatHandling.IsoDateFormat });
            }

        }
    }
}