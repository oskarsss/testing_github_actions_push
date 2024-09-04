import FullDialog from '@/@core/ui-kits/full-dialog';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TestIDs } from '@/configs/tests';
import { Stack } from '@mui/material';
import DriverStatusChipSelect from '@/@core/fields/chip-select/DriverStatusChipSelect';
import navigateToPage from '@/utils/navigateToPage';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import { useEditDriverDialog } from '../EditDriver';
import { EditDriverChangeTab, useEditDriverForm } from '../EditDriverForm';
import EditDriverTabs from './Tabs/EditDriverTabs';

type Props = {
    driver: DriverModel_Driver;
    tabValue: number;
    onChangeTab: EditDriverChangeTab;
    isUpdating: boolean;
    onClose: () => void;
};

export default function EditDriverHeader({
    driver,
    tabValue,
    onChangeTab,
    isUpdating,
    onClose
}: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const editDriverDialog = useEditDriverDialog();
    const confirm = useConfirm();

    const [deleteDriver, {
        isLoading,
        isSuccess
    }] = DriversGrpcService.useDeleteDriverMutation();

    const convertedStatus = DRIVER_STATUS_GRPC_ENUM[driver.status];

    const onDelete = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:drivers.delete.title',
            body            : 'modals:drivers.delete.body',
            confirm_text    : 'common:button.delete',
            max_width_dialog: '600px',
            onConfirm       : () => deleteDriver({ driverId: driver.driverId }),
            confirmTestId   : TestIDs.pages.editDriver.buttons.confirmDeleteDriver,
            cancelTestId    : TestIDs.pages.editDriver.buttons.cancelDeleteTruck
        });
    };

    useEffect(() => {
        if (isSuccess) {
            editDriverDialog.close();

            if (router.pathname === '/drivers/[id]') {
                navigateToPage('/drivers');
            }
        }
    }, [isSuccess]);

    const {
        formState: { isDirty }
    } = useEditDriverForm();

    return (
        <FullDialog.Header>
            <FullDialog.HeaderAvatarTitle
                alt={`${driver.firstName} ${driver.lastName}`}
                url={driver.selfieThumbUrl}
                avatarInitials={`${driver.firstName?.charAt(0).toUpperCase()}${driver.lastName
                    ?.charAt(0)
                    .toUpperCase()}`}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                >
                    <span>
                        {t('modals:drivers.edit.header.title', {
                            name: `${driver.firstName} ${driver.lastName}`
                        })}
                    </span>

                    <DriverStatusChipSelect
                        buttonTestId={TestIDs.pages.editDriver.fields.status}
                        optionTestId={TestIDs.components.select.status.optionPrefix}
                        driver_id={driver.driverId}
                        driver_status={convertedStatus}
                    />
                </Stack>
            </FullDialog.HeaderAvatarTitle>

            <EditDriverTabs
                tabValue={tabValue}
                onChangeTab={onChangeTab}
            />

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isUpdating}
                    type="update"
                    testId={TestIDs.pages.editDriver.buttons.save}
                />
                {driver.status !== DriverModel_Status.DELETED && (
                    <FullDialog.DeleteButton
                        disabled={isUpdating}
                        isLoading={isLoading}
                        onClick={onDelete}
                        testId={TestIDs.pages.editDriver.buttons.deleteDriver}
                    />
                )}
                <FullDialog.ViewButton
                    onClose={editDriverDialog.close}
                    path={`/drivers/${driver.driverId}`}
                    hidden={router.pathname === '/drivers/[id]'}
                />
                <FullDialog.CloseButton
                    onClose={onClose}
                    testId={TestIDs.pages.editDriver.buttons.closeEditDriver}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
