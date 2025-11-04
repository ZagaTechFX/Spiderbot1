
import React from 'react';
import Card from '../../components/Card';
import ToggleSwitch from '../../components/ToggleSwitch';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-200 dark:border-dark-border pb-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const SettingRow: React.FC<{ label?: string; value?: string; children?: React.ReactNode }> = ({ label, value, children }) => (
    <div className="flex items-center justify-between py-2">
        <div>
            {label && <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{label}</p>}
        </div>
        <div>
            {value && <p className="text-sm text-gray-800 dark:text-white font-medium">{value}</p>}
            {children}
        </div>
    </div>
);

const SettingsView: React.FC = () => {
    return (
        <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <Section title="Personal Data">
                <SettingRow label="User ID" value="USR-11A2" />
                <SettingRow label="Email" value="john.doe@example.com" />
                <SettingRow label="Name" value="John Doe" />
                <SettingRow label="Country" value="United States" />
                <SettingRow label="Phone Number" value="+1 (555) 123-4567" />
            </Section>

            <Section title="Security">
                <SettingRow label="Two-Factor Authentication (2FA)">
                     <button className="text-sm bg-primary text-white font-semibold py-1 px-3 rounded-lg hover:bg-primary-hover">Enable</button>
                </SettingRow>
                <SettingRow label="Anti-Phishing Code" value="Not Set" />
                <SettingRow label="IP Address Whitelist" value="2 addresses" />
                 <SettingRow label="Device & Activity">
                     <a href="#" className="text-sm text-primary hover:underline">View Logs</a>
                </SettingRow>
            </Section>

            <Section title="Billing">
                 <SettingRow label="Subscription Type" value="Pro Plan" />
                 <SettingRow label="Status" value="Active" />
                 <SettingRow label="Next Billing Date" value="2024-08-15" />
                 <SettingRow>
                     <button className="text-sm bg-primary/20 text-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary/30">Manage Subscription</button>
                 </SettingRow>
            </Section>
            
            <Section title="My Settings">
                 <SettingRow label="Language" value="English" />
                 <SettingRow label="Timezone" value="UTC-5 (Eastern Time)" />
                 <SettingRow label="Referral Code">
                     <input type="text" placeholder="Enter code" className="w-48 bg-gray-50 dark:bg-dark-bg-secondary border border-gray-300 dark:border-dark-border rounded-md p-1 text-sm"/>
                 </SettingRow>
            </Section>

            <div className="pb-6 mb-6">
                 <h3 className="text-lg font-semibold mb-4">BETA Features</h3>
                 <div className="space-y-4">
                    <SettingRow label="Enhanced Trade History Page">
                        <ToggleSwitch enabled={true} onChange={() => {}} size="sm" />
                    </SettingRow>
                    <SettingRow label="Show Balance in EUR">
                         <ToggleSwitch enabled={false} onChange={() => {}} size="sm" />
                    </SettingRow>
                </div>
            </div>
        </Card>
    );
};

export default SettingsView;
