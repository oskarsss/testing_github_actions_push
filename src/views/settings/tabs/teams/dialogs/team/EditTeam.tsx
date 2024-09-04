import React, { useEffect } from 'react';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm, useWatch } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamFields, { TeamDefaultValues, schema } from './TeamFields';

type Props = {
    teamId: string;
    name: string;
    description: string;
    logoUrl: string;
};

export const useEditTeamDialog = hookFabric(EditTeam);

export default function EditTeam({
    teamId,
    name,
    description,
    logoUrl
}: Props) {
    const dialog = useEditTeamDialog();
    const [trigger] = TeamsGrpcService.useUpdateTeamMutation();
    const [updateLogo] = TeamsGrpcService.useUpdateTeamLogoUrlMutation();
    const methods = useForm<TeamDefaultValues>({
        defaultValues: {
            name,
            description,
            logoUrl: logoUrl || ''
        },
        resolver: yupResolver(schema)
    });

    const watchedLogoUrl = useWatch({ control: methods.control, name: 'logoUrl' });

    useEffect(() => {
        if (watchedLogoUrl !== logoUrl) {
            methods.setValue('logoUrl', watchedLogoUrl);
            updateLogo({
                teamId,
                logoUrl: watchedLogoUrl
            });
        }
    }, [watchedLogoUrl]);

    const submit = async (data: TeamDefaultValues) => {
        await trigger({
            name       : data.name,
            teamId,
            description: data.description
        }).unwrap();
        dialog.close();
    };
    return (
        <TeamFields
            methods={methods}
            submit={submit}
            title="settings:teams.dialog.edit.header.title"
            translationOptions={{ name }}
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={false}
                type="update"
                disabled={!methods.formState.isDirty}
            />
        </TeamFields>
    );
}
