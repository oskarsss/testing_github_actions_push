/* eslint-disable max-len */

import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import LoadStopsGrpcService from '@/@grpcServices/services/loads-service/load-stops.service';
import { LOAD_STOP_TYPE_TO_GRPC_ENUM } from '@/models/loads/load-mappings';
import { checkEndAt } from '@/views/dispatch/manifests/modals/load-stop/helpers';
import {
    defaultValues,
    DefaultValues,
    schema
} from '@/views/dispatch/manifests/modals/load-stop/loadStopHelpers';
import { yupResolver } from '@hookform/resolvers/yup';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { CommodityModel } from '@proto/models/model_commodity';
import Commodity from '@/views/dispatch/manifests/modals/manifest-stop/commodity/Commodity';
import Fields from '../manifest-stop/Fields';

type Props = {
    loadId: string;
    sequence?: number;
    truckId: string;
    invalidateSettlement?: () => void;
    manifestId?: string;
};

export const useAddLoadStopDialog = hookFabric(AddLoadStop, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="690px"
        paperStyle={{ overflow: 'hidden', paddingRight: 0 }}
        {...props}
    />
));

function AddLoadStop({
    loadId,
    sequence,
    truckId,
    invalidateSettlement,
    manifestId
}: Props) {
    const [trigger, { isLoading }] = LoadStopsGrpcService.useAddStopMutation();
    const [seletedCommodity, setSelectedCommodity] = React.useState<string[]>([]);

    const methods = useForm<DefaultValues>({
        defaultValues: {
            ...defaultValues,
            sequence  : sequence ?? 1,
            manifestId: manifestId ?? ''
        },
        resolver: yupResolver(schema)
    });

    const stopType = methods.watch('type');

    const { data } = LoadStopsGrpcService.useGetCommodityForNewQuery({
        loadId,
        stopType: LOAD_STOP_TYPE_TO_GRPC_ENUM[stopType]
    });

    const commodities = useMemo(() => {
        const assignedCommodities: CommodityModel[] = [];
        const assignableCommodities: CommodityModel[] = [];

        data?.assignableCommodities?.forEach((commodity) => {
            if (seletedCommodity.includes(commodity.commodityId)) {
                assignedCommodities.push(commodity);
            } else {
                assignableCommodities.push(commodity);
            }
        });

        return { assignedCommodities, assignableCommodities };
    }, [data?.assignableCommodities, seletedCommodity]);

    const onAssignCommodity = useCallback(
        (commodityId: string) => {
            setSelectedCommodity((prev) => [...prev, commodityId]);
        },
        [setSelectedCommodity]
    );

    const onUnassignCommodity = useCallback(
        (commodityId: string) => {
            setSelectedCommodity((prev) => prev.filter((id) => id !== commodityId));
        },
        [setSelectedCommodity]
    );

    const dialog = useAddLoadStopDialog(true);

    const submit = (data: DefaultValues) => {
        trigger({
            loadId,
            appointmentStartAt: data.appointmentStartAt,
            appointmentEndAt  : checkEndAt(data),
            note              : data.note,
            location          : data.location,
            type              : LOAD_STOP_TYPE_TO_GRPC_ENUM[data.type],
            sequence          : data.sequence,
            referenceId       : data.referenceId,
            manifestId        : data.manifestId,
            commodityIds      : seletedCommodity
        })
            .unwrap()
            .then(() => {
                dialog.close();
                invalidateSettlement?.();
            });
    };

    return (
        <Fields
            originType={ManifestsTypes.OriginType.LOAD}
            showManifestSelect
            manifestSelectFilters={{
                truckIds: [truckId],
                loadIds : [loadId]
            }}
            methods={methods}
            submit={submit}
            commodityComponent={(
                <Commodity
                    onAssign={onAssignCommodity}
                    onUnassign={onUnassignCommodity}
                    assignedCommodities={commodities.assignedCommodities}
                    assignableCommodities={commodities.assignableCommodities}
                    loadId={loadId}
                />
            )}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    text="common:button.add"
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </Fields>
    );
}
