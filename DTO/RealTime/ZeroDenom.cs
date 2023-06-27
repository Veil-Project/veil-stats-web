using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.DTO.RealTime
{
    public class ZeroDenom
    {
        private int _iSupplyDivisor = 100000000;
        private long _iAmount;

        public string denom { get; set; }
        public long amount
        {
            get { return (_iAmount); }
            set { _iAmount = value; }
        }
        public double percentOfSupply { get; set; }
    }
}
