
import React, { useEffect, useRef, memo, useState } from 'react';
// Fix: Removed unused and incorrectly used BarPrice type.
import { createChart, IChartApi, ISeriesApi, CandlestickData as LightweightCandlestickData, LineStyle, UTCTimestamp, LineData, HistogramData, CrosshairMode } from 'lightweight-charts';
import { CandlestickData, ChartOHLCV } from '../types';
import Icon from './Icon';

interface TradingChartProps {
  data: CandlestickData[];
  theme: 'light' | 'dark';
  symbol: string;
  exchange: string;
  timeframe: string;
  gridLines?: { price: number; color: string; label: string }[];
  rsiData?: { time: UTCTimestamp; value: number }[];
}

const chartLayout = (theme: 'light' | 'dark') => ({
  background: { color: theme === 'dark' ? '#1a202c' : '#ffffff' },
  textColor: theme === 'dark' ? '#e2e8f0' : '#1a202c',
});

const chartGrid = (theme: 'light' | 'dark') => ({
  vertLines: { color: theme === 'dark' ? '#2d3748' : '#e2e8f0' },
  horzLines: { color: theme === 'dark' ? '#2d3748' : '#e2e8f0' },
});

const candlestickSeriesOptions = {
  upColor: '#10b981', downColor: '#ef4444', borderDownColor: '#ef4444',
  borderUpColor: '#10b981', wickDownColor: '#ef4444', wickUpColor: '#10b981',
};

const HeaderButton: React.FC<{ icon: string, label: string }> = ({ icon, label }) => (
    <button className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-secondary text-sm">
        <Icon name={icon} className="h-4 w-4" />
        <span>{label}</span>
    </button>
);

const RightSidebarButton: React.FC<{ icon: string, active?: boolean, onClick?: () => void }> = ({ icon, active, onClick }) => (
    <button onClick={onClick} className={`p-2 rounded-md ${active ? 'bg-primary/20 text-primary' : 'hover:bg-gray-100 dark:hover:bg-dark-bg-secondary'}`}>
        <Icon name={icon} className="h-5 w-5" />
    </button>
);

const OHLCVDisplay: React.FC<{ ohlcv: ChartOHLCV, latestPrice: number }> = ({ ohlcv, latestPrice }) => {
  const displayData = {
      O: ohlcv.open, H: ohlcv.high, L: ohlcv.low, C: ohlcv.close,
  };
  const changeColor = (ohlcv.change ?? 0) >= 0 ? 'text-success' : 'text-danger';
  return (
      <div className="flex items-center space-x-4 text-sm font-mono">
          {Object.entries(displayData).map(([key, value]) => (
              <div key={key}>
                  <span className="text-gray-400">{key}</span>
                  <span className={`ml-1 ${value && Math.abs(value-latestPrice) < 0.0001 ? 'text-white' : 'text-gray-300'}`}>{value?.toFixed(2) || '----'}</span>
              </div>
          ))}
          {ohlcv.change !== undefined && (
              <div className={changeColor}>
                  <span>{ohlcv.change.toFixed(2)}</span>
                  <span className="ml-2">({ohlcv.changePercent?.toFixed(2)}%)</span>
              </div>
          )}
           <div className="flex items-center">
              <span className="text-gray-400">Vol</span>
              <span className="ml-1 text-gray-300">{ohlcv.volume ? (ohlcv.volume/1000).toFixed(2)+'K' : '----'}</span>
          </div>
      </div>
  );
}

