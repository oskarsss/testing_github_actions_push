import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useStableArray } from '@/hooks/useStable';
import { TrailerModel_Status } from '@proto/models/model_trailer';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import ChipAutocomplete, { FilterOptions } from '../ChipAutocomplete';
import TrailerOption from './Option';
import TrailerLabel from './Label';
import BrandCheckbox from '../../../../../../../@core/ui-kits/basic/brand-checkbox/BrandCheckbox';

type Props = { teamId: string; existTrailers: string[] };

export const useAddTrailersToTeamDialog = hookFabric(AddMembers, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        turnOffCloseButton
        maxWidth="500px"
    />
));

type DefaultValues = {
    trailerIds: string[];
};
const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    trailerIds: yup
        .array()
        .of(yup.string().required())
        .required('Select at least one trailer')
        .min(1)
});

export default function AddMembers({
    teamId,
    existTrailers
}: Props) {
    const [showDeleted, setShowDeleted] = useState(false);
    const [trigger] = TeamsGrpcService.useCreateTeamTrailerMutation();
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();

    const trailersList = useStableArray(
        Object.values(trailersMap)
            .filter((trailer) => showDeleted || trailer.status !== TrailerModel_Status.DELETED)
            .map((trailer) => trailer.trailerId)
            .filter((trailerId) => !existTrailers.includes(trailerId))
    );

    const dialog = useAddTrailersToTeamDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            trailerIds: []
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            teamId,
            trailersId: data.trailerIds
        });
        dialog.close();
    };

    const filterOptions: FilterOptions = (options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.reduce((acc, option) => {
            const trailer = trailersMap[option];
            const trailerType = trailerTypesMap[trailer.trailerTypeId];
            const searched =
                `${trailer?.referenceId}${trailerType?.name}${trailer.status}${trailer?.model}${trailer?.year}`
                    .toLowerCase()
                    .includes(inputValue);
            if (searched) acc.push(option);
            return acc;
        }, [] as string[]);
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="settings:teams.team_items.dialog.create.trailers.header.title">
                <BrandCheckbox
                    label="settings:teams.team_items.dialog.create.trailers.fields.show_deleted_trailers.label"
                    checked={showDeleted}
                    setCheck={setShowDeleted}
                    sx={{ width: 'auto' }}
                />
            </DialogComponents.Header>
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <ChipAutocomplete
                        filterOptions={filterOptions}
                        label="settings:teams.team_items.dialog.create.trailers.fields.trailerIds.label"
                        OptionComponent={TrailerOption}
                        control={methods.control}
                        name="trailerIds"
                        dataMap={trailersMap}
                        listIds={trailersList}
                        maxTags={10}
                        LabelComponent={TrailerLabel}
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
