import ManifestDriverPayItemsTable from '@/views/dispatch/manifests/details/sections/tables/driver-pay/Table';
import { useAssignDriverToManifestDialog } from '@/views/dispatch/manifests/modals/add-driver';
import { Collapse, Fade, Skeleton, Stack, Tooltip } from '@mui/material';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React, { useState } from 'react';
import DriverPayItemComponents from '@/views/dispatch/orders/dialogs/EditLoad/components/driver-pay-items/DriverPayItemComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStableArray } from '@/hooks/useStable';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import ManifestHeaderStyled from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStyled';
import ManifestHeaderStatusAndFriendlyId from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStatusAndFriendlyId';
import {
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS
} from '@/@core/theme/entities/manifests/status';
import { isNotChangeManifest } from '@/@grpcServices/services/manifests-service/utils';
import GrossBadgeWithEdit from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithEdit';
import GrossBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithCopy';
import RpmBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/RpmBadgeWithCopy';
import ManifestsSubHeaderFleet from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestsSubHeaderFleet';
import VectorIcons from '@/@core/icons/vector_icons';

type Props = {
    manifest: ManifestModel_Manifest;
    loadId: string;
};

export default function DriverPayItems({
    manifest,
    loadId
}: Props) {
    const [expanded, setExpanded] = useState(true);
    const { t } = useAppTranslation();

    const assignDriverDialog = useAssignDriverToManifestDialog();
    const {
        data,
        isLoading
    } = ManifestsGrpcService.useGetManifestsDriversQuery({
        manifestId: manifest.manifestId
    });
    const drivers = useStableArray(data?.drivers);

    const toggleExpanded = () => {
        setExpanded((prev) => !prev);
    };

    const handleAddDriver = () => {
        assignDriverDialog.open({
            manifestId  : manifest.manifestId,
            existDrivers: drivers.map((driver) => driver.driverId)
        });
    };

    if (isLoading) {
        return (
            <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                    width: '100%'
                }}
                height={200}
            />
        );
    }

    const statusColor = MANIFEST_STATUS_GRPC_COLORS[manifest.status];

    return (
        <Fade in>
            <Stack>
                <ManifestHeaderStyled.Container>
                    <ManifestHeaderStyled.TopWrapper statusColor={statusColor}>
                        <ManifestHeaderStatusAndFriendlyId
                            statusIcon={MANIFEST_STATUS_GRPC_ICONS[manifest.status]}
                            statusText={t(`state_info:manifests.status.${manifest.status}`)}
                            statusColor={statusColor}
                            friendlyId={t('common:manifests.friendlyId', {
                                friendlyId: manifest.friendlyId
                            })}
                            link={`dispatch/manifests/${manifest.manifestId}`}
                        />

                        {manifest.gross && !isNotChangeManifest(manifest.status) && (
                            <GrossBadgeWithEdit
                                gross={manifest.gross}
                                statusColor={statusColor}
                                manifestId={manifest.manifestId}
                            />
                        )}

                        {manifest.gross && isNotChangeManifest(manifest.status) && (
                            <GrossBadgeWithCopy
                                grossAmountFormatted={manifest.gross.amountFormatted}
                                statusColor={statusColor}
                            />
                        )}

                        {manifest.rpm && (
                            <RpmBadgeWithCopy
                                rpmAmountFormatted={manifest.rpm.amountFormatted}
                                statusColor={statusColor}
                            />
                        )}

                        <DriverPayItemComponents.ButtonAddDriver
                            variant="text"
                            size="small"
                            onClick={handleAddDriver}
                            startIcon={<VectorIcons.PlusIcon />}
                            statusColor={statusColor}
                            sx={{ ml: 'auto' }}
                        >
                            {t('common:actions.add_driver')}
                        </DriverPayItemComponents.ButtonAddDriver>
                        <Tooltip
                            disableInteractive
                            title={t(expanded ? 'common:collapse' : 'common:expand')}
                        >
                            <Stack>
                                <DriverPayItemComponents.ButtonExpand
                                    size="small"
                                    onClick={toggleExpanded}
                                    expanded={expanded}
                                    statusColor={statusColor}
                                >
                                    <KeyboardArrowDownIcon />
                                </DriverPayItemComponents.ButtonExpand>
                            </Stack>
                        </Tooltip>
                    </ManifestHeaderStyled.TopWrapper>
                    <ManifestHeaderStyled.BottomWrapper>
                        <ManifestsSubHeaderFleet
                            truckId={manifest.truckId}
                            manifestId={manifest.manifestId}
                            manifestFriendlyId={manifest.friendlyId}
                            stops={manifest.stops}
                            loadId={loadId}
                            driverIds={[]}
                            trailerId={manifest.trailerId}
                        />
                    </ManifestHeaderStyled.BottomWrapper>
                </ManifestHeaderStyled.Container>

                <Collapse
                    in={expanded}
                    sx={{ flexShrink: 0 }}
                >
                    <Stack mt="12px">
                        {drivers.length ? (
                            drivers.map((driver) => (
                                <ManifestDriverPayItemsTable
                                    key={driver.driverId}
                                    driverId={driver.driverId}
                                    driverNet={driver.driverNet?.amountFormatted?.toString() || ''}
                                    manifestId={manifest.manifestId}
                                    payItems={driver.payItems}
                                    settlementCycleId={driver.cycleId}
                                    settlementFriendlyId={driver.settlementFriendlyId}
                                    settlementId={driver.settlementId}
                                    settlementPeriodId={driver.periodId}
                                    truckId={manifest.truckId}
                                />
                            ))
                        ) : (
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                minHeight={100}
                                sx={{
                                    border      : '1px solid',
                                    borderColor : ({ palette }) => palette.semantic.border.primary,
                                    borderRadius: 1,
                                    padding     : 1,
                                    color       : ({ palette }) => palette.semantic.text.secondary
                                }}
                            >
                                {manifest.truckId
                                    ? t('common:empty.no_drivers_assigned')
                                    : t('common:empty.no_drivers_and_no_truck_assigned')}
                            </Stack>
                        )}
                    </Stack>
                </Collapse>
            </Stack>
        </Fade>
    );
}
