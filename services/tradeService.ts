import { supabase } from '../lib/supabase';
import { ActivePosition, TradeHistory } from '../types';

export const tradeService = {
  async createPosition(
    userId: string,
    strategyId: string,
    symbol: string,
    entryPrice: number,
    quantity: number,
    currentPrice: number,
    position: 'Long' | 'Short',
    exchange: string
  ): Promise<ActivePosition> {
    const { data, error } = await supabase
      .from('active_positions')
      .insert({
        user_id: userId,
        strategy_id: strategyId,
        symbol,
        entry_price: entryPrice,
        quantity,
        current_price: currentPrice,
        pnl: (currentPrice - entryPrice) * quantity,
        position,
        exchange,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      symbol: data.symbol,
      entryPrice: data.entry_price,
      quantity: data.quantity,
      currentPrice: data.current_price,
      pnl: data.pnl,
      position: data.position,
      exchange: data.exchange,
    };
  },

  async getUserPositions(userId: string): Promise<ActivePosition[]> {
    const { data, error } = await supabase
      .from('active_positions')
      .select('*')
      .eq('user_id', userId)
      .order('opened_at', { ascending: false });

    if (error) throw error;

    return data.map((position) => ({
      symbol: position.symbol,
      entryPrice: position.entry_price,
      quantity: position.quantity,
      currentPrice: position.current_price,
      pnl: position.pnl,
      position: position.position,
      exchange: position.exchange,
    }));
  },

  async updatePosition(
    positionId: string,
    userId: string,
    currentPrice: number,
    pnl: number
  ): Promise<ActivePosition> {
    const { data, error } = await supabase
      .from('active_positions')
      .update({
        current_price: currentPrice,
        pnl,
      })
      .eq('id', positionId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      symbol: data.symbol,
      entryPrice: data.entry_price,
      quantity: data.quantity,
      currentPrice: data.current_price,
      pnl: data.pnl,
      position: data.position,
      exchange: data.exchange,
    };
  },

  async closePosition(positionId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('active_positions')
      .delete()
      .eq('id', positionId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  async logTrade(
    userId: string,
    strategyId: string,
    symbol: string,
    entryPrice: number,
    exitPrice: number,
    quantity: number,
    pnl: number,
    position: 'Long' | 'Short',
    mode: 'Demo' | 'Real',
    strategyName: string
  ): Promise<TradeHistory> {
    const { data, error } = await supabase
      .from('trade_history')
      .insert({
        user_id: userId,
        strategy_id: strategyId,
        symbol,
        entry_price: entryPrice,
        exit_price: exitPrice,
        quantity,
        pnl,
        position,
        mode,
        strategy_name: strategyName,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      symbol: data.symbol,
      entryPrice: data.entry_price,
      exitPrice: data.exit_price,
      quantity: data.quantity,
      pnl: data.pnl,
      position: data.position,
      date: data.traded_at,
      mode: data.mode,
      strategy: data.strategy_name,
    };
  },

  async getUserTradeHistory(userId: string): Promise<TradeHistory[]> {
    const { data, error } = await supabase
      .from('trade_history')
      .select('*')
      .eq('user_id', userId)
      .order('traded_at', { ascending: false });

    if (error) throw error;

    return data.map((trade) => ({
      symbol: trade.symbol,
      entryPrice: trade.entry_price,
      exitPrice: trade.exit_price,
      quantity: trade.quantity,
      pnl: trade.pnl,
      position: trade.position,
      date: trade.traded_at,
      mode: trade.mode,
      strategy: trade.strategy_name,
    }));
  },

  async getStrategyTradeHistory(
    userId: string,
    strategyId: string
  ): Promise<TradeHistory[]> {
    const { data, error } = await supabase
      .from('trade_history')
      .select('*')
      .eq('user_id', userId)
      .eq('strategy_id', strategyId)
      .order('traded_at', { ascending: false });

    if (error) throw error;

    return data.map((trade) => ({
      symbol: trade.symbol,
      entryPrice: trade.entry_price,
      exitPrice: trade.exit_price,
      quantity: trade.quantity,
      pnl: trade.pnl,
      position: trade.position,
      date: trade.traded_at,
      mode: trade.mode,
      strategy: trade.strategy_name,
    }));
  },
};
