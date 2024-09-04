import ActionsStyled from '@/@core/ui-kits/loads/load-stop/actions/ActionStyled';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTruckToManifestMenu } from '@/@core/components/assign/modals/AssignTruckToManifest';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { Divider, Stack, Typography } from '@mui/material';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import Avatar from '@mui/material/Avatar';
import getInitials from '@/utils/get-initials';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    truckId: string;
    trailerId: string;
    driverIds: string[];
    manifestId: string;
    manifestFriendlyId: number | string;
    stops: ManifestModel_Stop[];
    loadId: string;
};

export default function ManifestsSubHeaderFleet({
    truckId,
    trailerId,
    driverIds,
    manifestId,
    manifestFriendlyId,
    stops,
    loadId
}: Props) {
    const { t } = useAppTranslation();
    const assignTruckToManifest = useAssignTruckToManifestMenu();
    const driver = useDriverById(driverIds[0] || '');
    const truck = useTruckById(truckId);
    const trailer = useTrailerById(trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId || '');
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl || '');

    if (!truckId) {
        const assignHandler = assignTruckToManifest.open({
            manifestFriendlyId,
            manifestId,
            stops,
            loadId,
            alertAssignTruckFromLoad: true
        });

        return (
            <ActionsStyled.Button
                variant="text"
                color="primary"
                startIcon={<ControlPointIcon />}
                onClick={assignHandler}
            >
                {t('common:actions.assign_truck')}
            </ActionsStyled.Button>
        );
    }

    const countOtherDrivers = driverIds.length - 1;

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
        >
            {driver && (
                <>
                    <Badge
                        variant="filled"
                        backgroundColor={() => 'transparent'}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        text={`${driver.firstName} ${driver.lastName}`}
                        sx={{ pl: 0 }}
                        icon={(
                            <Avatar
                                src={url}
                                sx={{
                                    width     : '16px',
                                    height    : '16px',
                                    fontSize  : '8px',
                                    flexShrink: 0
                                }}
                                alt={`${driver.firstName} ${driver.lastName}`}
                            >
                                {getInitials(`${driver.firstName} ${driver.lastName}`).slice(0, 2)}
                            </Avatar>
                        )}
                    >
                        {!!countOtherDrivers && (
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                lineHeight="inherit"
                                color={(theme) => theme.palette.semantic.text.secondary}
                            >
                                {`+${countOtherDrivers}`}
                            </Typography>
                        )}
                    </Badge>
                    <Divider
                        orientation="vertical"
                        sx={{
                            height     : '10px',
                            margin     : 0,
                            borderColor: (theme) => theme.palette.semantic.foreground.six
                        }}
                    />
                </>
            )}
            {truck && (
                <Badge
                    variant="filled"
                    backgroundColor={() => 'transparent'}
                    textColor={(theme) => theme.palette.semantic.text.primary}
                    text={truck.referenceId}
                    icon={TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                />
            )}
            {trailer && (
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
                        variant="filled"
                        backgroundColor={() => 'transparent'}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        text={trailer.referenceId}
                        icon={getTrailerTypeIcon(trailerType?.icon || 0)}
                    />
                </>
            )}
        </Stack>
    );
}
