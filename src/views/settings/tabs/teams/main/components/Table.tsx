import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import SettingTable from '@/views/settings/components/Table/Table';
import { TeamsGetReply_Team } from '@proto/teams';
import React, { useMemo } from 'react';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import navigateToPage from '@/utils/navigateToPage';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import columns from './columns';
import { useEditTeamDialog } from '../../dialogs/team/EditTeam';
import { useCreateTeamDialog } from '../../dialogs/team/CreateTeam';

type Props = {
    teams: TeamsGetReply_Team[];
    isLoading: boolean;
    value: TabsValue;
};
export default function TeamsTable({
    teams,
    isLoading,
    value
}: Props) {
    const confirm = useConfirm();
    const { emptyArray } = useStableLinks();
    const [deleteTrigger] = TeamsGrpcService.useDeleteTeamMutation();

    const editTeamDialog = useEditTeamDialog();
    const createTeamDialog = useCreateTeamDialog();

    const handleDeleteTeam = async ({ teamId }: { teamId: string }) => {
        await deleteTrigger({ teamId }).unwrap();
    };
    const openCreateTeamDialog = () => createTeamDialog.open({});

    const executeAction: ExecuteAction<TeamsGetReply_Team> = (name, {
        row,
        event
    }) => {
        if (row.deleted) return;
        switch (name) {
        case 'edit':
            editTeamDialog.open({
                teamId     : row.teamId,
                name       : row.name,
                description: row.description,
                logoUrl    : row.logoUrl
            });
            break;
        case 'delete':
            confirm({
                // icon: <DangerousIcon color="secondary" />,
                title             : 'settings:teams.dialog.delete.team.title',
                body              : 'settings:teams.dialog.delete.team.body',
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    body: {
                        name: row.name
                    }
                },
                onConfirm: () => handleDeleteTeam({ teamId: row.teamId })
            });
            break;

        case 'profile':
            navigateToPage(`/settings/teams/${row.teamId}`, event);
            break;
        default:
            break;
        }
    };

    const teamsList = useMemo(
        () =>
            teams.filter((category) =>
                value === TabsValue.CURRENT ? !category.deleted : category.deleted),
        [teams, value]
    );

    return (
        <SettingTable<TeamsGetReply_Team>
            rows={teamsList ?? emptyArray}
            isLoading={isLoading}
            elementKey="teamId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.TEAMS}
            onClickFallback={openCreateTeamDialog}
        />
    );
}
