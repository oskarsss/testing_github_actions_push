import DialogComponents from '@/@core/ui-kits/common-dialog';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ManifestStopTypeToGRPC } from '@/models/manifests/manifest-stop';
import { checkEndAt } from '@/views/dispatch/manifests/modals/load-stop/helpers';
import {
    DefaultValues,
    schema,
    getFormValues
} from '@/views/dispatch/manifests/modals/manifest-stop/manifestStopHelpers';
import ManifestStopStatusChipSelect from '@/@core/fields/chip-select/ManifestStopStatusChipSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useAppDispatch } from '@/store/hooks';
import Fields from './Fields';

type Props = {
    manifestId: string;
    stop: ManifestsTypes.AnyPreparedStop;
};

export const useEditManifestStopDialog = hookFabric(EditManifestStop, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        paperStyle={{ overflow: 'hidden', paddingRight: 0 }}
        {...props}
    />
));

function EditManifestStop({
    manifestId,
    stop
}: Props) {
    const dispatch = useAppDispatch();
    const [stopStatus, setStopStatus] = useState(stop.manifestStopStatus);
    const dialog = useEditManifestStopDialog(true);
    const [updateTrigger, updateState] = ManifestStopsGrpcService.useUpdateManifestStopMutation();
    const [removeTrigger, removeState] =
        ManifestStopsGrpcService.useRemoveStopFromManifestMutation();

    const methods = useForm<DefaultValues>({
        defaultValues: getFormValues(stop),
        values       : getFormValues(stop),
        resolver     : yupResolver(schema)
    });

    const remove = () => {
        removeTrigger({
            manifestId,
            manifestStopId: stop.stopId,
            loadId        : stop.loadId
        })
            .unwrap()
            .then();
        dialog.close();
    };

    const submit = (data: DefaultValues) => {
        updateTrigger({
            manifestId,
            manifestStopId    : stop.stopId,
            note              : data.note,
            appointmentStartAt: data.appointmentStartAt,
            appointmentEndAt  : checkEndAt(data),
            checkedInAt       : data.checkedInAt,
            checkedOutAt      : data.checkedOutAt,
            type              : ManifestStopTypeToGRPC[data.type],
            referenceId       : data.referenceId,
            location          : data.location,
            arrivedAt         : stop?.arrivedAt,
            departedAt        : stop?.departedAt,
            loadId            : stop.loadId
        })
            .unwrap()
            .then(dialog.close);
    };

    const onSuccessFullUpdateStatus = (stopId: string) => {
        dispatch(
            ManifestsGrpcService.endpoints.retrieveManifest.initiate(
                {
                    manifestId
                },
                { forceRefetch: true }
            )
        )
            .unwrap()
            .then((response) => {
                const stops = response.manifest?.stops || [];
                const stop = stops.find((stop) =>
                    [stop.loadStopId, stop.manifestStopId].includes(stopId));

                if (stop) {
                    setStopStatus(stop.manifestStopStatus);
                }
            });
    };

    return (
        <Fields
            originType={ManifestsTypes.OriginType.MANIFEST}
            methods={methods}
            stopId={stop.stopId}
            submit={submit}
            statusComponent={(
                <ManifestStopStatusChipSelect
                    loadId={stop.loadId}
                    onSuccessfulUpdate={onSuccessFullUpdateStatus}
                    status={stopStatus}
                    manifestId={manifestId}
                    stopId={stop.stopId}
                />
            )}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.DeleteButton
                    loading={removeState.isLoading}
                    disabled={updateState.isLoading}
                    onClick={remove}
                />
                <DialogComponents.SubmitButton
                    text="common:button.update"
                    disabled={removeState.isLoading || !methods.formState.isDirty}
                    loading={updateState.isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </Fields>
    );
}
