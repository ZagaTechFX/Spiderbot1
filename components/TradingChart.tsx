import React, { useEffect, useRef, memo, useState } from 'react';
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
  background: { color: theme === 'dark' ? '#0f1419' : '#ffffff' },
  textColor: theme === 'dark' ? '#d1d4dc' : '#1a202c',
});

const chartGrid = (theme: 'light' | 'dark') => ({
  vertLines: { color: theme === 'dark' ? '#1c2127' : '#f0f0f0', style: LineStyle.Solid },
  horzLines: { color: theme === 'dark' ? '#1c2127' : '#f0f0f0', style: LineStyle.Solid },
});

const candlestickSeriesOptions = {
  upColor: '#26a69a',
  downColor: '#ef5350',
  borderDownColor: '#ef5350',
  borderUpColor: '#26a69a',
  wickDownColor: '#ef5350',
  wickUpColor: '#26a69a',
};

const OHLCVDisplay: React.FC<{ ohlcv: ChartOHLCV, latestPrice: number }> = ({ ohlcv, latestPrice }) => {
  const displayData = { O: ohlcv.open, H: ohlcv.high, L: ohlcv.low, C: ohlcv.close };
  const changeColor = (ohlcv.change ?? 0) >= 0 ? 'text-success' : 'text-danger';
  
  return (
    <div className="flex items-center space-x-4 text-xs font-mono">
      {Object.entries(displayData).map(([key, value]) => (
        <div key={key} className="flex items-center">
          <span className="text-gray-500 dark:text-gray-400 font-semibold">{key}</span>
          <span className="ml-1.5 text-gray-800 dark:text-gray-200 font-medium">
            {value?.toFixed(2) || '----'}
          </span>
        </div>
      ))}
      {ohlcv.change !== undefined && (
        <div className={`${changeColor} font-semibold flex items-center space-x-2`}>
          <span>{ohlcv.change >= 0 ? '+' : ''}{ohlcv.change.toFixed(2)}</span>
          <span>({ohlcv.changePercent?.toFixed(2)}%)</span>
        </div>
      )}
      <div className="flex items-center">
        <span className="text-gray-500 dark:text-gray-400 font-semibold">Vol</span>
        <span className="ml-1.5 text-gray-800 dark:text-gray-200 font-medium">
          {ohlcv.volume ? (ohlcv.volume / 1000000).toFixed(2) + 'M' : '----'}
        </span>
      </div>
    </div>
  );
};

