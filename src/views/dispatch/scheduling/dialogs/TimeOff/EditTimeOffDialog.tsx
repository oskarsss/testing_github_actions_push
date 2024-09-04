import TimeOffForm from '@/views/dispatch/scheduling/dialogs/TimeOff/components/TimeOffForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import {
    default_values,
    DefaultValues,
    formattingDate
} from '@/views/dispatch/scheduling/dialogs/TimeOff/components/defaultValues';
import Scheduling from '@/store/dispatch/scheduling/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/views/dispatch/scheduling/dialogs/TimeOff/components/schema';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import TruckTimeOffGrpcService from '@/@grpcServices/services/truck-time_off.service';
import moment from 'moment-timezone';

const formattingTimeOff = (time_off: Scheduling.TimeOffType): DefaultValues => ({
    start_at   : formattingDate(time_off.startAt),
    end_at     : formattingDate(time_off.endAt),
    description: time_off.description
});

export const useEditTimeOffDialog = hookFabric(EditTimeOffDialog);

type Props = {
    truck_id: Scheduling.TruckManifestRow['truckId'];
    time_off: Scheduling.TimeOffType;
};

export default function EditTimeOffDialog({
    truck_id,
    time_off
}: Props) {
    const dialog = useEditTimeOffDialog(true);
    const [editTimeOff, { isLoading: loadingEdit }] =
        TruckTimeOffGrpcService.useEditTimeOffMutation();

    const [deleteTimeOff, { isLoading: loadingDelete }] =
        TruckTimeOffGrpcService.useDeleteTimeOffMutation();

    const method = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : formattingTimeOff(time_off),
        resolver     : yupResolver(schema)
    });
    const submit = (body: DefaultValues) => {
        editTimeOff({
            truckId       : truck_id,
            truckTimeOffId: time_off.id,
            startAt       : moment.utc(body.start_at).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endAt         : moment.utc(body.end_at).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            description   : body.description
        })
            .unwrap()
            .then(dialog.close);
    };

    const onDelete = () => {
        deleteTimeOff({
            truckId       : truck_id,
            truckTimeOffId: time_off.id
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <TimeOffForm
            title="schedule:dialogs.time_off.titles.edit"
            submit={submit}
            truck_id={truck_id}
            method={method}
            selected_truck_id={truck_id}
        >
            <DialogComponents.DeleteButton
                onClick={onDelete}
                loading={loadingDelete}
            />
            <DialogComponents.SubmitButton
                loading={loadingEdit}
                disabled={!method.formState.isDirty}
                text="common:button.update"
            />
        </TimeOffForm>
    );
}
