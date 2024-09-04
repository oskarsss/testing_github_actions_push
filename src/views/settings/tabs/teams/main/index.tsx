import React, { useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useStableArray } from '@/hooks/useStable';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import TeamsHeader from './components/Header';
import TeamsTable from './components/Table';

export default function Teams() {
    const [value, setValue] = useState<TabsValue>(TabsValue.CURRENT);
    const {
        data,
        isLoading
    } = TeamsGrpcService.useGetTeamsQuery({});

    const teamsList = useStableArray(data?.teams);
    return (
        <Container>
            <TeamsHeader
                setValue={setValue}
                teams={teamsList}
                value={value}
            />
            <TeamsTable
                isLoading={isLoading}
                teams={teamsList}
                value={value}
            />
        </Container>
    );
}
