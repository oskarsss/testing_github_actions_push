import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import React from 'react';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { TeamsGetReply_Team } from '@proto/teams';
import { useCreateTeamDialog } from '../../dialogs/team/CreateTeam';

type Props = {
    value: TabsValue;
    setValue: (value: TabsValue) => void;
    teams: TeamsGetReply_Team[];
};

export default function TeamsHeader({
    value,
    setValue,
    teams
}: Props) {
    const dialog = useCreateTeamDialog();
    const onClick = () => {
        dialog.open({});
    };
    return (
        <SettingsHeader
            title="settings:navigation.organization.teams"
            icon={<SettingIcons.Teams fontSize="large" />}
            onClick={onClick}
            children_left_side={(
                <SettingsHeaderTabs
                    value={value}
                    setValue={setValue}
                    categories={teams}
                />
            )}
        />
    );
}
