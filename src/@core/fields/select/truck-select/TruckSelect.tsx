import { useMemo } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import type { IntlMessageKey } from '@/@types/next-intl';
import { TruckModel_Status } from '@proto/models/model_truck';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import OptionName from './OptionName';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    required?: boolean;
    label?: IntlMessageKey;
    testID?: string;
    showDeleted?: boolean;
    name: Path<TFieldValues>;
    disabled?: boolean;
}

export default function TruckSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false,
    label = 'core:selects.truck.label',
    testID = '',
    showDeleted = false,
    name,
    disabled = false
}: Props<TFieldValues>) {
    const trucks = useAppSelector(TrucksDataSelectors.getRows);

    const {
        options,
        trucksById
    } = useMemo(() => {
        const options: Option[] = (
            showDeleted
                ? trucks
                : trucks.filter(({ status }) => status !== TruckModel_Status.deleted)
        ).map((truck) => ({
            id  : truck.truckId,
            name: `#${truck.referenceId} - ${truck.year} ${truck.model
                .charAt(0)
                .toUpperCase()}${truck.model.slice(1)}`,
            optionContent: <OptionName truck={truck} />
        }));

        return { options, trucksById: createMap(options, 'id') };
    }, [trucks, showDeleted]);

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            disabled={disabled}
            label={label}
            options={options}
            entities_by_id={trucksById}
            required={required}
            testOptions={{
                inputTestID: testID
            }}
        />
    );
}
