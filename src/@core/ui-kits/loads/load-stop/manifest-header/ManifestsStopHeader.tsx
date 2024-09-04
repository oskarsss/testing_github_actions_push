import LoadStopsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadStops.styled';
import type { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import VectorIcons from '@/@core/icons/vector_icons';
import { StopOptionsMenu } from '@/views/dispatch/orders/menus/stop-options/StopOptions';
import type { MouseEvent } from 'react';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import { isNotChangeManifest } from '@/@grpcServices/services/manifests-service/utils';
import React from 'react';
import {
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS
} from '@/@core/theme/entities/manifests/status';
import CopyText from '@/@core/components/copy-text/CopyText';
import ManifestHeaderStatusAndFriendlyId from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStatusAndFriendlyId';
import ManifestHeaderStyled from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStyled';
import GrossBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithCopy';
import GrossBadgeWithEdit from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithEdit';
import RpmBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/RpmBadgeWithCopy';

type Props = {
    manifest: ManifestModel_Manifest;
    setTableMode: (mode: TableMode) => void;
    tableMode: TableMode;
    lastStopSequence?: number;
    lastStopAppointmentEnd?: string;
    size?: 'small' | 'medium';
};

function LoadManifestsHeader({
    manifest,
    setTableMode,
    tableMode,
    lastStopSequence,
    lastStopAppointmentEnd,
    size = 'medium'
}: Props) {
    const { t } = useAppTranslation();
    const stopOptionsMenu = StopOptionsMenu();

    const onClickMoreOptions = (e: MouseEvent<HTMLButtonElement>) => {
        stopOptionsMenu.open({
            manifestId: manifest.manifestId,
            setTableMode,
            lastStopSequence,
            lastStopAppointmentEnd,
            truckId   : manifest.truckId
        })(e);
    };

    const statusColor = MANIFEST_STATUS_GRPC_COLORS[manifest.status];

    return (
        <ManifestHeaderStyled.TopWrapper statusColor={statusColor}>
            <ManifestHeaderStatusAndFriendlyId
                statusIcon={MANIFEST_STATUS_GRPC_ICONS[manifest.status]}
                statusText={t(`state_info:manifests.status.${manifest.status}`)}
                statusColor={statusColor}
                friendlyId={t('common:manifests.friendlyId', { friendlyId: manifest.friendlyId })}
                link={`dispatch/manifests/${manifest.manifestId}`}
            />

            {manifest.gross && !isNotChangeManifest(manifest.status) && (
                <GrossBadgeWithEdit
                    gross={manifest.gross}
                    statusColor={statusColor}
                    manifestId={manifest.manifestId}
                    size={size}
                />
            )}

            {manifest.gross && isNotChangeManifest(manifest.status) && (
                <GrossBadgeWithCopy
                    grossAmountFormatted={manifest.gross.amountFormatted}
                    statusColor={statusColor}
                    size={size}
                />
            )}

            {manifest.rpm && (
                <RpmBadgeWithCopy
                    rpmAmountFormatted={manifest.rpm.amountFormatted}
                    statusColor={statusColor}
                    size={size}
                />
            )}

            {manifest.loadedDistance && size === 'medium' && (
                <CopyText text={manifest.loadedDistance.milesFormatted}>
                    <span style={{ overflow: 'hidden' }}>
                        <Badge
                            variant="outlined"
                            text={`${t('common:miles')}: ${manifest.loadedDistance.milesFormatted}`}
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.utility.foreground[statusColor]?.tertiary,
                                color       : (theme) => theme.palette.utility.text[statusColor],
                                overflow    : 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace  : 'nowrap'
                            }}
                        />
                    </span>
                </CopyText>
            )}

            <LoadStopsStyled.MoreOptionsButton
                disabled={tableMode !== TableMode.NONE}
                onClick={onClickMoreOptions}
                size="small"
                sx={{
                    border   : 'none',
                    boxShadow: 'none',
                    ml       : 'auto',
                    svg      : {
                        color: (theme) =>
                            tableMode !== TableMode.NONE
                                ? theme.palette.utility.foreground[statusColor]?.secondary
                                : theme.palette.utility.foreground[statusColor]?.primary
                    }
                }}
            >
                <VectorIcons.ThreeDotsIcon />
            </LoadStopsStyled.MoreOptionsButton>
        </ManifestHeaderStyled.TopWrapper>
    );
}

export default React.memo(LoadManifestsHeader);
