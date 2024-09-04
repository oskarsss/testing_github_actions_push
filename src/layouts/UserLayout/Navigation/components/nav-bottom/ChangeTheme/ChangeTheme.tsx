import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { MoonIcon, SunIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import styles from './VUIKNavChangeTheme.module.scss';

type Props = {
    isFullVisible: boolean;
};

export default function ChangeTheme({ isFullVisible }: Props) {
    const {
        settings,
        saveSettings
    } = useLayoutSettings();

    const { t } = useAppTranslation();

    const handleModeChange = (mode: LayoutSettingsType['mode']) => {
        saveSettings({ ...settings, mode });
    };

    const handleModeToggle = () => {
        if (settings.mode === 'light') {
            handleModeChange('dark');
        } else {
            handleModeChange('light');
        }
    };

    return (
        <div
            className={clsx(styles.paper, {
                [styles.fullVisible]   : isFullVisible,
                [styles.notFullVisible]: !isFullVisible
            })}
        >
            <div className={clsx(styles.tabs, { [styles.tabsNotFullVisible]: isFullVisible })}>
                <div
                    onClick={handleModeToggle}
                    className={clsx(styles.tab, {
                        [styles.tabNotFullVisible]: isFullVisible,
                        [styles.selected]         : settings.mode === 'light'
                    })}
                >
                    {!isFullVisible ? (
                        <>
                            <SunIcon />
                            {t('navigation:theme.light')}
                        </>
                    ) : (
                        <SunIcon />
                    )}
                </div>
                <div
                    onClick={handleModeToggle}
                    className={clsx(styles.tab, {
                        [styles.tabNotFullVisible]: isFullVisible,
                        [styles.selected]         : settings.mode === 'dark'
                    })}
                >
                    {!isFullVisible ? (
                        <>
                            <MoonIcon />
                            {t('navigation:theme.dark')}
                        </>
                    ) : (
                        <MoonIcon />
                    )}
                </div>
            </div>
        </div>
    );
}
