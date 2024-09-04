import { CSSProperties, MouseEvent, useMemo } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useAvailablePlates } from '@/store/fleet/plates/hooks';
import { useAddPlateDialog } from '@/views/fleet/plates/dialogs/AddPlate/AddPlate';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import PlatesTypes from '@/store/fleet/plates/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TestIDs } from '@/configs/tests';
import createMap from '@/utils/create-map';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    vehicle_type: PlatesTypes.VehicleType;
    width?: CSSProperties['width'];
    testID?: string;
    required?: boolean;
    truckId?: string;
    trailerId?: string;
}

/**
 * ### Plate Select
 * #### Props:
 * - `control` - react-hook-form control
 * - `vehicle_type` - vehicle type
 * - `width` - width of the field
 * - `required` - is field required
 */

export default function PlateSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    vehicle_type,
    width,
    testID,
    required = false,
    truckId,
    trailerId
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const addPlateDialog = useAddPlateDialog();
    const { available_plates } = useAvailablePlates({
        vehicle_type,
        truckId,
        trailerId
    });

    const {
        field: { onChange }
    } = useController({
        name,
        control
    });

    const available_plates_options = useMemo(
        () =>
            available_plates.map(({
                state,
                number,
                owned,
                plateId
            }) => ({
                id  : plateId,
                name: `${state}-${number} ${
                    owned ? t('core:selects.plate.owned') : t('core:selects.plate.not_owned')
                }`
            })),
        [available_plates, t]
    );

    const plates_by_id = useMemo(
        () => createMap(available_plates_options, 'id'),
        [available_plates_options]
    );

    const setCreatedPlate = (plate_id: PlatesTypes.Plate['plate_id']) => {
        onChange(plate_id);
    };

    const add = () =>
        addPlateDialog.open({
            vehicle_type,
            onAdded: setCreatedPlate
        });

    const onCreate = (e: MouseEvent<HTMLDivElement>, value: string) =>
        addPlateDialog.open({
            vehicle_type,
            onAdded      : setCreatedPlate,
            defaultValues: {
                number: value
            }
        });

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label="entity:plate"
            options={available_plates_options}
            entities_by_id={plates_by_id}
            width={width}
            onAdd={add}
            entity="plate"
            onCreate={onCreate}
            required={required}
            testOptions={{
                inputTestID : testID,
                optionTestId: TestIDs.components.select.plateCompany.optionPrefix
            }}
        />
    );
}
