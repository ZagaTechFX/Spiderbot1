import React, { useContext } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { ThemeContext } from '../App';

interface TradingViewWidgetProps {
  symbol?: string;
  exchange?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ 
  symbol = 'BTCUSDT',
  exchange = 'BINANCE'
}) => {
  const { theme } = useContext(ThemeContext);
  
  const fullSymbol = `${exchange}:${symbol}`;

  return (
    <div className="w-full h-full">
      <AdvancedRealTimeChart
        theme={theme === 'dark' ? 'dark' : 'light'}
        autosize
        symbol={fullSymbol}
        interval="D"
        timezone="Etc/UTC"
        style="1"
        locale="en"
        enable_publishing={false}
        allow_symbol_change={true}
        details={true}
        hotlist={false}
        calendar={false}
        studies={[
          'RSI@tv-basicstudies',
          'MASimple@tv-basicstudies',
          'MACD@tv-basicstudies',
          'BB@tv-basicstudies'
        ]}
        show_popup_button={true}
        popup_width="1000"
        popup_height="650"
        container_id={`tradingview_${symbol}`}
      />
    </div>
  );
};

export default TradingViewWidget;
