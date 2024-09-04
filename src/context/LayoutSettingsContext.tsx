// ** React Imports
import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

// ** ThemeConfig Import
import themeConfig, { ThemeConfigType } from '../configs/themeConfig';

// eslint-disable-next-line consistent-return
const getSettingsLocalStorage = () => {
    try {
        if (typeof window !== 'undefined') {
            const settings = localStorage.getItem('settings');
            return settings ? JSON.parse(settings) : {};
        }
    } catch (err) {
        console.error(err);
    }
    return {};
};

export interface LayoutSettingsType extends Partial<ThemeConfigType> {
    themeColor: 'info';
    navCollapsed: boolean;
    lastLayout?: 'vertical' | 'horizontal';
}

export type SaveLayoutSettingsType = (settings: LayoutSettingsType) => void;

const initialSettings: LayoutSettingsType = {
    themeColor           : 'info',
    mode                 : themeConfig.mode,
    footer               : themeConfig.footer,
    layout               : themeConfig.layout,
    lastLayout           : themeConfig.layout,
    direction            : themeConfig.direction,
    navHidden            : themeConfig.navHidden,
    appBarBlur           : themeConfig.appBarBlur,
    navCollapsed         : themeConfig.navCollapsed,
    contentWidth         : themeConfig.contentWidth,
    toastPosition        : themeConfig.toastPosition,
    verticalNavToggleType: themeConfig.verticalNavToggleType,
    skin                 : themeConfig.skin,
    appBar               : themeConfig.appBar,
    ...getSettingsLocalStorage()
};

const storeSettings = (settings: LayoutSettingsType) => {
    const initSettings = { ...settings };
    delete initSettings.appBar;
    delete initSettings.footer;
    delete initSettings.layout;
    delete initSettings.navHidden;
    delete initSettings.lastLayout;
    delete initSettings.toastPosition;
    window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

type LayoutSettingsContextType = {
    saveSettings: SaveLayoutSettingsType;
    settings: LayoutSettingsType;
};

// ** Create Context
export const LayoutSettingsContext = createContext<LayoutSettingsContextType>({
    saveSettings: () => {},
    settings    : initialSettings
});

type Props = {
    children: React.ReactNode;
};

export const LayoutSettingsProvider = ({ children }: Props) => {
    // ** State
    const [settings, setSettings] = useState<LayoutSettingsType>({ ...initialSettings });

    const saveSettings = useCallback((updatedSettings: LayoutSettingsType) => {
        storeSettings(updatedSettings);
        setSettings(updatedSettings);
    }, []);

    useEffect(() => {
        setSettings({ ...initialSettings });
    }, []);

    useEffect(() => {
        if (settings.layout === 'horizontal' && settings.skin === 'semi-dark') {
            saveSettings({
                ...settings,
                skin: 'default'
            });
        }
        if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
            saveSettings({
                ...settings,
                appBar: 'fixed'
            });
        }
    }, [settings.layout]);

    const value = useMemo(
        () => ({
            settings,
            saveSettings
        }),
        [settings, saveSettings]
    );

    return (
        <LayoutSettingsContext.Provider value={value}>{children}</LayoutSettingsContext.Provider>
    );
};

export const LayoutSettingsConsumer = LayoutSettingsContext.Consumer;
