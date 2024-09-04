import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import navigateToPage from '@/utils/navigateToPage';
import Container from '@/views/settings/components/Container/Container';
import { Stack, styled, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TeamItemsSidebarContent from './team-items-sidebar';
import AboutTeamSidebarContent from './AboutTeamSidebar';

const InnerWrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',
    gap          : '12px',
    overflow     : 'hidden'
}));

const TeamItemsSidebar = styled('div')(({ theme }) => ({
    display : 'flex',
    flex    : '1.2 1 0',
    overflow: 'hidden'
}));

const AboutTeamSidebar = styled('div')(({ theme }) => ({
    display: 'flex',
    flex   : '1 1 0'
}));

export default function TeamProfile() {
    const { t } = useAppTranslation();
    const router = useRouter();

    const { id } = router.query;

    const onClick = () => {
        navigateToPage('/settings/teams');
    };

    const {
        data,
        isLoading,
        isError
    } = TeamsGrpcService.useRetrieveTeamQuery({
        teamId: id as string
    });
    const team = data?.team;

    if (isLoading) {
        return <Preloader />;
    }

    if (!team || isError) {
        return <>Something went wrong</>;
    }
    return (
        <Container>
            <Stack
                alignItems="center"
                direction="row"
                gap={1}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    onClick={onClick}
                    sx={{
                        cursor: 'pointer'
                    }}
                >
                    <IconButton aria-label="back-to-teams">
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography
                        fontSize="20px"
                        fontWeight={600}
                        variant="body1"
                        sx={{
                            color: ({ palette }) => palette.semantic.text.primary
                        }}
                    >
                        {t('settings:teams.profile.back')}
                    </Typography>
                </Stack>
            </Stack>
            <InnerWrapper>
                <AboutTeamSidebar>
                    <AboutTeamSidebarContent
                        teamId={team.teamId}
                        description={team.description}
                        name={team.name}
                        src={team.logoUrl}
                    />
                </AboutTeamSidebar>
                <TeamItemsSidebar>
                    <TeamItemsSidebarContent team={team} />
                </TeamItemsSidebar>
            </InnerWrapper>
        </Container>
    );
}
