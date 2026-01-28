import { useState } from 'react';
import {
    Settings,
    Sun,
    Moon,
    Bell,
    BellOff,
    Volume2,
    VolumeX,
    Eye,
    Code2,
    Keyboard,
    Save,
    RotateCcw
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import './SettingsPage.css';

interface SettingsState {
    notifications: boolean;
    emailUpdates: boolean;
    soundEffects: boolean;
    autoSave: boolean;
    showLineNumbers: boolean;
    fontSize: number;
    editorTheme: 'vs-dark' | 'light' | 'hc-black';
    tabSize: number;
    dailyGoal: number;
}

const SettingsPage = () => {
    const { theme, toggleTheme } = useThemeStore();
    const [settings, setSettings] = useState<SettingsState>({
        notifications: true,
        emailUpdates: false,
        soundEffects: true,
        autoSave: true,
        showLineNumbers: true,
        fontSize: 14,
        editorTheme: 'vs-dark',
        tabSize: 4,
        dailyGoal: 30,
    });
    const [saved, setSaved] = useState(false);

    const handleSettingChange = <K extends keyof SettingsState>(
        key: K,
        value: SettingsState[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setSaved(false);
    };

    const saveSettings = () => {
        localStorage.setItem('pylearn-settings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const resetSettings = () => {
        setSettings({
            notifications: true,
            emailUpdates: false,
            soundEffects: true,
            autoSave: true,
            showLineNumbers: true,
            fontSize: 14,
            editorTheme: 'vs-dark',
            tabSize: 4,
            dailyGoal: 30,
        });
        setSaved(false);
    };

    return (
        <div className="settings-page animate-fade-in">
            <header className="settings-header">
                <h1 className="settings-title">
                    <Settings size={28} />
                    Settings
                </h1>
                <p className="settings-subtitle">
                    Customize your learning experience
                </p>
            </header>

            <div className="settings-grid">
                {/* Appearance */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Eye size={20} />
                        Appearance
                    </h2>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Theme</label>
                            <p className="setting-description">Choose light or dark mode</p>
                        </div>
                        <button
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? (
                                <>
                                    <Moon size={18} />
                                    Dark
                                </>
                            ) : (
                                <>
                                    <Sun size={18} />
                                    Light
                                </>
                            )}
                        </button>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Daily Goal</label>
                            <p className="setting-description">Minutes of practice per day</p>
                        </div>
                        <select
                            value={settings.dailyGoal}
                            onChange={(e) => handleSettingChange('dailyGoal', Number(e.target.value))}
                            className="setting-select"
                        >
                            <option value={15}>15 min</option>
                            <option value={30}>30 min</option>
                            <option value={45}>45 min</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1.5 hours</option>
                        </select>
                    </div>
                </section>

                {/* Notifications */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Bell size={20} />
                        Notifications
                    </h2>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Push Notifications</label>
                            <p className="setting-description">Get reminders to practice</p>
                        </div>
                        <button
                            className={`toggle-btn ${settings.notifications ? 'active' : ''}`}
                            onClick={() => handleSettingChange('notifications', !settings.notifications)}
                        >
                            {settings.notifications ? <Bell size={18} /> : <BellOff size={18} />}
                        </button>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Email Updates</label>
                            <p className="setting-description">Weekly progress reports</p>
                        </div>
                        <button
                            className={`toggle-btn ${settings.emailUpdates ? 'active' : ''}`}
                            onClick={() => handleSettingChange('emailUpdates', !settings.emailUpdates)}
                        >
                            <span className="toggle-text">{settings.emailUpdates ? 'On' : 'Off'}</span>
                        </button>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Sound Effects</label>
                            <p className="setting-description">Play sounds on completion</p>
                        </div>
                        <button
                            className={`toggle-btn ${settings.soundEffects ? 'active' : ''}`}
                            onClick={() => handleSettingChange('soundEffects', !settings.soundEffects)}
                        >
                            {settings.soundEffects ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>
                    </div>
                </section>

                {/* Editor Settings */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Code2 size={20} />
                        Code Editor
                    </h2>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Editor Theme</label>
                            <p className="setting-description">Color scheme for the code editor</p>
                        </div>
                        <select
                            value={settings.editorTheme}
                            onChange={(e) => handleSettingChange('editorTheme', e.target.value as SettingsState['editorTheme'])}
                            className="setting-select"
                        >
                            <option value="vs-dark">Dark</option>
                            <option value="light">Light</option>
                            <option value="hc-black">High Contrast</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Font Size</label>
                            <p className="setting-description">Code editor font size</p>
                        </div>
                        <div className="number-input">
                            <button onClick={() => handleSettingChange('fontSize', Math.max(10, settings.fontSize - 1))}>−</button>
                            <span>{settings.fontSize}px</span>
                            <button onClick={() => handleSettingChange('fontSize', Math.min(24, settings.fontSize + 1))}>+</button>
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Tab Size</label>
                            <p className="setting-description">Number of spaces per tab</p>
                        </div>
                        <select
                            value={settings.tabSize}
                            onChange={(e) => handleSettingChange('tabSize', Number(e.target.value))}
                            className="setting-select"
                        >
                            <option value={2}>2 spaces</option>
                            <option value={4}>4 spaces</option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Line Numbers</label>
                            <p className="setting-description">Show line numbers in editor</p>
                        </div>
                        <button
                            className={`toggle-btn ${settings.showLineNumbers ? 'active' : ''}`}
                            onClick={() => handleSettingChange('showLineNumbers', !settings.showLineNumbers)}
                        >
                            <span className="toggle-text">{settings.showLineNumbers ? 'On' : 'Off'}</span>
                        </button>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Auto Save</label>
                            <p className="setting-description">Automatically save your code</p>
                        </div>
                        <button
                            className={`toggle-btn ${settings.autoSave ? 'active' : ''}`}
                            onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                        >
                            <span className="toggle-text">{settings.autoSave ? 'On' : 'Off'}</span>
                        </button>
                    </div>
                </section>

                {/* Keyboard Shortcuts */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Keyboard size={20} />
                        Keyboard Shortcuts
                    </h2>

                    <div className="shortcuts-list">
                        <div className="shortcut-item">
                            <span className="shortcut-action">Run Code</span>
                            <kbd>Ctrl + Enter</kbd>
                        </div>
                        <div className="shortcut-item">
                            <span className="shortcut-action">Reset Code</span>
                            <kbd>Ctrl + Shift + R</kbd>
                        </div>
                        <div className="shortcut-item">
                            <span className="shortcut-action">Show Hints</span>
                            <kbd>Ctrl + H</kbd>
                        </div>
                        <div className="shortcut-item">
                            <span className="shortcut-action">Toggle Theme</span>
                            <kbd>Ctrl + Shift + T</kbd>
                        </div>
                    </div>
                </section>
            </div>

            {/* Action Buttons */}
            <div className="settings-actions">
                <button className="btn btn-ghost" onClick={resetSettings}>
                    <RotateCcw size={18} />
                    Reset to Defaults
                </button>
                <button className={`btn btn-primary ${saved ? 'saved' : ''}`} onClick={saveSettings}>
                    <Save size={18} />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
