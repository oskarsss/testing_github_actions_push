import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import InactiveItem from './InactiveItem';

export const useEditTruckQBDialog = hookFabric(EditTruckQBDialog);

type Props = {
    quickbooksId: string;
    truckId: string;
    truckFullName: string;
};

type DefaultValues = {
    quickbooks_id: string;
};

function EditTruckQBDialog({
    quickbooksId,
    truckId,
    truckFullName
}: Props) {
    const dialog = useEditTruckQBDialog(true);
    const [updateTruckClassQuickbooks, { isLoading }] =
        IntegrationQuickbooksGrpcService.useUpdateTruckClassQuickbooksMutation();

    const { data: classesQuickbooks } =
        IntegrationQuickbooksGrpcService.useGetClassesQuickbooksQuery({});

    const {
        control,
        formState: { isDirty },
        handleSubmit
    } = useForm<DefaultValues>({
        values: {
            quickbooks_id: quickbooksId
        }
    });

    const submit = (body: DefaultValues) => {
        updateTruckClassQuickbooks({
            quickbooksClassId: body.quickbooks_id,
            systemTruckId    : truckId
        })
            .unwrap()
            .then(dialog.close);
    };

    const options: Option[] =
        classesQuickbooks?.classes?.map((item) => ({
            name         : item.fullyQualifiedName,
            id           : item.quickbooksClassId,
            optionContent: !item.active ? (
                <InactiveItem displayName={item.fullyQualifiedName} />
            ) : null
        })) || [];

    const entities_by_id = createMap(options, 'id');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title="modals:settings.integrations.edit.header.title"
                translationOptions={{
                    name: truckFullName
                }}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <CustomAutocomplete<DefaultValues>
                        label="modals:settings.integrations.edit.fields.quickbooks.class"
                        labelOption={{ name: 'QuickBooks' }}
                        control={control}
                        name="quickbooks_id"
                        options={options}
                        entities_by_id={entities_by_id}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
