import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamFields, { TeamDefaultValues, schema } from './TeamFields';

export const useCreateTeamDialog = hookFabric(CreateTeam);

export default function CreateTeam() {
    const [trigger] = TeamsGrpcService.useCreateTeamMutation();

    const dialog = useCreateTeamDialog(true);

    const methods = useForm<TeamDefaultValues>({
        defaultValues: {
            name       : '',
            description: '',
            logoUrl    : ''
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: TeamDefaultValues) => {
        await trigger({
            name       : data.name,
            description: data.description,
            logoUrl    : data.logoUrl
        }).unwrap();
        dialog.close();
    };

    return (
        <TeamFields
            methods={methods}
            submit={submit}
            title="settings:teams.dialog.create.header.title"
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={false}
                type="create"
                disabled={!methods.formState.isDirty}
            />
        </TeamFields>
    );
}
