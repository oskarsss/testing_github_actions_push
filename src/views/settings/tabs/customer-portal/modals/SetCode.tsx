import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CustomerPortalGrpcService from '@/@grpcServices/services/customer-portal.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = { portalId: string };

export const useCustomerPortalSetCodeDialog = hookFabric(SetCode);

type DefaultValues = {
    code: string;
};

export default function SetCode({ portalId }: Props) {
    const [setCode, { isLoading }] = CustomerPortalGrpcService.useCustomerPortalCodeSetMutation();
    const dialog = useCustomerPortalSetCodeDialog(true);
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            code: ''
        }
    });

    const submitHandler = async (data: DefaultValues) => {
        await setCode({ code: data.code, customerPortalId: portalId });
        dialog.close();
    };
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submitHandler)}>
            <DialogComponents.Header title="Set Code" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        label="Code"
                        name="code"
                        control={control}
                        errors={errors}
                        placeholder="Enter code"
                        autoFocus
                        width="100%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    disabled={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
