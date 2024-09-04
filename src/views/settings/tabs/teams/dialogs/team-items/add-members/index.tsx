import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { useStableArray } from '@/hooks/useStable';
import ChipAutocomplete, { FilterOptions } from '../ChipAutocomplete';
import UserOption from './Option';
import UserLabel from './Label';

type Props = { teamId: string; existUsers: string[] };

export const useAddMembersToTeamDialog = hookFabric(AddMembers, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="500px"
    />
));

type DefaultValues = {
    usersIds: string[];
};
const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    usersIds: yup.array().of(yup.string().required()).required('Select at least one user')
        .min(1)
});

export default function AddMembers({
    teamId,
    existUsers
}: Props) {
    const [trigger] = TeamsGrpcService.useCreateTeamUserMutation();
    const usersMap = useUsersMap();

    const usersList = useStableArray(
        Object.values(usersMap)
            .map((user) => user.userId)
            .filter((userId) => !existUsers.includes(userId))
    );

    const dialog = useAddMembersToTeamDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            usersIds: []
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            usersId: data.usersIds,
            teamId
        });
        dialog.close();
    };

    const filterOptions: FilterOptions = (options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.reduce((acc, option) => {
            const user = usersMap[option];
            const searched = `${user?.firstName}${user?.lastName}`
                .toLowerCase()
                .includes(inputValue);
            if (searched) acc.push(option);
            return acc;
        }, [] as string[]);
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="settings:teams.team_items.dialog.create.members.header.title" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <ChipAutocomplete
                        filterOptions={filterOptions}
                        label="settings:teams.team_items.dialog.create.members.fields.usersIds.label"
                        OptionComponent={UserOption}
                        control={methods.control}
                        name="usersIds"
                        dataMap={usersMap}
                        listIds={usersList}
                        maxTags={10}
                        LabelComponent={UserLabel}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={false}
                    disabled={!methods.formState.isDirty}
                    text="common:button.add"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
