import { hookFabric } from '@/utils/dialog-hook-fabric';
import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { CustomerCreateRequest } from '@proto/customers';

const customerSchema: yup.ObjectSchema<CustomerCreateRequest> = yup.object().shape({
    name       : yup.string().required(),
    email      : EmailValidation(false),
    phoneNumber: PhoneNumberValidation(false)
});

const defaultValues: CustomerCreateRequest = {
    name       : '',
    email      : '',
    phoneNumber: ''
};

export const useAddCustomerDialog = hookFabric(AddCustomer);

type Props = {
    enteredValue?: string;
    onAdded?: (id: string) => void;
};
export default function AddCustomer({
    enteredValue,
    onAdded
}: Props) {
    const dialog = useAddCustomerDialog(true);

    const [createCustomer, { isLoading }] = CustomersGrpcService.useCreateCustomerMutation();

    const values: CustomerCreateRequest | undefined = useMemo(() => {
        if (!enteredValue) return undefined;
        return {
            ...defaultValues,
            name: enteredValue
        };
    }, [enteredValue]);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<CustomerCreateRequest>({
        defaultValues,
        values,
        resolver: yupResolver(customerSchema)
    });

    const create: SubmitHandler<CustomerCreateRequest> = (data) => {
        createCustomer(data)
            .unwrap()
            .then((res) => {
                if (onAdded) {
                    onAdded(res.customerId);
                }
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header title="modals:customers.add.title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        name="name"
                        label="fields:name.label"
                        control={control}
                        errors={errors}
                        placeholder="fields:name.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <PhoneInput
                        control={control}
                        errors={errors}
                        label="fields:phone_number.label"
                        name="phoneNumber"
                        placeholder="fields:phone_number.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        name="email"
                        label="fields:email.label"
                        control={control}
                        errors={errors}
                        placeholder="modals:customers.add.fields.contact_email.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty && !enteredValue}
                type="create"
            />
        </DialogComponents.Form>
    );
}
