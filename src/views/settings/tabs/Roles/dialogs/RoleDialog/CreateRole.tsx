import TextInput from '@/@core/fields/inputs/TextInput';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';

export type DefaultValues = { name: string };

export const default_values: DefaultValues = {
    name: ''
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().trim().required('Name field is required')
});

export const useCreateRoleDialog = hookFabric(RoleDialog);

type Props = {
    onSuccessfulCreate?: (roleId: string) => void;
};

function RoleDialog({ onSuccessfulCreate }: Props) {
    const createRoleDialog = useCreateRoleDialog(true);

    const [createRole, { isLoading }] = RolesGrpcService.useCreateRoleMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    const submitForm = async (body: DefaultValues) => {
        try {
            const response = await createRole(body).unwrap();
            onSuccessfulCreate?.(response.roleId);
            createRoleDialog.close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submitForm)}>
            <DialogComponents.Header title="settings:roles.dialog.create.header.title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        name="name"
                        label="fields:name.label"
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="fields:name.placeholder"
                        width="100%"
                        autoFocus
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                onCancel={createRoleDialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!isDirty}
            />
        </DialogComponents.Form>
    );
}
