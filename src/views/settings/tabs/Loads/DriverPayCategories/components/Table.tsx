import SettingTable from '@/views/settings/components/Table/Table';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useEditDriverPayCategoryDialog } from '@/views/settings/tabs/Loads/DriverPayCategories/dialogs/EditDriverPayCategories';
import LoadsTypes from '@/store/dispatch/loads/types';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { memo } from 'react';
import columns from './columns';
import { useAddDriverPayCategoryDialog } from '../dialogs/AddDriverPayCategories';

type Props = {
    categories: LoadsTypes.DriverPayItemCategory[];
    isLoading: boolean;
};

function TableDriverPayCategories({
    categories,
    isLoading
}: Props) {
    const confirm = useConfirm();
    const dialog = useEditDriverPayCategoryDialog();
    const createDriverPayCategoryDialog = useAddDriverPayCategoryDialog();

    const [deleteItem] =
        LoadDriverPayItemCategoriesGrpcService.useDeleteDriverPayCategoryMutation();
    const [restoreItem] =
        LoadDriverPayItemCategoriesGrpcService.useRestoreDriverPayCategoryMutation();

    const executeAction: ExecuteAction<LoadsTypes.DriverPayItemCategory> = (name, { row }) => {
        switch (name) {
        case 'edit':
            if (row.deleted) return;
            dialog.open({ item: row });
            break;
        case 'delete':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:loads.driver_pay_categories.table.confirm.delete.title',
                body              : 'settings:loads.driver_pay_categories.table.confirm.delete.body',
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    title: { name: row.name }
                },
                onConfirm: () =>
                    deleteItem({
                        driverPayItemCategoryId: row.driverPayItemCategoryId
                    })
            });
            break;
        case 'restore':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:loads.driver_pay_categories.table.confirm.restore.title',
                body              : 'settings:loads.driver_pay_categories.table.confirm.restore.body',
                confirm_text      : 'common:button.restore',
                translationOptions: {
                    title: { name: row.name }
                },
                onConfirm: () =>
                    restoreItem({
                        driverPayItemCategoryId: row.driverPayItemCategoryId
                    })
            });
            break;
        default:
            break;
        }
    };

    const openCreateDriverPayCategoryDialog = () => createDriverPayCategoryDialog.open({});

    return (
        <SettingTable<LoadsTypes.DriverPayItemCategory>
            rows={categories}
            isLoading={isLoading}
            elementKey="driverPayItemCategoryId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.DRIVER_PAY_CATEGORIES}
            onClickFallback={openCreateDriverPayCategoryDialog}
        />
    );
}

export default memo(TableDriverPayCategories);
