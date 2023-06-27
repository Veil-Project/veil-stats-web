using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.ApiModel
{
    public class Blockbook
    {
        public string coin { get; set; }
        public string host { get; set; }
        public string version { get; set; }
        public string gitcommit { get; set; }
        public DateTime buildtime { get; set; }
        public bool syncMode { get; set; }
        public bool initialsync { get; set; }
        public bool inSync { get; set; }
        public int bestHeight { get; set; }
        public DateTime lastBlockTime { get; set; }
        public bool inSyncMempool { get; set; }
        public string lastMempoolTime { get; set; }
        public int mempoolSize { get; set; }
        public int decimals { get; set; }
        public long dbSize { get; set; }
        public string about { get; set; }
    }
}
