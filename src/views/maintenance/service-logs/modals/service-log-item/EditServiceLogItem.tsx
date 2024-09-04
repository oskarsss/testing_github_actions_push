import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import SERVICE_LOG_ITEM_UTILS, {
    type DefaultValues
} from '@/views/maintenance/service-logs/modals/service-log-item/service-log-item-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import ServiceLogItemGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item.service';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import type { ServiceLogItemModel_ItemRead } from '@proto/models/model_service_log_item';
import { useMemo } from 'react';
import ServiceLogItemFields from './ServiceLogItemFields';

export const useEditServiceLogItemDialog = hookFabric(EditServiceLogItem);

type Props = {
    serviceLogId: string;
    serviceLogItem: ServiceLogItemModel_ItemRead;
};

function EditServiceLogItem({
    serviceLogId,
    serviceLogItem
}: Props) {
    const dialog = useEditServiceLogItemDialog(true);
    const [updateItem, { isLoading: isUpdateItemLoading }] =
        ServiceLogItemGrpcService.useUpdateServiceLogItemMutation();
    const [deleteItem, { isLoading: isDeleteItemLoading }] =
        ServiceLogItemGrpcService.useDeleteServiceLogItemMutation();

    const deleteItemHandler = () => {
        deleteItem({
            serviceLogId,
            serviceLogItemId: serviceLogItem.serviceLogItemId
        })
            .unwrap()
            .then(dialog.close);
    };

    const values: DefaultValues = useMemo(
        () => ({
            itemTypeId      : serviceLogItem.itemTypeId,
            warrantyCoverage: serviceLogItem.warrantyCoverage,
            quantity        : serviceLogItem.quantity,
            rate            : serviceLogItem.rate,
            name            : serviceLogItem.name
        }),
        [serviceLogItem]
    );

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: SERVICE_LOG_ITEM_UTILS.defaultValues,
        values,
        resolver     : yupResolver(SERVICE_LOG_ITEM_UTILS.schema)
    });

    const submit = (payload: DefaultValues) => {
        updateItem({
            serviceLogId,
            serviceLogItemId: serviceLogItem.serviceLogItemId,
            baseItem        : payload
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="maintenance:service_logs.modals.update_item.header.title" />

            <ServiceLogItemFields
                control={control}
                errors={errors}
            />

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />

                <DialogComponents.DeleteButton
                    onClick={deleteItemHandler}
                    loading={isDeleteItemLoading}
                />

                <DialogComponents.SubmitButton
                    disabled={!isDirty}
                    loading={isUpdateItemLoading}
                    type="update"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
