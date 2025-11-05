import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData as LightweightCandlestickData, LineStyle, UTCTimestamp, LineData, HistogramData, CrosshairMode } from 'lightweight-charts';
import { CandlestickData, ChartOHLCV } from '../types';
import Icon from './Icon';

interface AdvancedTradingChartProps {
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

// Calculate EMA
const calculateEMA = (data: CandlestickData[], period: number): LineData[] => {
  const multiplier = 2 / (period + 1);
  const emaData: LineData[] = [];
  let ema = data.slice(0, period).reduce((sum, d) => sum + d.close, 0) / period;
  
  data.forEach((d, i) => {
    if (i >= period - 1) {
      ema = (d.close - ema) * multiplier + ema;
      emaData.push({ time: d.time as UTCTimestamp, value: ema });
    }
  });
  return emaData;
};

// Calculate Bollinger Bands
const calculateBollingerBands = (data: CandlestickData[], period: number = 20, stdDev: number = 2) => {
  const upper: LineData[] = [];
  const middle: LineData[] = [];
  const lower: LineData[] = [];

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const avg = slice.reduce((sum, d) => sum + d.close, 0) / period;
    const variance = slice.reduce((sum, d) => sum + Math.pow(d.close - avg, 2), 0) / period;
    const std = Math.sqrt(variance);

    middle.push({ time: data[i].time as UTCTimestamp, value: avg });
    upper.push({ time: data[i].time as UTCTimestamp, value: avg + stdDev * std });
    lower.push({ time: data[i].time as UTCTimestamp, value: avg - stdDev * std });
  }

  return { upper, middle, lower };
};

