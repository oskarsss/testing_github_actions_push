import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CustomerPortalGrpcService from '@/@grpcServices/services/customer-portal.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { CustomerPortalCreateRequest } from '@proto/customer_portal';
import React from 'react';
import { useForm } from 'react-hook-form';

type DefaultValues = CustomerPortalCreateRequest;

export const useCreateCustomerPortalDialog = hookFabric(CreateCustomerPortal);

export default function CreateCustomerPortal() {
    const [createPortal, createPortalState] =
        CustomerPortalGrpcService.useCustomerPortalCreateMutation();
    const dialog = useCreateCustomerPortalDialog();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({ defaultValues: CustomerPortalCreateRequest.create() });

    const submit = async (data: DefaultValues) => {
        await createPortal(data);
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="Create Customer Portal" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        width="100%"
                        label="Name"
                        name="name"
                        placeholder="Enter name"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="Support Email"
                        name="supportEmail"
                        placeholder="Enter support email"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <PhoneInput
                        width="100%"
                        label="Support Phone"
                        control={control}
                        errors={errors}
                        name="supportPhone"
                        placeholder="Enter support phone"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="Link Facebook Url"
                        name="linkFacebookUrl"
                        placeholder="Enter link facebook url"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        width="100%"
                        errors={errors}
                        label="Link Instagram Url"
                        name="linkInstagramUrl"
                        placeholder="Enter link instagram url"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="Link Website Url"
                        name="linkWebsiteUrl"
                        placeholder="Enter link website url"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.SubmitButton
                    disabled={createPortalState.isLoading}
                    loading={createPortalState.isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
