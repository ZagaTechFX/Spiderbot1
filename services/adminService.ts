import { supabase } from '../lib/supabase';
import { KycApplication, SystemAlert, AuditLog, FeatureFlag, AdminBotInfo } from '../types';

export const adminService = {
  async getAllKycApplications(): Promise<KycApplication[]> {
    const { data, error } = await supabase
      .from('kyc_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return data.map((app) => ({
      userId: app.user_id,
      userEmail: '', // Will be fetched separately
      tier: app.tier,
      documentType: app.document_type,
      timeInQueue: new Date(app.submitted_at).toISOString(),
      status: app.status,
      riskScore: app.risk_score,
      submittedDate: app.submitted_at,
    }));
  },

  async updateKycStatus(
    kycId: string,
    status: string,
    riskScore?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('kyc_applications')
      .update({
        status,
        risk_score: riskScore,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', kycId);

    if (error) throw error;
  },

  async getAllBots(): Promise<AdminBotInfo[]> {
    const { data, error } = await supabase
      .from('bot_health')
      .select('*');

    if (error) throw error;

    return data.map((bot) => ({
      botId: bot.bot_id,
      userId: bot.user_id,
      strategy: '', // Will need to fetch from strategies
      pair: '',
      status: bot.status === 'Healthy' ? 'Active' : bot.status,
      pnl: 0,
      drawdown: 0,
    }));
  },

  async createAuditLog(
    adminId: string,
    action: string,
    details: any,
    ipAddress?: string
  ): Promise<void> {
    const { error } = await supabase.from('audit_logs').insert({
      admin_id: adminId,
      action,
      details,
      ip_address: ipAddress,
      timestamp: new Date().toISOString(),
    });

    if (error) throw error;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    return data.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      adminUser: '',
      ipAddress: log.ip_address,
      action: log.action,
      details: JSON.stringify(log.details),
    }));
  },

  async getAllFeatureFlags(): Promise<FeatureFlag[]> {
    const { data, error } = await supabase
      .from('feature_flags')
      .select('*');

    if (error) throw error;

    return data.map((flag) => ({
      id: flag.id,
      name: flag.name,
      description: flag.description,
      enabled: flag.enabled,
    }));
  },

  async updateFeatureFlag(flagId: string, enabled: boolean): Promise<void> {
    const { error } = await supabase
      .from('feature_flags')
      .update({ enabled, updated_at: new Date().toISOString() })
      .eq('id', flagId);

    if (error) throw error;
  },

  async getBotHealth(): Promise<AdminBotInfo[]> {
    return this.getAllBots();
  },

  async toggleBotStatus(botId: string, paused: boolean): Promise<void> {
    // This would be handled by the backend bot service
    // For now, we'll just log it
    console.log(`Bot ${botId} status toggled to ${paused ? 'paused' : 'active'}`);
  },

  async getUserMetrics() {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, display_name, created_at, role');

    if (error) throw error;

    return {
      totalUsers: data.length,
      activeUsers: data.filter((u) => u.role === 'user').length,
      adminUsers: data.filter((u) => u.role === 'admin').length,
    };
  },

  async getSystemMetrics() {
    const { data: kycData } = await supabase
      .from('kyc_applications')
      .select('status')
      .then((res) => res);

    return {
      totalKycApplications: kycData?.length || 0,
      pendingKyc: kycData?.filter((k) => k.status === 'Pending').length || 0,
    };
  },
};
