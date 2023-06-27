using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.ApiModel
{
    public class CoinPrice
    {
        public Price veil { get; set; }

        public class Price
        {
            public decimal usd { get; set; }
            public decimal eur { get; set; }
            public decimal btc { get; set; }
        }
    }
}
