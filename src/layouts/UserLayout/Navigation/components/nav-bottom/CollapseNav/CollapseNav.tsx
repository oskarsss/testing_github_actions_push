import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { LayoutSettingsType, SaveLayoutSettingsType } from '@/context/LayoutSettingsContext';
import { GroupName } from '@/layouts/UserLayout/Navigation/components/NavItems/permissions';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import Tooltip from '../../Tooltip/Tooltip';

import styles from './VUIKNavCollapse.module.scss';

type Props = {
    isFullVisible: boolean;
    setGroupActive: (group: GroupName[]) => void;
    settings: LayoutSettingsType;
    saveSettings: SaveLayoutSettingsType;
};

export default function UserCollapseNav({
    isFullVisible,
    setGroupActive,
    saveSettings,
    settings
}: Props) {
    const onCollapseNav = () => saveSettings({ ...settings, navCollapsed: !isFullVisible });
    const { t } = useAppTranslation('navigation');

    const onMouseEnter = () => {
        if (isFullVisible) {
            setGroupActive([]);
        }
    };

    return (
        <div
            onClick={onCollapseNav}
            onMouseEnter={onMouseEnter}
            className={clsx(styles.container, {
                [styles.containerFullVisible]: isFullVisible
            })}
        >
            <Tooltip
                title={isFullVisible ? t('tooltips.expand') : ''}
                disableHoverListener={!isFullVisible}
            >
                <button
                    className={clsx(styles.arrowButton, {
                        [styles.arrowButtonFullVisible]: isFullVisible
                    })}
                >
                    <KeyboardArrowLeftIcon />
                </button>
            </Tooltip>

            <p
                className={clsx(styles.description, {
                    [styles.descriptionFullVisible]: isFullVisible
                })}
            >
                {t('collapse')}
            </p>
        </div>
    );
}
