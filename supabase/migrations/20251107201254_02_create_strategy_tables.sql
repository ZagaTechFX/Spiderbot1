/*
  # Strategy and Trading Tables

  1. New Tables
    - `strategies` - User trading strategies
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `type` (strategy_type enum)
      - `pair` (text)
      - `status` (strategy_status enum)
      - `config` (jsonb)
      - `pnl` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `active_positions` - Current open positions
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `strategy_id` (uuid)
      - `symbol` (text)
      - `entry_price` (numeric)
      - `quantity` (numeric)
      - `current_price` (numeric)
      - `pnl` (numeric)
      - `position` (position_type enum)
      - `exchange` (text)
      - `opened_at` (timestamptz)

    - `trade_history` - Past trades
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `strategy_id` (uuid)
      - `symbol` (text)
      - `entry_price` (numeric)
      - `exit_price` (numeric)
      - `quantity` (numeric)
      - `pnl` (numeric)
      - `position` (position_type enum)
      - `traded_at` (timestamptz)
      - `mode` (text)
      - `strategy_name` (text)

  2. Security
    - Enable RLS on all tables
    - Users can only view/manage their own strategies and trades
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'strategy_type') THEN
    CREATE TYPE public.strategy_type AS ENUM (
      'Advanced DCA', 'Advanced Grid', 'Signal Bot', 'Quantitative Strategy',
      'Normal Grid', 'Normal DCA', 'TradingView Webhook Bot', 'Dip Analyser Bot',
      'Trend-Following Bot', 'Mean Reversion Bot', 'Volatility Breakout Bot'
    );
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'strategy_status') THEN
    CREATE TYPE public.strategy_status AS ENUM ('Active', 'Paused', 'Error');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'position_type') THEN
    CREATE TYPE public.position_type AS ENUM ('Long', 'Short');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type public.strategy_type NOT NULL,
  pair text NOT NULL,
  status public.strategy_status DEFAULT 'Paused',
  config jsonb DEFAULT '{}',
  pnl numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.active_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  strategy_id uuid NOT NULL REFERENCES public.strategies(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  entry_price numeric NOT NULL,
  quantity numeric NOT NULL,
  current_price numeric NOT NULL,
  pnl numeric DEFAULT 0,
  position public.position_type NOT NULL,
  exchange text NOT NULL,
  opened_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.trade_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  strategy_id uuid REFERENCES public.strategies(id) ON DELETE SET NULL,
  symbol text NOT NULL,
  entry_price numeric NOT NULL,
  exit_price numeric NOT NULL,
  quantity numeric NOT NULL,
  pnl numeric NOT NULL,
  position public.position_type NOT NULL,
  traded_at timestamptz DEFAULT now(),
  mode text DEFAULT 'Demo',
  strategy_name text
);

ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own strategies"
  ON public.strategies
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create strategies"
  ON public.strategies
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own strategies"
  ON public.strategies
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own strategies"
  ON public.strategies
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own positions"
  ON public.active_positions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own positions"
  ON public.active_positions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own positions"
  ON public.active_positions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own trade history"
  ON public.trade_history
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can log trades"
  ON public.trade_history
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_strategies_user_id ON public.strategies(user_id);
CREATE INDEX idx_active_positions_user_id ON public.active_positions(user_id);
CREATE INDEX idx_trade_history_user_id ON public.trade_history(user_id);
