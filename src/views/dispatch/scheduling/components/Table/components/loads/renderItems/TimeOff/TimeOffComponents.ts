/* eslint-disable no-nested-ternary */

import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { LOAD_WIDTH_SIZE } from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/contants';

const DescriptionContainer = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    minWidth      : '90px',
    overflow      : 'hidden',
    padding       : '0 8px',

    svg: {
        color: theme.palette.semantic.foreground.primary
    }
}));

const Description = styled(Typography)(({ theme }) => ({
    margin       : 0,
    fontSize     : 12,
    letterSpacing: 0.4,
    lineHeight   : 1.66,
    color        : theme.palette.semantic.text.primary,
    textAlign    : 'center'
}));

type StopContainerProps = {
    loadWidth: number;
};

export const DateContainer = styled('div')<StopContainerProps>(({ loadWidth }) => ({
    display      : 'flex',
    flexDirection: 'column',
    ...(loadWidth <= LOAD_WIDTH_SIZE.medium
        ? {
            flexDirection : 'row',
            justifyContent: loadWidth <= LOAD_WIDTH_SIZE.extraSmall ? 'center' : 'space-between',
            alignItems    : 'center',
            width         : '100%'
        }
        : {})
}));

export const Date = styled(Typography)(({ theme }) => ({
    margin    : 0,
    fontSize  : 12,
    lineHeight: 1.5,
    fontWeight: 500,
    color     : theme.palette.semantic.text.secondary
}));

export const DateText = styled(Typography)(({ theme }) => ({
    margin    : 0,
    fontSize  : 12,
    lineHeight: 1.5,
    fontWeight: 600,
    color     : theme.palette.semantic.text.primary
}));

const TimeOffComponents = {
    DescriptionContainer,
    Description,
    DateContainer,
    Date,
    DateText
};

export default TimeOffComponents;
