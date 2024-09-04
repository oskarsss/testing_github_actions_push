import openNewTab from '@/utils/openNewTab';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import styles from './ManifestLoadIdsTooltip.module.scss';

type Props = {
    loads: { loadId: string; friendlyId: string }[];
};

function LoadsIds({ loads }: Props) {
    const onClick = (loadId: string) => {
        openNewTab(APP_ROUTES_CONFIG.dispatch.orders.details(loadId));
    };
    const { t } = useAppTranslation();
    return (
        <div className={styles.wrapper}>
            {loads.map((load) => (
                <span
                    key={load.loadId}
                    onClick={() => onClick(load.loadId)}
                >
                    {t('common:loads.friendlyId', { friendlyId: load.friendlyId })}
                </span>
            ))}
        </div>
    );
}

export default memo(LoadsIds);
