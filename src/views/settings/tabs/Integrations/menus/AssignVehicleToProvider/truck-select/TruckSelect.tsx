import { useCallback, useMemo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import createMap from '@/utils/create-map';
import TruckStatus from '@/@core/fields/select/truck-select/TruckStatus';
import type { IntlMessageKey } from '@/@types/next-intl';
import { TruckModel_Status } from '@proto/models/model_truck';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import OptionName from './OptionName';
import DriverAvatar from './DriverAvatar';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    required?: boolean;
    label?: IntlMessageKey;
    testID?: string;
    showDeleted?: boolean;
}

export default function TruckSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    required = false,
    label = 'core:selects.truck.label',
    testID = '',
    showDeleted = false
}: Props<TFieldValues>) {
    const drivers = useDriversMap();
    const trucks = useAppSelector(TrucksDataSelectors.getRows);

    const {
        options,
        trucksById
    } = useMemo(() => {
        const options: Option[] = (
            showDeleted
                ? trucks
                : trucks.filter(({ status }) => status !== TruckModel_Status.deleted)
        )
            .toSorted((a, b) => b.referenceId.localeCompare(a.referenceId))
            .map((truck) => ({
                id  : truck.truckId,
                name: `#${truck.referenceId} - ${truck.year} ${truck.model
                    .charAt(0)
                    .toUpperCase()}${truck.model.slice(1)}`,
                optionContent: <OptionName truck={truck} />,
                marker       : <DriverAvatar truck={truck} />,
                markerEnd    : <TruckStatus status={truck.status} />
            }));

        return { options, trucksById: createMap(options, 'id') };
    }, [showDeleted, trucks]);

    const filterOptions = useCallback(
        (options: Option[], enteredValue: string) => {
            const lowerCasedEnteredValue = enteredValue.toLowerCase();

            const filtered = options.filter((option) => {
                const truck = trucks.find((truck) => truck.truckId === option.id);
                const driverId = truck?.drivers.find((dr) => dr.primary)?.driverId || '';
                const driver = truck ? drivers[driverId] : null;

                return (
                    option.name.toLowerCase().includes(lowerCasedEnteredValue) ||
                    (driver &&
                        `${driver.firstName} ${driver.lastName}`
                            .toLowerCase()
                            .includes(lowerCasedEnteredValue))
                );
            });

            return filtered;
        },
        [drivers, trucks]
    );

    return (
        <CustomAutocomplete
            control={control}
            name={'truck_id' as Path<TFieldValues>}
            label={label}
            options={options}
            entities_by_id={trucksById}
            required={required}
            customFilterOptions={filterOptions}
            testOptions={{
                inputTestID: testID
            }}
        />
    );
}