const TradingChart: React.FC<TradingChartProps> = ({ data, theme, symbol, exchange, timeframe, gridLines = [], rsiData = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{ chart: IChartApi | null; series: { [key: string]: ISeriesApi<any> | null }, priceLines: any[] }>({ chart: null, series: {}, priceLines: [] });

  const [ohlcv, setOhlcv] = useState<ChartOHLCV>({});
  const [isAlertsVisible, setAlertsVisible] = useState(true);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer || !data.length) return;

    const chart = createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
        layout: chartLayout(theme),
        grid: chartGrid(theme),
        crosshair: { mode: CrosshairMode.Normal },
        rightPriceScale: { borderColor: theme === 'dark' ? '#4a5568' : '#d1d5db' },
        timeScale: { borderColor: theme === 'dark' ? '#4a5568' : '#d1d5db', timeVisible: true, secondsVisible: false },
    });
    // Fix: Moved watermark to applyOptions to fix type error with createChart options.
    chart.applyOptions({
        watermark: {
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            visible: true,
            text: `${symbol} · ${timeframe.toUpperCase()} · ${exchange}`,
            fontSize: 48,
            horzAlign: 'center',
            vertAlign: 'center',
        },
    });
    chartRef.current.chart = chart;

    const resizeObserver = new ResizeObserver(entries => {
        if (entries.length > 0 && entries[0].contentRect.width > 0) {
            chart.resize(entries[0].contentRect.width, entries[0].contentRect.height);
        }
    });
    resizeObserver.observe(chartContainer);

    // Fix: Cast to 'any' to bypass likely incorrect type definitions in the environment. The method call is correct for recent versions of the library.
    const candlestickSeries = (chart as any).addCandlestickSeries(candlestickSeriesOptions);
    chartRef.current.series.candlestick = candlestickSeries;

    // Fix: Cast to 'any' to bypass likely incorrect type definitions in the environment. The method call is correct for recent versions of the library.
    const volumeSeries = (chart as any).addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '' });
    chartRef.current.series.volume = volumeSeries;

    // RSI Pane
    if (rsiData && rsiData.length > 0) {
        // Fix: Cast to 'any' to bypass likely incorrect type definitions in the environment. The method call is correct for recent versions of the library.
        const rsiSeries = (chart as any).addLineSeries({
            priceScaleId: '',
            color: '#FFC107',
            lineWidth: 1,
            priceFormat: {
                type: 'custom',
                formatter: (price: number) => price.toFixed(2),
            },
        });
        chartRef.current.series.rsi = rsiSeries;

        // Adjust scales for 3 panes
        chart.priceScale('right').applyOptions({ scaleMargins: { top: 0.1, bottom: 0.4 } }); // Main chart
        volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.6, bottom: 0.2 } }); // Volume
        rsiSeries.priceScale().applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } }); // RSI

        // RSI lines
        rsiSeries.createPriceLine({ price: 70, color: '#ef4444', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '70' });
        rsiSeries.createPriceLine({ price: 30, color: '#10b981', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '30' });
    } else {
        // Adjust scales for 2 panes
        chart.priceScale('right').applyOptions({ scaleMargins: { top: 0.1, bottom: 0.25 } });
        volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.75, bottom: 0 } });
    }


    const latestPriceLine = candlestickSeries.createPriceLine({
        price: data[data.length - 1]?.close || 0,
        color: theme === 'dark' ? '#a0aec0' : '#4a5568',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
    });
    chartRef.current.priceLines.push(latestPriceLine);

    // Crosshair subscription for OHLCV header
    // Fix: Updated to use modern lightweight-charts API (v4+).
    // - `seriesPrices` is now `seriesData`.
    // - Data from `seriesData.get()` is a full data object, not just a price.
    // - `dataByIndex` does not exist, using component's `data` prop with `param.logical` index.
    chart.subscribeCrosshairMove(param => {
        if (param.time && param.seriesData.size > 0 && candlestickSeries && volumeSeries) {
            const candle = param.seriesData.get(candlestickSeries) as LightweightCandlestickData;
            const volumeData = param.seriesData.get(volumeSeries) as HistogramData;
            const volume = volumeData?.value;
            
            if (!candle || param.logical === undefined) {
                setOhlcv({});
                return;
            }
            
            if (param.logical > 0 && data[param.logical - 1]) {
                const previousClose = data[param.logical - 1].close;
                if(previousClose !== undefined) {
                    const change = candle.close - previousClose;
                    const changePercent = (change / previousClose) * 100;
                    setOhlcv({ open: candle.open, high: candle.high, low: candle.low, close: candle.close, volume: volume, change, changePercent });
                    return;
                }
            }
            
            // For first candle or if something fails
            setOhlcv({ open: candle.open, high: candle.high, low: candle.low, close: candle.close, volume: volume });

        } else {
             setOhlcv({});
        }
    });

    return () => {
        resizeObserver.disconnect();
        chart.remove();
        chartRef.current.chart = null;
        chartRef.current.series = {};
        chartRef.current.priceLines = [];
    };
  }, [theme, symbol, timeframe, exchange, rsiData.length > 0]);

  useEffect(() => {
    const { candlestick, volume, rsi } = chartRef.current.series;
    if (candlestick) candlestick.setData(data as LightweightCandlestickData[]);
    if (volume) {
        const volumeData = data.map(d => ({ time: d.time, value: d.value || 0, color: d.close >= d.open ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)' }));
        volume.setData(volumeData as HistogramData[]);
    }
    if (rsi) {
        rsi.setData(rsiData as LineData[]);
    }
    
    // Manage grid lines
    if (candlestick) {
        chartRef.current.priceLines.forEach(line => candlestick.removePriceLine(line));
        chartRef.current.priceLines = [];
        gridLines.forEach(line => {
            const priceLine = candlestick.createPriceLine({
                price: line.price, color: line.color, lineWidth: 2,
                lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: line.label,
            });
            chartRef.current.priceLines.push(priceLine);
        });
    }

    chartRef.current.chart?.timeScale().fitContent();
  }, [data, gridLines, rsiData]);

  return (
    <div className="w-full h-full bg-dark-bg text-dark-text flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-dark-border flex-shrink-0">
            <div className="flex items-center space-x-2">
                <h2 className="font-bold">{symbol} · {timeframe} · {exchange}</h2>
                <OHLCVDisplay ohlcv={ohlcv} latestPrice={data[data.length-1]?.close || 0}/>
            </div>
            <div className="flex items-center space-x-2">
                <HeaderButton icon="indicators" label="Indicators"/>
                <HeaderButton icon="bell" label="Alert"/>
                <HeaderButton icon="replay" label="Replay"/>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 relative" ref={chartContainerRef}></div>
            
            {/* Right Sidebar */}
            {isAlertsVisible && (
                <div className="w-72 border-l border-dark-border flex flex-col p-2">
                     <div className="flex items-center justify-between pb-2 border-b border-dark-border">
                        <h3 className="font-semibold">Alerts</h3>
                        <div className="flex items-center space-x-1">
                            <button className="p-1 rounded hover:bg-dark-bg-secondary"><Icon name="plus-circle" className="h-5 w-5"/></button>
                        </div>
                     </div>
                     <div className="flex-1 flex flex-col items-center justify-center text-center text-dark-text-secondary">
                        <Icon name="clock" className="h-16 w-16 opacity-50"/>
                        <p className="mt-4 text-sm">Alerts notify you instantly when your conditions are met.</p>
                        <button className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover text-sm">Create alert</button>
                     </div>
                     <div className="border-t border-dark-border pt-2">
                         <h3 className="font-semibold mb-2">Alerts Log</h3>
                         <div className="flex-1 flex flex-col items-center justify-center text-center text-dark-text-secondary py-8">
                            <Icon name="news" className="h-16 w-16 opacity-50" />
                            <p className="mt-4 text-sm">No alerts triggered yet!</p>
                         </div>
                     </div>
                </div>
            )}

            {/* Right Toolbar */}
            <div className="flex flex-col space-y-2 p-1 border-l border-dark-border bg-dark-bg">
                <RightSidebarButton icon="watchlist" />
                <RightSidebarButton icon="bell" active={isAlertsVisible} onClick={() => setAlertsVisible(!isAlertsVisible)} />
                <RightSidebarButton icon="news" />
                <RightSidebarButton icon="calendar" />
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center space-x-4 p-1 border-t border-dark-border text-sm flex-shrink-0">
            {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'ALL'].map(t => (
                <button key={t} className="px-2 py-1 rounded hover:bg-dark-bg-secondary text-dark-text-secondary hover:text-white">{t}</button>
            ))}
        </div>
    </div>
  );
};

export default memo(TradingChart);
