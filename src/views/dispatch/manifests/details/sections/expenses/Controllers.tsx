import React from 'react';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import { ColorsConfig, series } from './DonutChart';
import EstimatedBadge from './EstimatedBadge';

// type Props = {}

const Item = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between'
}));

const Label = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '14px',
    fontWeight: 500
}));

const Amount = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.primary,
    fontSize  : '16px',
    fontWeight: 500
}));

const Dot = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color'
})(({
    theme,
    color
}) => ({
    width          : '10px',
    height         : '10px',
    borderRadius   : '50%',
    backgroundColor: color
}));

export default function Controllers() {
    const { palette } = useTheme();
    const COLORS = ColorsConfig(palette);
    return series.map((item) => (
        <Item key={item.id}>
            <Stack
                direction="row"
                alignItems="center"
                gap={1}
                justifyContent="space-between"
            >
                <Dot color={COLORS[item.id]} />
                <Label>{item.label}</Label>
                {item.estimated && <EstimatedBadge />}
            </Stack>
            <Amount>${item.value}</Amount>
        </Item>
    ));
}
