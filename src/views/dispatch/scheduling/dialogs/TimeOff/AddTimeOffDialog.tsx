import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import Scheduling from '@/store/dispatch/scheduling/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import {
    default_values,
    DefaultValues
} from '@/views/dispatch/scheduling/dialogs/TimeOff/components/defaultValues';
import { schema } from '@/views/dispatch/scheduling/dialogs/TimeOff/components/schema';
import TimeOffForm from '@/views/dispatch/scheduling/dialogs/TimeOff/components/TimeOffForm';
import TruckTimeOffGrpcService from '@/@grpcServices/services/truck-time_off.service';
import moment from 'moment-timezone';

type Props = {
    truck_id?: null | Scheduling.TruckManifestRow['truckId'];
};

// eslint-disable-next-line no-use-before-define
export const useAddTimeOffDialog = hookFabric(AddTimeOffDialog);

function AddTimeOffDialog({ truck_id = null }: Props) {
    const dialog = useAddTimeOffDialog(true);
    const [selected_truck_id, setSelectedTruckId] = useState<string | null>(truck_id);
    const [selected_truck_error, setSelectedTruckError] = useState<boolean>(false);
    const [selected_reference_id, setSelectedReferenceId] = useState<string | undefined>();

    const [addTimeOff, { isLoading }] = TruckTimeOffGrpcService.useAddTimeOffMutation();

    const method = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    const handleSelectTruck = (id: string, type_id: string, reference_id: string) => {
        if (truck_id) return;
        setSelectedTruckError(false);
        setSelectedTruckId(id);
        setSelectedReferenceId(reference_id);
    };

    const submit: SubmitHandler<DefaultValues> = (data) => {
        if (!selected_truck_id) {
            setSelectedTruckError(true);
            return;
        }
        addTimeOff({
            truckId    : selected_truck_id,
            startAt    : moment.utc(data.start_at).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endAt      : moment.utc(data.end_at).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            description: data.description
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <TimeOffForm
            method={method}
            title="schedule:dialogs.time_off.titles.add"
            truck_id={truck_id}
            submit={submit}
            handleSelectTruck={handleSelectTruck}
            selected_truck_id={selected_truck_id}
            selected_reference_id={selected_reference_id}
            selected_truck_error={selected_truck_error}
        >
            <DialogComponents.SubmitButton
                loading={isLoading}
                disabled={!selected_truck_id}
                text="common:button.add"
            />
        </TimeOffForm>
    );
}
