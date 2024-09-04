import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ServiceLogItemTypeGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item-type.service';
import TextInput from '@/@core/fields/inputs/TextInput';

type DefaultValues = {
    name: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().trim().required('Name is required')
});

export const useCreateServiceLogItemTypeDialog = hookFabric(CreateServiceLogItemType);

type Props = {
    onSuccessfulCreate?: (typeId: string) => void;
};

function CreateServiceLogItemType({ onSuccessfulCreate }: Props) {
    const dialog = useCreateServiceLogItemTypeDialog(true);
    const [createItem, { isLoading }] =
        ServiceLogItemTypeGrpcService.useCreateServiceLogItemTypeMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(schema)
    });

    const submit = (payload: DefaultValues) => {
        createItem(payload)
            .unwrap()
            .then(({ itemTypeId }) => {
                dialog.close().then(() => {
                    if (onSuccessfulCreate) {
                        onSuccessfulCreate(itemTypeId);
                    }
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="maintenance:service_logs.modals.create_item_type.header.title" />

            <TextInput
                control={control}
                errors={errors}
                name="name"
                placeholder="fields:name.placeholder"
                label="fields:name.label"
                width="100%"
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
