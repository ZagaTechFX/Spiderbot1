
import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label, size = 'md' }) => {
  const sizeClasses = {
    sm: { container: 'w-10 h-5', circle: 'w-4 h-4', translate: 'translate-x-5' },
    md: { container: 'w-12 h-6', circle: 'w-5 h-5', translate: 'translate-x-6' },
    lg: { container: 'w-14 h-7', circle: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const currentSize = sizeClasses[size];

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={enabled} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'} ${currentSize.container} rounded-full transition`}></div>
        <div className={`dot absolute left-0.5 top-0.5 bg-white ${currentSize.circle} rounded-full transition-transform transform ${enabled ? currentSize.translate : 'translate-x-0'}`}></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-gray-700 dark:text-dark-text-secondary">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
