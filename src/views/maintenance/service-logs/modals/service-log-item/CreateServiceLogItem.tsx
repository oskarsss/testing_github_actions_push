import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import SERVICE_LOG_ITEM_UTILS, {
    type DefaultValues
} from '@/views/maintenance/service-logs/modals/service-log-item/service-log-item-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import ServiceLogItemGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item.service';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ServiceLogItemFields from './ServiceLogItemFields';

export const useCreateServiceLogItemDialog = hookFabric(CreateServiceLogItem);

type Props = {
    serviceLogId: string;
};

function CreateServiceLogItem({ serviceLogId }: Props) {
    const dialog = useCreateServiceLogItemDialog(true);
    const [createItem, { isLoading }] = ServiceLogItemGrpcService.useCreateServiceLogItemMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: SERVICE_LOG_ITEM_UTILS.defaultValues,
        resolver     : yupResolver(SERVICE_LOG_ITEM_UTILS.schema)
    });

    const submit = (payload: DefaultValues) => {
        createItem({
            serviceLogId,
            baseItems: [payload]
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="maintenance:service_logs.modals.create_item.header.title" />

            <ServiceLogItemFields
                control={control}
                errors={errors}
            />

            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
                type="create"
            />
        </DialogComponents.Form>
    );
}
