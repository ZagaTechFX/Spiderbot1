/*
  # Admin Management Tables

  1. New Tables
    - `kyc_applications` - KYC review queue
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `status` (kyc_status enum)
      - `document_type` (text)
      - `tier` (text)
      - `risk_score` (text)
      - `submitted_at` (timestamptz)
      - `reviewed_at` (timestamptz)

    - `bot_health` - Bot monitoring
      - `id` (uuid, primary key)
      - `bot_id` (uuid)
      - `user_id` (uuid)
      - `strategy_id` (uuid)
      - `status` (health_status enum)
      - `last_heartbeat` (timestamptz)
      - `error_message` (text)

    - `audit_logs` - Admin action tracking
      - `id` (uuid, primary key)
      - `admin_id` (uuid)
      - `action` (text)
      - `details` (jsonb)
      - `ip_address` (text)
      - `timestamp` (timestamptz)

    - `feature_flags` - Feature toggle management
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `enabled` (boolean)
      - `created_at` (timestamptz)

    - `support_tickets` - Customer support
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `title` (text)
      - `description` (text)
      - `status` (ticket_status enum)
      - `priority` (ticket_priority enum)
      - `created_at` (timestamptz)
      - `resolved_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Only admins can access admin tables
    - Users can only view own support tickets
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kyc_status') THEN
    CREATE TYPE public.kyc_status AS ENUM ('Pending', 'In Progress', 'Requires Resubmission', 'Failed', 'Approved');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'health_status') THEN
    CREATE TYPE public.health_status AS ENUM ('Healthy', 'Warning', 'Critical');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_status') THEN
    CREATE TYPE public.ticket_status AS ENUM ('Open', 'In Progress', 'Resolved', 'Closed');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_priority') THEN
    CREATE TYPE public.ticket_priority AS ENUM ('Low', 'Medium', 'High', 'Critical');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.kyc_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status public.kyc_status DEFAULT 'Pending',
  document_type text,
  tier text DEFAULT 'Tier 1',
  risk_score text DEFAULT 'Medium',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bot_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id uuid DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  strategy_id uuid REFERENCES public.strategies(id) ON DELETE SET NULL,
  status public.health_status DEFAULT 'Healthy',
  last_heartbeat timestamptz DEFAULT now(),
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  ip_address text,
  timestamp timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  status public.ticket_status DEFAULT 'Open',
  priority public.ticket_priority DEFAULT 'Medium',
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE public.kyc_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all KYC applications"
  ON public.kyc_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view own KYC status"
  ON public.kyc_applications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can submit KYC"
  ON public.kyc_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all bot health"
  ON public.bot_health
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view own bot health"
  ON public.bot_health
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can create audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view feature flags"
  ON public.feature_flags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can view support tickets"
  ON public.support_tickets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create support tickets"
  ON public.support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_kyc_applications_user_id ON public.kyc_applications(user_id);
CREATE INDEX idx_bot_health_user_id ON public.bot_health(user_id);
CREATE INDEX idx_audit_logs_admin_id ON public.audit_logs(admin_id);
CREATE INDEX idx_support_tickets_user_id ON public.support_tickets(user_id);
