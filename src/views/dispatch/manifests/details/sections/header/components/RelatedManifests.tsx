import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import React, { useCallback, useMemo } from 'react';
import ManifestHeaderStyled from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStyled';
import ManifestHeaderStatusAndFriendlyId from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStatusAndFriendlyId';
import GrossBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithCopy';
import RpmBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/RpmBadgeWithCopy';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS
} from '@/@core/theme/entities/manifests/status';
import { getActiveStopsCount } from '@/@grpcServices/services/manifests-service/utils';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import CircleProgressBar from '@/@core/components/circle-progress-bar';
import { Divider, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { formatMiles } from '@/utils/formatting';

type Props = {
    manifestId: string;
    loadIds: string[];
    openNewTab: boolean;
};

export default function RelatedManifests({
    manifestId,
    loadIds,
    openNewTab
}: Props) {
    const { t } = useAppTranslation();

    const { manifests } = ManifestsGrpcService.useGetManifestsQuery(
        {
            page      : manifestDefaultFilters.page,
            perPage   : manifestDefaultFilters.per_page,
            sortType  : manifestDefaultFilters.sortBy,
            driverIds : [],
            statuses  : [],
            trailerIds: [],
            truckIds  : [],
            startDate : '',
            endDate   : '',
            search    : '',
            loadIds
        },
        {
            selectFromResult: (result) => ({
                ...result,
                manifests: result.currentData?.manifests || []
            }),
            skip: !loadIds.length
        }
    );

    const filteredManifests = useMemo(
        () => manifests.filter((manifest) => manifest.manifestId !== manifestId),
        [manifestId, manifests]
    );

    const getStopsText = useCallback(
        (stops: ManifestModel_Stop[]) => {
            const totalStopsCount = stops.length;
            const completedStopsCount = totalStopsCount - getActiveStopsCount(stops).length;

            return `${completedStopsCount}/${totalStopsCount} ${t('entity:stops').toLowerCase()}`;
        },
        [t]
    );

    const getStopsValueCompleted = useCallback((stops: ManifestModel_Stop[]) => {
        const totalStopsCount = stops.length;
        const completedStopsCount = totalStopsCount - getActiveStopsCount(stops).length;

        return Math.round((completedStopsCount / totalStopsCount) * 100);
    }, []);

    return filteredManifests.map((manifest) => (
        <ManifestHeaderStyled.Container key={manifest.manifestId}>
            <ManifestHeaderStyled.TopWrapper
                sx={{ height: '26px' }}
                statusColor={MANIFEST_STATUS_GRPC_COLORS[manifest.status]}
            >
                <ManifestHeaderStatusAndFriendlyId
                    statusIcon={MANIFEST_STATUS_GRPC_ICONS[manifest.status]}
                    statusText={t(`state_info:manifests.status.${manifest.status}`)}
                    statusColor={MANIFEST_STATUS_GRPC_COLORS[manifest.status]}
                    friendlyId={t('common:manifests.friendlyId', {
                        friendlyId: manifest.friendlyId
                    })}
                    link={`/dispatch/manifests/${manifest.manifestId}`}
                    openInNewTab={openNewTab}
                />
                {manifest.gross && (
                    <GrossBadgeWithCopy
                        grossAmountFormatted={manifest.gross.amountFormatted}
                        statusColor={MANIFEST_STATUS_GRPC_COLORS[manifest.status]}
                        size="medium"
                    />
                )}
                {manifest.rpm && (
                    <RpmBadgeWithCopy
                        rpmAmountFormatted={manifest.rpm.amountFormatted}
                        statusColor={MANIFEST_STATUS_GRPC_COLORS[manifest.status]}
                        size="medium"
                    />
                )}
            </ManifestHeaderStyled.TopWrapper>
            <ManifestHeaderStyled.BottomWrapper
                sx={{
                    height        : '22px',
                    justifyContent: 'flex-start'
                }}
            >
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="4px"
                >
                    <CircleProgressBar
                        size={16}
                        value={getStopsValueCompleted(manifest.stops)}
                    />
                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        lineHeight={1.5}
                        color={(theme) => theme.palette.semantic.text.secondary}
                    >
                        {getStopsText(manifest.stops)}
                    </Typography>
                </Stack>

                {manifest.totalDistance && (
                    <>
                        <Divider
                            orientation="vertical"
                            sx={{
                                height     : '10px',
                                margin     : 0,
                                borderColor: (theme) => theme.palette.semantic.foreground.six
                            }}
                        />
                        <Badge
                            variant="outlined"
                            size="small"
                            sx={{
                                border   : 'none',
                                boxShadow: 'none',
                                padding  : 0
                            }}
                            icon={<VectorIcons.DistanceIcon />}
                            text={`${formatMiles(manifest.totalDistance.miles)} ${t('common:mi')}`}
                        />
                    </>
                )}
            </ManifestHeaderStyled.BottomWrapper>
        </ManifestHeaderStyled.Container>
    ));
}
