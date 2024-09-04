import { menuHookFabric } from '@/utils/menu-hook-fabric';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import AssignComponent from '@/@core/components/assign/AssignComponent';
import TruckWithDriverOption from '@/@core/components/assign/options/truck-with-driver/TruckWithDriverOption';
import { useActiveConvertTrucks } from '@/store/fleet/trucks/hooks';
import WarningAlert from '@/@core/ui-kits/basic/warning-alert/WarningAlert';
import { Typography, Tooltip } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import openNewTab from '@/utils/openNewTab';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';

export const useReAssignTruckToManifestMenu = menuHookFabric(ReAssignTruckToManifest, {
    cleanContentOnClose: true
});

export const useReAssignTruckToManifestDialog = hookFabric(ReAssignTruckToManifest, (props) => (
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
    selectedTruckId: string;
    manifestFriendlyId?: string | number;
    manifestId: string;
    alertAssignTruckFromLoad?: boolean;
    loadId?: string;
};

function ReAssignTruckToManifest({
    selectedTruckId,
    manifestFriendlyId = '',
    manifestId,
    alertAssignTruckFromLoad,
    loadId = ''
}: Props) {
    const { t } = useAppTranslation();
    const menu = useReAssignTruckToManifestMenu(true);
    const dialog = useReAssignTruckToManifestDialog(true);

    const close = () => {
        menu.close();
        dialog.close();
    };

    const [trigger, { isLoading }] =
        ManifestsGrpcService.endpoints.reAssignTruckToManifest.useMutation();

    const { trucks } = useActiveConvertTrucks();

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
            title="core:assign_menu.re_assign_manifest_to_truck.title"
            titleTranslationOptions={{ friendly_id: manifestFriendlyId }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trucks"
            options={trucks}
            OptionComponent={TruckWithDriverOption}
            selectedId={selectedTruckId}
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
                    text="common:warnings.re_assign_truck_to_manifest"
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
