import { Stack, Typography, styled } from '@mui/material';
import React from 'react';
import ManifestDetailsIcons from '../../icons';
import DonutChart from './DonutChart';
import Controllers from './Controllers';
import ExpensesOverview from './Overview';

const Header = styled('div')(({ theme }) => ({
    display      : 'flex',
    alignItems   : 'center',
    paddingBottom: '12px',
    gap          : '4px',
    borderBottom : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const ContentWrapper = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    padding   : '12px',
    flex      : '1 1 100%',

    borderRadius: '4px',
    marginTop   : '14px',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`
}));

type Props = {
    actualExpenses: string;
    estimatedExpenses: string;
};

function Expenses({
    actualExpenses,
    estimatedExpenses
}: Props) {
    return (
        <Stack
            direction="column"
            height="100%"
            maxHeight="340px"
            gap="16px"
        >
            <Header>
                <ManifestDetailsIcons.Expenses color="primary" />
                <Typography
                    fontWeight={600}
                    fontSize="16px"
                >
                    Expenses
                </Typography>
            </Header>
            <ContentWrapper>
                <Stack width={1 / 2}>
                    <DonutChart />
                </Stack>
                <Stack
                    width={1 / 2}
                    direction="column"
                    gap="4px"
                >
                    <Controllers />
                </Stack>
            </ContentWrapper>
            <ExpensesOverview
                actualExpenses={actualExpenses}
                estimatedExpenses={estimatedExpenses}
            />
        </Stack>
    );
}

export default Expenses;
