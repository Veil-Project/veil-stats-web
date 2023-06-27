using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VeilStats.DTO.RealTime
{
    public class RealTimeData
    {
        private CurrentBlock _currentBlock;
        private CurrentPowDiff _currentProgpow;
        private CurrentPowDiff _currentRandomX;
        private CurrentPowDiff _currentShaDiff;
        private CurrentPosDiff _currentPos;
        private List<PieSlice> _zeroSupply;
        private List<PieSlice> _veilSupply;

        public RealTimeData()
        {
            _currentBlock = new CurrentBlock();
            _currentProgpow = new CurrentPowDiff();
            _currentRandomX = new CurrentPowDiff();
            _currentShaDiff = new CurrentPowDiff();
            _currentPos = new CurrentPosDiff();
            _zeroSupply = new List<PieSlice>();
            _veilSupply = new List<PieSlice>();
        }

        public CurrentBlock CurrentBlock
        {
            get { return _currentBlock; }
            set { _currentBlock = value; }
        }
        public CurrentPowDiff CurrentProgpowDiff
        {
            get { return _currentProgpow; }
            set { _currentProgpow = value; }
        }
        public CurrentPowDiff CurrentRandomXDiff
        {
            get { return _currentRandomX; }
            set { _currentRandomX = value; }
        }
        public CurrentPowDiff CurrentShaDiff
        {
            get { return _currentShaDiff; }
            set { _currentShaDiff = value; }
        }
        public CurrentPosDiff CurrentPos
        {
            get { return _currentPos; }
            set { _currentPos = value; }
        }

        public List<PieSlice> ZeroSupply
        {
            get { return _zeroSupply; }
            set { _zeroSupply = value; }
        }
        public List<PieSlice> VeilSupply
        {
            get { return _veilSupply; }
            set { _veilSupply = value; }
        }
        public long TotalZerocoinSupply { get; set; }

    }
}
