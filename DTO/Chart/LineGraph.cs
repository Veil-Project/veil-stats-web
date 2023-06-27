using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VeilStats.DTO.Chart
{
    public class LineGraph
    {
        private List<DataPoint> _dataPoints = new List<DataPoint>();

        public List<DataPoint> DataPoints
        {
            get { return _dataPoints; }
            set { _dataPoints = value; }
        }

        private List<string> _labels = new List<string>();
        private List<double> _values = new List<double>();

        public List<string> Labels
        {
            get { return _labels; }
            set { _labels = value; }
        }

        public List<double> Values
        {
            get { return _values; }
            set { _values = value; }
        }
    }
}