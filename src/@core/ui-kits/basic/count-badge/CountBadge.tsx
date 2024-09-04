import { styled } from '@mui/material';
import React, { memo } from 'react';

type Props = {
    count: number | null | string;
    isSelected?: boolean;
    icon?: React.ReactNode;
};

const Container = styled('div', {
    shouldForwardProp(propName) {
        return propName !== 'isSelected';
    }
})<{
    selected: boolean;
}>(({
    theme,
    selected
}) => ({
    borderRadius   : '50%',
    padding        : '0px 4px',
    fontSize       : '12px',
    minWidth       : '20px',
    height         : '20px',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    gap            : '2px',
    fontWeight     : 500,
    lineHeight     : 1.5,
    flexShrink     : 0,
    backgroundColor: selected
        ? theme.palette.semantic.foreground.brand.secondary
        : theme.palette.semantic.foreground.secondary,
    color: selected
        ? theme.palette.semantic.foreground.brand.primary
        : theme.palette.semantic.text.secondary,

    svg: {
        width : '12px',
        height: '12px',
        color : selected
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.semantic.foreground.primary,
        fill: selected
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.semantic.foreground.primary
    }
}));

function CountBadge({
    count,
    isSelected = false,
    icon
}: Props) {
    return (
        <Container selected={isSelected}>
            {icon}
            {count}
        </Container>
    );
}

export default memo(CountBadge);
