import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useStableArray } from '@/hooks/useStable';
import {
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Status } from '@proto/models/model_truck';
import { Stack } from '@mui/material';
import ChipAutocomplete, { FilterOptions } from '../ChipAutocomplete';
import TruckLabel from './Label';
import TruckOption from './Option';
import BrandCheckbox from '../../../../../../../@core/ui-kits/basic/brand-checkbox/BrandCheckbox';

type Props = { teamId: string; existTrucks: string[] };

export const useAddTrucksToTeamDialog = hookFabric(AddTrucks, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        turnOffCloseButton
        maxWidth="500px"
    />
));

type DefaultValues = {
    trucksIds: string[];
};
const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    trucksIds: yup.array().of(yup.string().required()).required('Select at least one truck')
        .min(1)
});

export default function AddTrucks({
    teamId,
    existTrucks
}: Props) {
    const [trigger] = TeamsGrpcService.useCreateTeamTruckMutation();
    const [showDeleted, setShowDeleted] = useState(false);
    const trucksMap = useTrucksMap();

    const trucksList = useStableArray(
        Object.values(trucksMap)
            .filter((truck) => showDeleted || truck.status !== TruckModel_Status.deleted)
            .map((truck) => truck.truckId)
            .filter((truckId) => !existTrucks.includes(truckId))
    );

    const dialog = useAddTrucksToTeamDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            trucksIds: []
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            teamId,
            trucksId: data.trucksIds
        });
        dialog.close();
    };

    const filterOptions: FilterOptions = (options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.reduce((acc, option) => {
            const truck = trucksMap[option];
            const searched = `${truck?.referenceId}${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]}${
                TRUCK_STATUS_TO_LOCALE[truck.status]
            }${truck.model}${truck.year}`
                .toLowerCase()
                .includes(inputValue);
            if (searched) acc.push(option);
            return acc;
        }, [] as string[]);
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="settings:teams.team_items.dialog.create.trucks.header.title">
                <BrandCheckbox
                    label="settings:teams.team_items.dialog.create.trucks.fields.show_deleted_trucks.label"
                    checked={showDeleted}
                    setCheck={setShowDeleted}
                    sx={{ width: 'auto' }}
                />
            </DialogComponents.Header>
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <ChipAutocomplete
                        filterOptions={filterOptions}
                        label="settings:teams.team_items.dialog.create.trucks.fields.trucksIds.label"
                        OptionComponent={TruckOption}
                        control={methods.control}
                        name="trucksIds"
                        dataMap={trucksMap}
                        listIds={trucksList}
                        maxTags={10}
                        LabelComponent={TruckLabel}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={false}
                    text="common:button.add"
                    disabled={!methods.formState.isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
