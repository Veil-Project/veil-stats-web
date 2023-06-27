using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.ApiModel
{


    public class ZcLimp
    {
        public string status { get; set; }
        public int startTime { get; set; }
        public int timeout { get; set; }
        public int since { get; set; }
    }

    public class Bip9Softforks
    {
        public ZcLimp zc_limp { get; set; }
    }

    public class BlockchainInfo
    {
        public string chain { get; set; }
        public int blocks { get; set; }
        public long moneysupply { get; set; }
        public string moneysupply_formatted { get; set; }
        public List<Zerocoinsupply> zerocoinsupply { get; set; }
        public int headers { get; set; }
        public string bestblockhash { get; set; }
        public int difficulty_pow { get; set; }
        public double difficulty_randomx { get; set; }
        public double difficulty_progpow { get; set; }
        public double difficulty_sha256d { get; set; }
        public double difficulty_pos { get; set; }
        public int mediantime { get; set; }
        public double verificationprogress { get; set; }
        public bool initialblockdownload { get; set; }
        public string chainwork { get; set; }
        public string chainpow { get; set; }
        public long size_on_disk { get; set; }
        public bool pruned { get; set; }
        public Bip9Softforks bip9_softforks { get; set; }
        public string warnings { get; set; }
    }

    public class Root
    {
        public BlockchainInfo result { get; set; }
        public object error { get; set; }
        public string id { get; set; }
    }
}
