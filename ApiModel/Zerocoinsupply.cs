using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.ApiModel
{
    public class Zerocoinsupply
    {
        private int _iSupplyDivisor = 100000000;
        private long _iAmount;

        public string denom { get; set; }
        public long amount         
        {
            get { return (_iAmount / _iSupplyDivisor); }
            set { _iAmount = value; }
        }
        public double percent { get; set; }
        public string amount_formatted { get; set; }
    }
}
