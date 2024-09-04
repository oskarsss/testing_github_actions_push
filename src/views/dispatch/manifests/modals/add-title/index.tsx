import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
    title: string;
    manifestId: string;
};

type DefaultValues = {
    title: string;
};

const schema = yup.object().shape({
    title: yup.string().defined()
});

export const useUpdateManifestTitleDialog = hookFabric(AddTitle);

export default function AddTitle({
    title,
    manifestId
}: Props) {
    const [trigger, triggerState] = ManifestsGrpcService.useUpdateManifestTitleMutation();
    const dialog = useUpdateManifestTitleDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            title
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            title: data.title,
            manifestId
        }).unwrap();

        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header
                title={`modals:manifests.add-title.${title ? 'title-update' : 'title'}`}
            />
            <DialogComponents.Fields rowSpacing={4}>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={methods.control}
                        errors={methods.formState.errors}
                        label="modals:manifests.add-title.label"
                        name="title"
                        placeholder="modals:manifests.add-title.placeholder"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                submitDisabled={!methods.formState.isDirty}
                submitLoading={triggerState.isLoading}
                onCancel={dialog.close}
                type={title ? 'update' : 'create'}
            />
        </DialogComponents.Form>
    );
}