// Calculate MACD
const calculateMACD = (data: CandlestickData[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9) => {
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  
  const macdLine: LineData[] = [];
  const minLength = Math.min(fastEMA.length, slowEMA.length);
  
  for (let i = 0; i < minLength; i++) {
    macdLine.push({
      time: fastEMA[i].time,
      value: fastEMA[i].value - slowEMA[i].value,
    });
  }

  const signalLine = calculateEMA(
    macdLine.map((d, i) => ({
      time: d.time as UTCTimestamp,
      open: d.value,
      high: d.value,
      low: d.value,
      close: d.value,
      value: 0,
    })),
    signalPeriod
  );

  const histogram: HistogramData[] = [];
  for (let i = 0; i < Math.min(macdLine.length, signalLine.length); i++) {
    const value = macdLine[i].value - signalLine[i].value;
    histogram.push({
      time: macdLine[i].time,
      value: value,
      color: value >= 0 ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
    });
  }

  return { macdLine, signalLine, histogram };
};

const OHLCVDisplay: React.FC<{ ohlcv: ChartOHLCV, latestPrice: number }> = ({ ohlcv, latestPrice }) => {
  const displayData = { O: ohlcv.open, H: ohlcv.high, L: ohlcv.low, C: ohlcv.close };
  const changeColor = (ohlcv.change ?? 0) >= 0 ? 'text-success' : 'text-danger';
  
  return (
    <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-mono overflow-x-auto">
      {Object.entries(displayData).map(([key, value]) => (
        <div key={key} className="flex items-center whitespace-nowrap">
          <span className="text-gray-500 dark:text-gray-400 font-semibold">{key}</span>
          <span className="ml-1.5 text-gray-800 dark:text-gray-200 font-medium">
            {value?.toFixed(2) || '----'}
          </span>
        </div>
      ))}
      {ohlcv.change !== undefined && (
        <div className={`${changeColor} font-semibold flex items-center space-x-2 whitespace-nowrap`}>
          <span>{ohlcv.change >= 0 ? '+' : ''}{ohlcv.change.toFixed(2)}</span>
          <span>({ohlcv.changePercent?.toFixed(2)}%)</span>
        </div>
      )}
      <div className="flex items-center whitespace-nowrap">
        <span className="text-gray-500 dark:text-gray-400 font-semibold">Vol</span>
        <span className="ml-1.5 text-gray-800 dark:text-gray-200 font-medium">
          {ohlcv.volume ? (ohlcv.volume / 1000000).toFixed(2) + 'M' : '----'}
        </span>
      </div>
    </div>
  );
};

const AdvancedTradingChart: React.FC<AdvancedTradingChartProps> = ({ data, theme, symbol, exchange, timeframe, gridLines = [], rsiData = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<{ chart: IChartApi | null; series: { [key: string]: ISeriesApi<any> | null }, priceLines: any[] }>({ 
    chart: null, 
    series: {}, 
    priceLines: [] 
  });

  const [ohlcv, setOhlcv] = useState<ChartOHLCV>({});
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area'>('candlestick');
  const [showVolume, setShowVolume] = useState(true);
  const [activeIndicators, setActiveIndicators] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [showIndicatorMenu, setShowIndicatorMenu] = useState(false);

  const availableIndicators = [
    { id: 'rsi', name: 'RSI (14)', enabled: rsiData.length > 0 },
    { id: 'ema9', name: 'EMA (9)', enabled: true },
    { id: 'ema21', name: 'EMA (21)', enabled: true },
    { id: 'ema50', name: 'EMA (50)', enabled: true },
    { id: 'bb', name: 'Bollinger Bands', enabled: true },
    { id: 'macd', name: 'MACD (12, 26, 9)', enabled: true },
  ];

  const toggleIndicator = (id: string) => {
    setActiveIndicators(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

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
        scaleMargins: { 
          top: 0.1, 
          bottom: activeIndicators.includes('rsi') || activeIndicators.includes('macd') ? 0.4 : showVolume ? 0.25 : 0.1 
        },
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
        fontSize: 48,
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

    // Main series
    let mainSeries: any;
    if (chartType === 'candlestick') {
      mainSeries = chart.addCandlestickSeries(candlestickSeriesOptions);
    } else if (chartType === 'line') {
      mainSeries = chart.addLineSeries({
        color: '#2962FF',
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 6,
      });
    } else if (chartType === 'area') {
      mainSeries = chart.addAreaSeries({
        topColor: 'rgba(41, 98, 255, 0.4)',
        bottomColor: 'rgba(41, 98, 255, 0.0)',
        lineColor: '#2962FF',
        lineWidth: 2,
      });
    }
    chartRef.current.series.main = mainSeries;

    // Volume
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: { type: 'volume' },
        priceScaleId: '',
      });
      chartRef.current.series.volume = volumeSeries;
    }

    // EMA Indicators
    if (activeIndicators.includes('ema9')) {
      const ema9Series = chart.addLineSeries({
        color: '#FF6D00',
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      chartRef.current.series.ema9 = ema9Series;
    }

    if (activeIndicators.includes('ema21')) {
      const ema21Series = chart.addLineSeries({
        color: '#2196F3',
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      chartRef.current.series.ema21 = ema21Series;
    }

    if (activeIndicators.includes('ema50')) {
      const ema50Series = chart.addLineSeries({
        color: '#9C27B0',
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      chartRef.current.series.ema50 = ema50Series;
    }

    // Bollinger Bands
    if (activeIndicators.includes('bb')) {
      const bbUpper = chart.addLineSeries({
        color: 'rgba(33, 150, 243, 0.4)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      const bbMiddle = chart.addLineSeries({
        color: 'rgba(33, 150, 243, 0.6)',
        lineWidth: 1,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      const bbLower = chart.addLineSeries({
        color: 'rgba(33, 150, 243, 0.4)',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      chartRef.current.series.bbUpper = bbUpper;
      chartRef.current.series.bbMiddle = bbMiddle;
      chartRef.current.series.bbLower = bbLower;
    }

    // RSI
    if (activeIndicators.includes('rsi') && rsiData.length > 0) {
      const rsiSeries = chart.addLineSeries({
        priceScaleId: '',
        color: '#FF6D00',
        lineWidth: 2,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => price.toFixed(2),
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
    }

    // MACD
    if (activeIndicators.includes('macd')) {
      const macdSeries = chart.addLineSeries({
        priceScaleId: '',
        color: '#2196F3',
        lineWidth: 2,
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => price.toFixed(4),
        },
      });
      const signalSeries = chart.addLineSeries({
        priceScaleId: '',
        color: '#FF6D00',
        lineWidth: 2,
      });
      const histogramSeries = chart.addHistogramSeries({
        priceScaleId: '',
      });
      chartRef.current.series.macd = macdSeries;
      chartRef.current.series.macdSignal = signalSeries;
      chartRef.current.series.macdHistogram = histogramSeries;
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
  }, [theme, chartType, showVolume, activeIndicators, rsiData.length > 0]);

  useEffect(() => {
    const { main, volume, ema9, ema21, ema50, bbUpper, bbMiddle, bbLower, rsi, macd, macdSignal, macdHistogram } = chartRef.current.series;
    
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

    if (ema9) ema9.setData(calculateEMA(data, 9));
    if (ema21) ema21.setData(calculateEMA(data, 21));
    if (ema50) ema50.setData(calculateEMA(data, 50));

    if (bbUpper && bbMiddle && bbLower) {
      const bb = calculateBollingerBands(data);
      bbUpper.setData(bb.upper);
      bbMiddle.setData(bb.middle);
      bbLower.setData(bb.lower);
    }

    if (rsi && rsiData.length > 0) {
      rsi.setData(rsiData as LineData[]);
    }

    if (macd && macdSignal && macdHistogram) {
      const macdData = calculateMACD(data);
      macd.setData(macdData.macdLine);
      macdSignal.setData(macdData.signalLine);
      macdHistogram.setData(macdData.histogram);
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
  }, [data, gridLines, rsiData, chartType, showVolume, activeIndicators]);

  return (
    <div className="w-full h-full bg-white dark:bg-[#0f1419] text-gray-900 dark:text-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722] gap-2">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <h2 className="font-bold text-base sm:text-lg">{symbol}</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded whitespace-nowrap">
              {exchange}
            </span>
          </div>
          <OHLCVDisplay ohlcv={ohlcv} latestPrice={data[data.length - 1]?.close || 0} />
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden flex-shrink-0">
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="hidden sm:inline">Candles</span>
              <span className="sm:hidden">C</span>
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-300 dark:border-gray-700 ${
                chartType === 'line'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="hidden sm:inline">Line</span>
              <span className="sm:hidden">L</span>
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-2 sm:px-3 py-1.5 text-xs font-medium transition-colors border-l border-gray-300 dark:border-gray-700 ${
                chartType === 'area'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="hidden sm:inline">Area</span>
              <span className="sm:hidden">A</span>
            </button>
          </div>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex-shrink-0 ${
              showVolume
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Vol
          </button>
          <div className="relative">
            <button
              onClick={() => setShowIndicatorMenu(!showIndicatorMenu)}
              className="px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-1 flex-shrink-0"
            >
              <Icon name="indicators" className="h-4 w-4" />
              <span className="hidden sm:inline">Indicators</span>
              {activeIndicators.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">{activeIndicators.length}</span>
              )}
            </button>
            {showIndicatorMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-2 max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                  <h3 className="text-sm font-semibold">Technical Indicators</h3>
                  <button onClick={() => setShowIndicatorMenu(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <Icon name="close" className="h-4 w-4" />
                  </button>
                </div>
                {availableIndicators.map(indicator => (
                  <button
                    key={indicator.id}
                    onClick={() => {
                      if (indicator.enabled) toggleIndicator(indicator.id);
                    }}
                    disabled={!indicator.enabled}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                      activeIndicators.includes(indicator.id)
                        ? 'bg-primary text-white'
                        : indicator.enabled
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {indicator.name}
                    {activeIndicators.includes(indicator.id) && <span className="float-right">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block">
            <Icon name="settings" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-1 px-2 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722] overflow-x-auto">
        {['1m', '5m', '15m', '1h', '4h', '1D', '1W', '1M'].map(tf => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`px-2 sm:px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedTimeframe === tf
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Active Indicators Badge */}
      {activeIndicators.length > 0 && (
        <div className="px-2 sm:px-4 py-1.5 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722]">
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Active:</span>
            {activeIndicators.map(id => {
              const indicator = availableIndicators.find(i => i.id === id);
              return (
                <span key={id} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded flex items-center space-x-1">
                  <span>{indicator?.name}</span>
                  <button onClick={() => toggleIndicator(id)} className="hover:text-danger">×</button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Chart */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={chartContainerRef} className="absolute inset-0"></div>
      </div>

      {/* Footer - Drawing Tools */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-t border-gray-200 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-[#131722]">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Trend Line">
            <Icon name="trending" className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Horizontal Line">
            <Icon name="minus" className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Add Alert">
            <Icon name="bell" className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block" title="Fullscreen">
            <Icon name="maximize" className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="hidden sm:inline">Advanced Chart</span>
          <span className="hidden sm:inline">•</span>
          <span>{data.length} bars</span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTradingChart;
