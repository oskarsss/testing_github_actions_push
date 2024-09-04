import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import {
    default_values,
    DefaultValues
} from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/helpers';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { formatDateTimeToUnix } from '@/utils/formatting';
import FullDialog from '@/@core/ui-kits/full-dialog';
import EditFuelTransactionHeader from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/components/EditFuelTransactionHeader';
import EditFuelTransactionFields from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/components/EditFuelTransactionFields';
import EditFuelTransactionNotes from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/components/EditFuelTransactionNotes';
import { useEditFuelTransactionDialog } from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/EditFuelTransaction';
import { FuelModel } from '@proto/models/model_fuel';

type Props = {
    fuel: FuelModel;
    onSuccessfulEdit?: () => void;
};

export default function EditFuelTransactionForm({
    fuel,
    onSuccessfulEdit
}: Props) {
    const [updateFuel, { isLoading: isUpdating }] = FuelGrpcService.useUpdateFuelMutation();

    const editTollDialog = useEditFuelTransactionDialog(true);

    const formValues: DefaultValues = useMemo(
        () => ({
            truck_id             : fuel.truckId,
            address              : fuel.address,
            chain                : fuel.chain,
            datetime             : fuel.datetime,
            discountAmount       : fuel.discountAmount,
            referenceId          : fuel.referenceId,
            totalAmount          : fuel.totalAmount,
            totalDiscountedAmount: fuel.totalDiscountedAmount,
            truckStop            : fuel.truckStop,
            product              : fuel.product,
            city                 : fuel.city,
            quantity             : fuel.quantity,
            state                : fuel.state
        }),
        [
            fuel.truckId,
            fuel.address,
            fuel.chain,
            fuel.datetime,
            fuel.discountAmount,
            fuel.referenceId,
            fuel.totalAmount,
            fuel.totalDiscountedAmount,
            fuel.product,
            fuel.city,
            fuel.quantity,
            fuel.state
        ]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : formValues
    });

    const onSubmit = (data: DefaultValues) => {
        updateFuel({
            address              : data.address,
            chain                : data.chain,
            dateTime             : formatDateTimeToUnix(data.datetime),
            discountAmount       : data.discountAmount,
            driverName           : fuel.driverName,
            fuelTransactionId    : fuel.fuelTransactionId,
            referenceId          : data.referenceId,
            product              : data.product ?? '',
            totalAmount          : data.totalAmount,
            totalDiscountedAmount: data.totalDiscountedAmount,
            truckId              : data.truck_id,
            truckStop            : data.truckStop,
            city                 : data.city,
            quantity             : data.quantity,
            state                : data.state
        })
            .unwrap()
            .then(() => {
                onSuccessfulEdit?.();
                editTollDialog.close();
            });
    };

    const {
        setValue,
        watch
    } = methods;

    const totalAmount = watch('totalAmount');
    const discountAmount = watch('discountAmount');

    useEffect(() => {
        setValue(
            'totalDiscountedAmount',
            Math.round(totalAmount * 100 - discountAmount * 100) / 100
        );
    }, [discountAmount, totalAmount, setValue]);

    return (
        <FullDialog.Form
            methods={methods}
            save={onSubmit}
        >
            <EditFuelTransactionHeader
                updateLoading={isUpdating}
                onCloseDialog={editTollDialog.close}
                fuelTransactionId={fuel.fuelTransactionId}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent maxWidth="700px">
                    <EditFuelTransactionFields fuelTransactionId={fuel.fuelTransactionId} />
                </FullDialog.ColumnContent>

                <FullDialog.ColumnContent maxWidth="100%">
                    <EditFuelTransactionNotes fuelTransactionId={fuel.fuelTransactionId} />
                </FullDialog.ColumnContent>
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
