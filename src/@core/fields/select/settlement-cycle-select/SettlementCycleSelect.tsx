import { useMemo } from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { useActiveCycle } from '@/store/accounting/settlements/hooks/settlements';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import { TestIDs } from '@/configs/tests';
import createMap from '@/utils/create-map';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { CustomInputProps } from '../ColorSelect';
import CycleStatus from './CycleStatus';

export default function SettlementCycleSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name = 'settlementCycleId' as Path<TFieldValues>,
    required = false,
    testID
}: CustomInputProps<TFieldValues>) {
    const { cycles } = useActiveCycle();
    const addCycleDialog = useAddCycleDialog();

    const {
        field: { onChange }
    } = useController({ control, name });

    const cycles_options = useMemo(
        () =>
            cycles.map((cycle) => ({
                id       : cycle.cycleId,
                name     : cycle.name,
                markerEnd: <CycleStatus cycle={cycle} />
            })),
        [cycles]
    );

    const cycles_by_id = useMemo(() => createMap(cycles_options, 'id'), [cycles_options]);

    const onAdd = () => {
        addCycleDialog.open({
            onSuccessfulCreate: (cycleId) => {
                onChange(cycleId);
            }
        });
    };

    const onCreate = (e: React.MouseEvent<HTMLDivElement>, value: string) => {
        addCycleDialog.open({
            defaultValues: {
                name: value
            },
            onSuccessfulCreate: (cycleId) => {
                onChange(cycleId);
            }
        });
    };

    return (
        <CustomAutocomplete
            required={required}
            control={control}
            name={name}
            label="entity:cycle"
            options={cycles_options}
            entities_by_id={cycles_by_id}
            onAdd={onAdd}
            onCreate={onCreate}
            entity="cycle"
            testOptions={{
                inputTestID : testID,
                optionTestId: TestIDs.components.select.cycle.optionPrefix
            }}
        />
    );
}
