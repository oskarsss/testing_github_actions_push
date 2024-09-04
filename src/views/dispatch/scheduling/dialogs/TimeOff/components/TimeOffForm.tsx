import DialogComponents from '@/@core/ui-kits/common-dialog';
import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import DateRange from '@/views/dispatch/scheduling/dialogs/TimeOff/components/DateRange';
import TextInput from '@/@core/fields/inputs/TextInput';
import React, { MouseEvent, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { DefaultValues } from '@/views/dispatch/scheduling/dialogs/TimeOff/components/defaultValues';
import Scheduling from '@/store/dispatch/scheduling/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAssignTruckMenu } from '@/@core/components/assign/modals/AssignTruck';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';

type Props = {
    children: React.ReactNode;
    title: IntlMessageKey;
    submit: (body: DefaultValues) => void;
    method: UseFormReturn<DefaultValues>;
    truck_id?: Scheduling.TruckManifestRow['truckId'] | null;
    handleSelectTruck?: (id: string, type_id: string, reference_id: string) => void;
    selected_reference_id?: string;
    selected_truck_id: string | null;
    selected_truck_error?: boolean;
};

export default function TimeOffForm({
    children,
    title,
    submit,
    method,
    handleSelectTruck,
    truck_id = null,
    selected_reference_id = '',
    selected_truck_id,
    selected_truck_error = false
}: Props) {
    const { t } = useAppTranslation('schedule');
    const assignTruckMenu = useAssignTruckMenu();

    const trucks = useAppSelector(TrucksDataSelectors.getRows);
    const [selected_truck, setSelectedTruck] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;

    useEffect(() => {
        const selected = trucks.find((row) => row.truckId === selected_truck_id);
        setSelectedTruck(
            selected
                ? t('dialogs.time_off.fields.truck.value', {
                    referenceId: selected.referenceId
                })
                : `${selected_reference_id || ''}`
        );
    }, [selected_truck_id]);

    const openMenuSelectTruck = (event: MouseEvent<HTMLElement>) => {
        if (truck_id || !handleSelectTruck) return;
        assignTruckMenu.open({
            onTruckSelect: handleSelectTruck
        })(event);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title={title} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextField
                        onClick={openMenuSelectTruck}
                        disabled={Boolean(truck_id)}
                        name="truck_id"
                        label={t('dialogs.time_off.fields.truck.label')}
                        value={selected_truck}
                        variant="filled"
                        placeholder={t('dialogs.time_off.fields.truck.placeholder')}
                        style={{ width: '100%' }}
                        InputProps={{
                            readOnly: true
                        }}
                        InputLabelProps={{
                            shrink  : true,
                            required: true
                        }}
                    />
                    {selected_truck_error && (
                        <FormHelperText sx={{ color: 'error.main', ml: 4 }}>
                            {t('dialogs.time_off.fields.truck.error')}
                        </FormHelperText>
                    )}
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <DateRange control={control} />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="schedule:dialogs.time_off.fields.description.label"
                        name="description"
                        placeholder="schedule:dialogs.time_off.fields.description.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>{children}</DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
