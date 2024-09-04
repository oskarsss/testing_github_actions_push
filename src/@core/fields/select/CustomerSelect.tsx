import { FieldValues, Path, useController } from 'react-hook-form';
import { useAllCustomers } from '@/store/dispatch/customers/hooks';
import { MouseEvent, useMemo } from 'react';
import CustomAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { useAddCustomerDialog } from '@/views/dispatch/customers/dialogs/AddCustomer/AddCustomer';
import { CustomInputProps } from '@/@core/fields/select/ColorSelect';
import createMap from '@/utils/create-map';

export default function CustomerSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false,
    name
}: CustomInputProps<TFieldValues>) {
    const { customers } = useAllCustomers();
    const addCustomerDialog = useAddCustomerDialog();

    const {
        field: { onChange }
    } = useController({
        name: name || ('customer_id' as Path<TFieldValues>),
        control
    });

    const {
        optionsById,
        optionsList
    } = useMemo(() => {
        const optionsList = customers
            .filter((customer) => !customer.deleted)
            .map((customer) => ({
                id  : customer.customerId,
                name: customer.name
            }));
        const optionsById = createMap(optionsList, 'id');

        return {
            optionsList,
            optionsById
        };
    }, [customers]);

    const createCustomer = (e: MouseEvent<HTMLDivElement>, value: string) => {
        addCustomerDialog.open({
            enteredValue: value,
            onAdded     : onChange
        });
    };

    const add = () => {
        addCustomerDialog.open({
            onAdded: onChange
        });
    };

    return (
        <CustomAutocomplete
            control={control}
            required={required}
            name={name || ('customer_id' as Path<TFieldValues>)}
            label="entity:customer"
            options={optionsList}
            entities_by_id={optionsById}
            onAdd={add}
            entity="customer"
            onCreate={createCustomer}
        />
    );
}
