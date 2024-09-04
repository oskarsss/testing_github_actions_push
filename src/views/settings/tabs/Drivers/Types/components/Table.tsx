import { useDriversTypes } from '@/store/fleet/drivers/hooks';
import { useCallback } from 'react';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useCreateDriverType } from '@/views/settings/tabs/Drivers/Types/dialogs/CreateDriverType';
import SettingTable from '@/views/settings/components/Table/Table';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditDriverType } from '../dialogs/EditDriverType';
import columns from './columns';

export default function DriverTypesTable() {
    const { t } = useAppTranslation();
    const editDriverTypeDialog = useEditDriverType();
    const createDriverTypeDialog = useCreateDriverType();
    const [deleteDriverType] = DriverTypesGrpcService.useDeleteDriverTypeMutation();

    const confirm = useConfirm();

    const {
        driverTypes,
        isLoading
    } = useDriversTypes();

    const executeAction = useCallback<ExecuteAction<DriverTypeModel>>((name, props) => {
        switch (name) {
        case 'edit':
            editDriverTypeDialog.open({ driverType: props.row });
            break;
        case 'delete':
            confirm({
                body     : 'modals:settings.driver_types.delete.body',
                onConfirm: () =>
                    deleteDriverType({
                        driverTypeId: props.row.driverTypeId
                    }),
                confirm_text      : 'common:button.delete',
                title             : 'modals:settings.driver_types.delete.title',
                translationOptions: {
                    body: {
                        name: props.row.name
                    }
                },
                icon: (
                    <DeleteForeverIcon
                        fontSize="medium"
                        color="error"
                    />
                )
            });

            break;
        default:
            break;
        }
    }, []);

    const openCreatDriverTypeDialog = () => createDriverTypeDialog.open({});

    return (
        <SettingTable<DriverTypeModel>
            rows={driverTypes}
            isLoading={isLoading}
            elementKey="driverTypeId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.DRIVER_TYPES}
            onClickFallback={openCreatDriverTypeDialog}
        />
    );
}
