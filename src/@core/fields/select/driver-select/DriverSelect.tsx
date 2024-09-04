import { useMemo } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { useStableArray } from '@/hooks/useStable';
import createMap from '@/utils/create-map';
import { useCreateDriverDialog } from '@/views/fleet/drivers/dialogs/CreateDriver';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverModel_Status } from '@proto/models/model_driver';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import OptionName from './OptionName';
import DriverStatus from './DriverStatus';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name?: Path<TFieldValues>;
    required?: boolean;
    label?: IntlMessageKey;
    testID?: string;
    showDeleted?: boolean;
    hideCreateDriverButton?: boolean;
}

export default function DriverSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name = 'driver_id' as Path<TFieldValues>,
    required = false,
    label = 'core:selects.driver.label',
    testID = '',
    showDeleted = false,
    hideCreateDriverButton = false
}: Props<TFieldValues>) {
    const addDriverDialog = useCreateDriverDialog();
    const { t } = useAppTranslation();
    const drivers = useAppSelector(DriversDataSelectors.getRows);
    const {
        field: { onChange }
    } = useController({ control, name });

    const {
        options,
        driversById
    } = useMemo(() => {
        const options: Option[] = (
            showDeleted
                ? drivers
                : drivers.filter(({ status }) => status !== DriverModel_Status.DELETED)
        ).map((driver) => ({
            id           : driver.driverId,
            name         : `${driver?.firstName || ''} ${driver?.lastName || ''}`,
            optionContent: <OptionName driver={driver} />,
            markerEnd    : <DriverStatus status={driver.status} />
        }));

        return { options, driversById: createMap(options, 'id') };
    }, [showDeleted, drivers]);

    const createDriver = () => {
        addDriverDialog.open({
            onSuccessfulCreate: (driverId) => onChange(driverId)
        });
    };

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label={label}
            options={options}
            entities_by_id={driversById}
            required={required}
            onAdd={hideCreateDriverButton ? undefined : createDriver}
            tooltipAddButton="core:selects.driver.tooltip"
            testOptions={{
                inputTestID: testID
            }}
        />
    );
}
