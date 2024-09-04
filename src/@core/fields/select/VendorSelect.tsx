import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useActiveVendors } from '@/store/fleet/vendors/hooks';
import { useMemo } from 'react';
import CustomAutocomplete, {
    OptionObjects
} from '@/@core/fields/select/components/CustomAutocomplete';
import { TestIDs } from '@/configs/tests';
import { useAddVendorDialog } from '@/views/fleet/vendors/dialogs/AddVendor/AddVendor';
import createMap from '@/utils/create-map';
import type { IntlMessageKey } from '@/@types/next-intl';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    required?: boolean;
    testOptions?: Record<string, string>;
    autoFocus?: boolean;
}

export default function VendorSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    label,
    required = false,
    autoFocus = false,
    testOptions = {
        inputTestID: '',
        addTestId  : ''
    }
}: Props<TFieldValues>) {
    const {
        field: { onChange }
    } = useController({
        name,
        control
    });
    const { vendors } = useActiveVendors();
    const addVendorDialog = useAddVendorDialog();

    const vendors_options = useMemo(
        () =>
            vendors.map((vendor) => ({
                id  : vendor.vendorId,
                name: vendor.name
            })),
        [vendors]
    );

    const vendors_by_id: OptionObjects = useMemo(
        () => createMap(vendors_options, 'id'),
        [vendors_options]
    );

    const setCreatedVendor = (vendor_id: string) => {
        onChange(vendor_id);
    };

    const add = () =>
        addVendorDialog.open({
            onAdded: setCreatedVendor
        });

    return (
        <CustomAutocomplete
            required={required}
            control={control}
            name={name}
            label={label}
            options={vendors_options}
            entities_by_id={vendors_by_id}
            onAdd={add}
            entity="vendor"
            onCreate={add}
            autoFocus={autoFocus}
            testOptions={{
                inputTestID : testOptions.inputTestID,
                optionTestId: TestIDs.components.select.vendor.optionPrefix,
                addTestId   : testOptions.addTestId
            }}
        />
    );
}
