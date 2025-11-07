import { supabase } from '../lib/supabase';
import { UserStrategy, StrategyType } from '../types';

export const strategyService = {
  async createStrategy(
    userId: string,
    name: string,
    type: StrategyType,
    pair: string,
    config: any
  ): Promise<UserStrategy> {
    const { data, error } = await supabase
      .from('strategies')
      .insert({
        user_id: userId,
        name,
        type,
        pair,
        status: 'Paused',
        config,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      pair: data.pair,
      status: data.status,
      pnl: data.pnl,
      config: data.config,
    };
  },

  async getUserStrategies(userId: string): Promise<UserStrategy[]> {
    const { data, error } = await supabase
      .from('strategies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((strategy) => ({
      id: strategy.id,
      name: strategy.name,
      type: strategy.type,
      pair: strategy.pair,
      status: strategy.status,
      pnl: strategy.pnl,
      config: strategy.config,
    }));
  },

  async updateStrategy(
    strategyId: string,
    userId: string,
    updates: Partial<UserStrategy>
  ): Promise<UserStrategy> {
    const { data, error } = await supabase
      .from('strategies')
      .update(updates)
      .eq('id', strategyId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      type: data.type,
      pair: data.pair,
      status: data.status,
      pnl: data.pnl,
      config: data.config,
    };
  },

  async deleteStrategy(strategyId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('strategies')
      .delete()
      .eq('id', strategyId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  async updateStrategyStatus(
    strategyId: string,
    userId: string,
    status: 'Active' | 'Paused' | 'Error'
  ): Promise<UserStrategy> {
    return this.updateStrategy(strategyId, userId, { status });
  },

  async updateStrategyConfig(
    strategyId: string,
    userId: string,
    config: any
  ): Promise<UserStrategy> {
    return this.updateStrategy(strategyId, userId, { config });
  },
};