const TradingChart: React.FC<TradingChartProps> = ({ data, theme, symbol, exchange, timeframe, gridLines = [], rsiData = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{ chart: IChartApi | null; series: { [key: string]: ISeriesApi<any> | null }, priceLines: any[] }>({ 
    chart: null, 
    series: {}, 
    priceLines: [] 
  });

  const [ohlcv, setOhlcv] = useState<ChartOHLCV>({});
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area'>('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(rsiData.length > 0);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer || !data.length) return;

    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
      layout: chartLayout(theme),
      grid: chartGrid(theme),
      crosshair: { 
        mode: CrosshairMode.Normal,
        vertLine: {
          color: theme === 'dark' ? '#758696' : '#9598A1',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: theme === 'dark' ? '#363c4e' : '#4c525e',
        },
        horzLine: {
          color: theme === 'dark' ? '#758696' : '#9598A1',
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: theme === 'dark' ? '#363c4e' : '#4c525e',
        },
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? '#2b2b43' : '#d1d4dc',
        scaleMargins: { top: 0.1, bottom: showVolume && showRSI ? 0.4 : showVolume || showRSI ? 0.3 : 0.1 },
      },
      timeScale: {
        borderColor: theme === 'dark' ? '#2b2b43' : '#d1d4dc',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chart.applyOptions({
      watermark: {
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        visible: true,
        text: `${symbol}`,
        fontSize: 64,
        fontFamily: 'Helvetica Neue, sans-serif',
        fontStyle: 'bold',
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

    let mainSeries: any;
    if (chartType === 'candlestick') {
      mainSeries = (chart as any).addCandlestickSeries(candlestickSeriesOptions);
    } else if (chartType === 'line') {
      mainSeries = (chart as any).addLineSeries({
        color: '#2962FF',
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 6,
      });
    } else if (chartType === 'area') {
      mainSeries = (chart as any).addAreaSeries({
        topColor: 'rgba(41, 98, 255, 0.4)',
        bottomColor: 'rgba(41, 98, 255, 0.0)',
        lineColor: '#2962FF',
        lineWidth: 2,
      });
    }
    chartRef.current.series.main = mainSeries;

    if (showVolume) {
      const volumeSeries = (chart as any).addHistogramSeries({
        color: '#26a69a',
        priceFormat: { type: 'volume' },
        priceScaleId: '',
        scaleMargins: {
          top: showRSI ? 0.6 : 0.7,
          bottom: showRSI ? 0.2 : 0,
        },
      });
      chartRef.current.series.volume = volumeSeries;
    }

    if (showRSI && rsiData && rsiData.length > 0) {
      const rsiSeries = (chart as any).addLineSeries({
        priceScaleId: '',
        color: '#FF6D00',
        lineWidth: 2,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => price.toFixed(2),
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
      chartRef.current.series.rsi = rsiSeries;

      rsiSeries.createPriceLine({
        price: 70,
        color: '#ef5350',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Overbought',
      });
      rsiSeries.createPriceLine({
        price: 30,
        color: '#26a69a',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Oversold',
      });
      rsiSeries.createPriceLine({
        price: 50,
        color: theme === 'dark' ? '#4a5568' : '#cbd5e0',
        lineWidth: 1,
        lineStyle: LineStyle.Dotted,
        axisLabelVisible: false,
      });
    }

    const latestPrice = data[data.length - 1]?.close || 0;
    const latestPriceLine = mainSeries.createPriceLine({
      price: latestPrice,
      color: theme === 'dark' ? '#2962FF' : '#1e88e5',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      axisLabelVisible: true,
      title: 'Last',
    });
    chartRef.current.priceLines.push(latestPriceLine);

    chart.subscribeCrosshairMove(param => {
      if (param.time && param.seriesData.size > 0 && mainSeries) {
        const mainData = param.seriesData.get(mainSeries);
        let candle: any;
        
        if (chartType === 'candlestick') {
          candle = mainData as LightweightCandlestickData;
        } else {
          const lineData = mainData as LineData;
          if (lineData && param.logical !== undefined && data[param.logical]) {
            const originalCandle = data[param.logical];
            candle = {
              open: originalCandle.open,
              high: originalCandle.high,
              low: originalCandle.low,
              close: lineData.value,
            };
          }
        }

        const volumeSeries = chartRef.current.series.volume;
        const volumeData = volumeSeries ? param.seriesData.get(volumeSeries) as HistogramData : null;
        const volume = volumeData?.value;

        if (!candle || param.logical === undefined) {
          setOhlcv({});
          return;
        }

        if (param.logical > 0 && data[param.logical - 1]) {
          const previousClose = data[param.logical - 1].close;
          if (previousClose !== undefined) {
            const change = candle.close - previousClose;
            const changePercent = (change / previousClose) * 100;
            setOhlcv({
              open: candle.open,
              high: candle.high,
              low: candle.low,
              close: candle.close,
              volume: volume,
              change,
              changePercent,
            });
            return;
          }
        }

        setOhlcv({
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
          volume: volume,
        });
      } else {
        const latest = data[data.length - 1];
        if (latest && data.length > 1) {
          const previous = data[data.length - 2];
          const change = latest.close - previous.close;
          const changePercent = (change / previous.close) * 100;
          setOhlcv({
            open: latest.open,
            high: latest.high,
            low: latest.low,
            close: latest.close,
            volume: latest.value,
            change,
            changePercent,
          });
        }
      }
    });

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current.chart = null;
      chartRef.current.series = {};
      chartRef.current.priceLines = [];
    };
  }, [theme, chartType, showVolume, showRSI, rsiData.length > 0]);

  useEffect(() => {
    const { main, volume, rsi } = chartRef.current.series;
    
    if (main) {
      if (chartType === 'candlestick') {
        main.setData(data as LightweightCandlestickData[]);
      } else {
        const lineData = data.map(d => ({ time: d.time, value: d.close }));
        main.setData(lineData as LineData[]);
      }
    }

    if (volume && showVolume) {
      const volumeData = data.map(d => ({
        time: d.time,
        value: d.value || 0,
        color: d.close >= d.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
      }));
      volume.setData(volumeData as HistogramData[]);
    }

    if (rsi && showRSI) {
      rsi.setData(rsiData as LineData[]);
    }

    if (main && gridLines.length > 0) {
      chartRef.current.priceLines.forEach(line => main.removePriceLine(line));
      chartRef.current.priceLines = [];
      
      gridLines.forEach(line => {
        const priceLine = main.createPriceLine({
          price: line.price,
          color: line.color,
          lineWidth: 2,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: line.label,
        });
        chartRef.current.priceLines.push(priceLine);
      });
    }

    chartRef.current.chart?.timeScale().fitContent();
  }, [data, gridLines, rsiData, chartType, showVolume, showRSI]);

  return (
    <div className="w-full h-full bg-white dark:bg-[#0f1419] text-gray-900 dark:text-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-bold text-lg">{symbol}</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              {exchange}
            </span>
          </div>
          <OHLCVDisplay ohlcv={ohlcv} latestPrice={data[data.length - 1]?.close || 0} />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-300 dark:border-gray-700 ${
                chartType === 'line'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-300 dark:border-gray-700 ${
                chartType === 'area'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Area
            </button>
          </div>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              showVolume
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Volume
          </button>
          {rsiData.length > 0 && (
            <button
              onClick={() => setShowRSI(!showRSI)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                showRSI
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              RSI
            </button>
          )}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Icon name="indicators" className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Icon name="settings" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-1 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722]">
        {['1m', '5m', '15m', '1h', '4h', '1D', '1W', '1M'].map(tf => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedTimeframe === tf
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={chartContainerRef} className="absolute inset-0"></div>
      </div>

      {/* Footer - Drawing Tools */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722]">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Trend Line">
            <Icon name="trending" className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Horizontal Line">
            <Icon name="minus" className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Add Alert">
            <Icon name="bell" className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span>TradingView Chart</span>
          <span>•</span>
          <span>{data.length} bars</span>
        </div>
      </div>
    </div>
  );
};

export default memo(TradingChart);
