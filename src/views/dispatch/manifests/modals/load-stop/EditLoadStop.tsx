/* eslint-disable max-len */

import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadStopsGrpcService from '@/@grpcServices/services/loads-service/load-stops.service';
import { LOAD_STOP_TYPE_TO_GRPC_ENUM } from '@/models/loads/load-mappings';
import { checkEndAt } from '@/views/dispatch/manifests/modals/load-stop/helpers';
import {
    DefaultValues,
    schema,
    getFormValues,
    Stop
} from '@/views/dispatch/manifests/modals/load-stop/loadStopHelpers';
import ManifestLoadStopStatusChipSelect from '@/@core/fields/chip-select/ManifestLoadStopStatusChipSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import Commodity from '@/views/dispatch/manifests/modals/manifest-stop/commodity/Commodity';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useAppDispatch } from '@/store/hooks';
import Fields from '../manifest-stop/Fields';

type Props = {
    manifestId: string;
    autofocusInputName?: keyof DefaultValues;
    stop: Stop;
};

export const useEditLoadStopDialog = hookFabric(EditLoadStop, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="690px"
        paperStyle={{ overflow: 'hidden', paddingRight: 0 }}
        {...props}
    />
));

function EditLoadStop({
    manifestId,
    autofocusInputName,
    stop
}: Props) {
    const dispatch = useAppDispatch();
    const [stopStatus, setStopStatus] = useState(stop.loadStopStatus);
    const [updateTrigger, updateState] = LoadStopsGrpcService.useUpdateStopMutation();
    const [removeTrigger, removeState] = LoadStopsGrpcService.useDeleteStopMutation();
    const [assignCommodityTrigger] = LoadStopsGrpcService.useAssignCommodityMutation();
    const [unassignCommodityTrigger] = LoadStopsGrpcService.useUnassignCommodityMutation();

    const {
        loadId,
        stopId
    } = stop;

    const { data } = LoadStopsGrpcService.useGetCommodityQuery(
        {
            loadId,
            stopId: stop.stopId
        },
        { skip: !loadId || !stop.stopId }
    );

    const assignCommodity = useCallback(
        (commodityId: string) => {
            assignCommodityTrigger({
                loadId,
                stopId,
                commodityId
            });
        },
        [assignCommodityTrigger, loadId, stopId]
    );

    const unassignCommodity = useCallback(
        (commodityId: string) => {
            unassignCommodityTrigger({
                loadId,
                stopId,
                commodityId
            });
        },
        [unassignCommodityTrigger, loadId, stopId]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: getFormValues(stop),
        values       : getFormValues(stop),
        resolver     : yupResolver(schema)
    });

    const dialog = useEditLoadStopDialog(true);

    const remove = () => {
        removeTrigger({
            loadId,
            stopId,
            manifestId
        })
            .unwrap()
            .then(dialog.close);
    };
    const submit = (data: DefaultValues) => {
        updateTrigger({
            manifestId,
            loadId,
            stopId,
            sequence          : data.sequence,
            referenceId       : data.referenceId,
            note              : data.note,
            appointmentStartAt: data.appointmentStartAt,
            appointmentEndAt  : checkEndAt(data),
            type              : LOAD_STOP_TYPE_TO_GRPC_ENUM[data.type],
            checkedInAt       : data.checkedInAt,
            checkedOutAt      : data.checkedOutAt,
            location          : data.location
        }).unwrap();

        dialog.close();
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
                    setStopStatus(stop.loadStopStatus);
                }
            });
    };

    return (
        <Fields
            methods={methods}
            stopId={stopId}
            submit={submit}
            autofocusInputName={autofocusInputName}
            originType={ManifestsTypes.OriginType.LOAD}
            statusComponent={(
                <ManifestLoadStopStatusChipSelect
                    onSuccessfulUpdate={onSuccessFullUpdateStatus}
                    status={stopStatus}
                    manifestId={manifestId}
                    loadId={loadId}
                    stopId={stopId}
                />
            )}
            commodityComponent={(
                <Commodity
                    assignedCommodities={data?.assignedCommodities || []}
                    assignableCommodities={data?.assignableCommodities || []}
                    onAssign={assignCommodity}
                    onUnassign={unassignCommodity}
                    disabled={methods.formState.dirtyFields.type}
                    loadId={loadId}
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
