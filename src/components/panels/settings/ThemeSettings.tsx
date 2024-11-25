import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';
import { SaveButton } from '../../SaveButton';

const presetThemes = {
  default: {
    dark: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#10B981',
      background: '#111827',
      surface: '#1F2937',
      text: '#F3F4F6'
    },
    light: {
      primary: '#2563EB',
      secondary: '#4B5563',
      accent: '#059669',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#111827'
    }
  },
  ocean: {
    dark: {
      primary: '#0EA5E9',
      secondary: '#64748B',
      accent: '#06B6D4',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9'
    }
  },
  forest: {
    dark: {
      primary: '#22C55E',
      secondary: '#71717A',
      accent: '#10B981',
      background: '#14532D',
      surface: '#166534',
      text: '#ECFDF5'
    }
  }
};

export function ThemeSettings() {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings.theme);
  const isDirty = JSON.stringify(localSettings) !== JSON.stringify(settings.theme);

  const handleSave = async () => {
    await updateSettings('theme', localSettings);
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setLocalSettings(prev => ({
      ...prev,
      mode,
      colors: mode === 'light' ? presetThemes.default.light : presetThemes.default.dark
    }));
  };

  const handlePresetChange = (preset: keyof typeof presetThemes) => {
    setLocalSettings(prev => ({
      ...prev,
      colors: presetThemes[preset][prev.mode]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Theme Settings</h3>
          <p className="text-sm text-gray-400">Customize the application appearance</p>
        </div>
        <Palette className="w-5 h-5 text-blue-400" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Theme Mode</label>
          <div className="flex space-x-4">
            {(['light', 'dark', 'system'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => handleThemeChange(mode)}
                className={`px-4 py-2 rounded-lg ${
                  localSettings.mode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Color Preset</label>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(presetThemes).map(preset => (
              <button
                key={preset}
                onClick={() => handlePresetChange(preset as keyof typeof presetThemes)}
                className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <div className="flex space-x-2 mb-2">
                  {Object.values(presetThemes[preset as keyof typeof presetThemes].dark).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm">{preset.charAt(0).toUpperCase() + preset.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Custom Colors</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(localSettings.colors).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    colors: {
                      ...prev.colors,
                      [key]: e.target.value
                    }
                  }))}
                  className="w-full h-8 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <SaveButton onSave={handleSave} isDirty={isDirty} />
        </div>
      </div>
    </div>
  );
}