using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VeilStats.DTO.RealTime
{
    public class PieSlice
    {
        public PieSlice()
        {
        }

        public PieSlice(decimal piePercent,string labelText)
        {
            this.y = piePercent;
            this.name = labelText;
        }

        public decimal y { get; set; }
        public string name { get; set; }
    }
}