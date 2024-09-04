import Tooltip from '@/layouts/UserLayout/Navigation/components/Tooltip/Tooltip';
import { LogoutIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import styles from './VUIKNavLogout.module.scss';

type Props = {
    isFullVisible: boolean;
    onClick: () => void;
};

export default function Logout({
    isFullVisible,
    onClick
}: Props) {
    const { t } = useAppTranslation('navigation');
    return (
        <Tooltip title={t('tooltips.logout')}>
            <button
                onClick={onClick}
                className={clsx(styles.logoutButton, {
                    [styles.logoutButtonFullVisible]: isFullVisible
                })}
            >
                <LogoutIcon />
            </button>
        </Tooltip>
    );
}
