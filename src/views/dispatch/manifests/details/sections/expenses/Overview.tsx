import { Stack, Tooltip, styled } from '@mui/material';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type Props = {
    actualExpenses: string;
    estimatedExpenses: string;
};

const InfoBlock = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    flex           : '1 1 0',
    padding        : '8px 12px',
    border         : `1px solid ${theme.palette.semantic.border.secondary}`,
    maxHeight      : '65px',
    '&.lastElement': {
        borderRadius: '0 4px 4px 0'
    },
    '&.firstElement': {
        borderRadius: '4px 0 0 4px',
        borderRight : 'none'
    }
}));

const Title = styled('p')(({ theme }) => ({
    fontSize  : '12px',
    fontWeight: 500,
    color     : theme.palette.semantic.text.secondary,
    margin    : 0
}));

const Amount = styled('p')(({ theme }) => ({
    fontSize  : '24px',
    fontWeight: 600,
    margin    : 0
}));

export default function ExpensesOverview({
    actualExpenses,
    estimatedExpenses
}: Props) {
    return (
        <Stack direction="row">
            <InfoBlock className="firstElement">
                <Title>Actual Expenses</Title>
                <Amount>{actualExpenses}</Amount>
            </InfoBlock>

            <InfoBlock className="lastElement">
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <Title>Estimated Expenses</Title>
                    <Tooltip title="Some info">
                        <InfoOutlinedIcon
                            fontSize="small"
                            sx={{
                                width : '16px',
                                height: '16px'
                            }}
                            color="secondary"
                        />
                    </Tooltip>
                </Stack>
                <Amount>{estimatedExpenses}</Amount>
            </InfoBlock>
        </Stack>
    );
}
