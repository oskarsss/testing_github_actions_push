import React from 'react';
import { useForm } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import { formatDateTimeToUnix } from '@/utils/formatting';
import CreateFuelTransactionFields from '@/views/accounting/fuel/Table/dialogs/CreateFuelTransaction/CreateFuelTransactionFields';
import {
    default_values,
    DefaultValues
} from '@/views/accounting/fuel/Table/dialogs/CreateFuelTransaction/helpers';

export const useCreateFuelTransactionDialog = hookFabric(CreateFuelTransaction, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="550px"
    />
));

type Props = {
    truck_id?: string;
    onSuccessfulAdd?: () => void;
};

function CreateFuelTransaction({
    truck_id,
    onSuccessfulAdd
}: Props) {
    const dialog = useCreateFuelTransactionDialog(true);
    const [createFuel] = FuelGrpcService.useCreateFuelMutation();

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : truck_id ? { ...default_values, truck_id } : undefined
    });

    const onSubmit = (data: DefaultValues) => {
        createFuel({
            amount        : data.amount,
            discountAmount: data.discount_amount,
            fuelChain     : data.fuel_chain,
            truckId       : data.truck_id,
            city          : data.city,
            state         : data.state,
            dateTime      : formatDateTimeToUnix(data.date_time),
            product       : data.product,
            referenceId   : data.reference_id,
            quantity      : data.quantity
        })
            .unwrap()
            .then(() => {
                onSuccessfulAdd?.();
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogComponents.Header title="modals:fuels.create.header.title" />
            <CreateFuelTransactionFields methods={methods} />
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                type="create"
                submitLoading={false}
            />
        </DialogComponents.Form>
    );
}
