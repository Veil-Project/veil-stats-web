using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VeilStats.DTO.Chart;

namespace VeilStats.DTO.History
{
    public class HistoryData
    {
        public LineGraph PosDiff { get; set; }
        public LineGraph PowDiff { get; set; }
    }
}
