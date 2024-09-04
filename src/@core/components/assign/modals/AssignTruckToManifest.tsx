import { menuHookFabric } from '@/utils/menu-hook-fabric';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import AssignComponent from '@/@core/components/assign/AssignComponent';
import TruckWithDriverOption from '@/@core/components/assign/options/truck-with-driver/TruckWithDriverOption';
import { useActiveConvertTrucks } from '@/store/fleet/trucks/hooks';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { Tooltip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import openNewTab from '@/utils/openNewTab';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useTruckLocation } from '@/store/streams/events/hooks';
import { useAppSelector } from '@/store/hooks';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { getFirstActiveStopLocation } from '@/@grpcServices/services/manifests-service/utils';

export const useAssignTruckToManifestMenu = menuHookFabric(AssignTruckToManifest, {
    cleanContentOnClose: true
});

export const useAssignTruckToManifestDialog = hookFabric(AssignTruckToManifest, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        turnOffCloseButton
        keepMounted={false}
        paperStyle={{
            minWidth: '600px',
            padding : 0
        }}
    />
));

type Props = {
    manifestFriendlyId?: string | number;
    manifestId: string;
    alertAssignTruckFromLoad?: boolean;
    stops: ManifestModel_Stop[];
    loadId?: string;
};

function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);

    const theta = lon1 - lon2;
    let dist =
        Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist *= 180 / Math.PI; // rad2deg equivalent
    const miles = dist * 60 * 1.1515;
    return miles;
}

function AssignTruckToManifest({
    manifestFriendlyId = '',
    manifestId,
    alertAssignTruckFromLoad,
    stops,
    loadId = ''
}: Props) {
    const { t } = useAppTranslation();
    const assignTruckToManifestMenu = useAssignTruckToManifestMenu(true);
    const dialog = useAssignTruckToManifestDialog(true);
    const [trigger, { isLoading }] =
        ManifestsGrpcService.endpoints.assignTruckToManifest.useMutation();

    const { trucks } = useActiveConvertTrucks();

    const trucksLocations = useAppSelector((state) => state.events.truckLocations);

    const sortedTrucks = useMemo(() => {
        const locatedTrucks = trucks.map((truck) => {
            const location = trucksLocations[truck.truckId];
            return {
                ...truck,
                location
            };
        });

        const firstStopLocation = getFirstActiveStopLocation(stops);

        const trucksWithDistance = locatedTrucks.map((truck) => {
            if (!truck.location || !firstStopLocation) return { ...truck, distance: 0 };
            const {
                lat,
                lon
            } = truck.location;
            const {
                lat: lat2,
                lon: lon2
            } = firstStopLocation;
            return {
                ...truck,
                distance: distance(lat, lon, lat2, lon2)
            };
        });

        return trucksWithDistance.sort((a, b) => {
            if (a.distance === 0) return 1;
            if (b.distance === 0) return -1;
            return a.distance - b.distance;
        });
    }, [stops, trucks, trucksLocations]);

    const close = () => {
        assignTruckToManifestMenu.close();
        dialog.close();
    };

    const handleSubmit = (truckId: string) => {
        trigger({
            manifestId,
            truckId,
            loadId
        }).unwrap();
        close();
    };

    const openManifest = () => openNewTab(`/dispatch/manifests/${manifestId}`);

    return (
        <AssignComponent
            title="core:assign_menu.truck_to_manifest.title"
            titleTranslationOptions={{ friendly_id: manifestFriendlyId }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trucks"
            options={sortedTrucks}
            OptionComponent={TruckWithDriverOption}
            onClose={close}
            optionHelpers={{
                getOptionId   : (option) => option.truckId,
                getOptionLabel: (option) =>
                    `#${option.referenceId} ${option.make} ${option.model} ${option.year}`,
                getFilterOptions: (option) =>
                    `#${option.referenceId} ${
                        option.driver ? `${option.driver.firstName} ${option.driver.lastName}` : ''
                    }`
            }}
            noOptionsText="common:empty.no_options"
        >
            {alertAssignTruckFromLoad && (
                <WarningAlert
                    text="common:warnings.assign_truck_to_manifest"
                    sx={{ mb: '6px', justifyContent: 'flex-start' }}
                >
                    <Tooltip
                        disableInteractive
                        title={t('common:tooltips.open_in_new_tab')}
                    >
                        <Typography
                            component="span"
                            fontSize="inherit"
                            fontWeight="inherit"
                            lineHeight="inherit"
                            color="inherit"
                            onClick={openManifest}
                            sx={{
                                cursor        : 'pointer',
                                textDecoration: 'underline',
                                transition    : 'opacity 0.2s',
                                '&:hover'     : {
                                    opacity: 0.8
                                }
                            }}
                        >
                            {manifestFriendlyId || '-'}
                        </Typography>
                    </Tooltip>
                </WarningAlert>
            )}
        </AssignComponent>
    );
}
