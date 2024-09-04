import openNewTab from '@/utils/openNewTab';
import { memo } from 'react';
import LoadsTooltip from '@/@core/components/loads-tooltip/LoadsTooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { useManifestLoads } from '@/store/dispatch/manifests/hooks';
import styles from './ManifestTableLoadIdsCell.module.scss';

type Props = {
    row: ManifestModel_Manifest;
};

function LoadIds({ row }: Props) {
    const {
        firstLoad,
        otherLoads,
        loads
    } = useManifestLoads(row.stops);

    const { t } = useAppTranslation();

    const onClick = () => {
        if (!firstLoad?.loadId) return;
        openNewTab(APP_ROUTES_CONFIG.dispatch.orders.details(firstLoad.loadId));
    };

    if (!loads.length) return <>-</>;

    if (!firstLoad) return null;

    return (
        <div className={styles.wrapper}>
            <p
                className={styles.loadId}
                onClick={onClick}
            >
                {t('common:loads.friendlyId', { friendlyId: firstLoad.friendlyId })}
            </p>
            {otherLoads && (
                <LoadsTooltip loads={otherLoads}>
                    <p className={styles.otherLoads}>
                        {otherLoads && otherLoads?.length > 0 && `+${otherLoads.length}`}
                    </p>
                </LoadsTooltip>
            )}
        </div>
    );
}

export default memo(LoadIds);
