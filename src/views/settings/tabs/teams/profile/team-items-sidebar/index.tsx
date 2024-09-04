import { Stack, styled } from '@mui/material';
import React from 'react';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import PageTabsStyled from '@/@core/ui-kits/basic/page-tabs/PageTabs.styled';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import { TeamRetrieveReply_Team } from '@proto/teams';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Members from './tabs/Members';
import DriversTab from './tabs/Drivers';
import TrucksTab from './tabs/Trucks';
import TrailersTab from './tabs/Trailers';

const Container = styled('div')(({ theme }) => ({
    border       : `1px solid ${theme.palette.semantic.border.primary}`,
    borderRadius : '4px',
    display      : 'flex',
    flexDirection: 'column',
    overflow     : 'hidden'
}));

const Label = ({
    counts,
    label,
    isSelected
}: {
    counts: number;
    label: string;
    isSelected: boolean;
}) => (
    <Stack
        direction="row"
        alignItems="center"
        gap={2}
    >
        {label}
        <CountBadge
            isSelected={isSelected}
            count={counts}
        />
    </Stack>
);

const TABS_CONFIG = [
    {
        label: 'entity:members',
        value: 'members'
    },
    {
        label: 'entity:drivers',
        value: 'drivers'
    },
    {
        label: 'entity:trucks',
        value: 'trucks'
    },
    {
        label: 'entity:trailers',
        value: 'trailers'
    }
] as const;

type Props = {
    team: TeamRetrieveReply_Team;
};

export default function TeamItemsSidebarContent({ team }: Props) {
    const { t } = useAppTranslation();
    const [value, setValue] = React.useState('members');

    const countsMap = {
        members : team.users.length,
        drivers : team.drivers.length,
        trucks  : team.trucks.length,
        trailers: team.trailers.length
    } as const;

    return (
        <Container>
            <>
                <PageTabsStyled.Tabs
                    sx={{
                        borderBottom: ({ palette }) =>
                            `1px solid ${palette.semantic.border.primary}`
                    }}
                    value={value}
                    onChange={(_, value) => setValue(value)}
                >
                    {TABS_CONFIG.map((tab) => (
                        <PageTab
                            key={tab.value}
                            label={(
                                <Label
                                    counts={countsMap[tab.value]}
                                    isSelected={value === tab.value}
                                    label={t(tab.label)}
                                />
                            )}
                            value={tab.value}
                        />
                    ))}
                </PageTabsStyled.Tabs>
                <Stack
                    padding="16px"
                    overflow="hidden"
                >
                    {value === 'members' && (
                        <Members
                            users={team.users}
                            teamId={team.teamId}
                        />
                    )}
                    {value === 'drivers' && (
                        <DriversTab
                            drivers={team.drivers}
                            teamId={team.teamId}
                        />
                    )}
                    {value === 'trucks' && (
                        <TrucksTab
                            trucks={team.trucks}
                            teamId={team.teamId}
                        />
                    )}
                    {value === 'trailers' && (
                        <TrailersTab
                            trailers={team.trailers}
                            teamId={team.teamId}
                        />
                    )}
                </Stack>
            </>
        </Container>
    );
}
