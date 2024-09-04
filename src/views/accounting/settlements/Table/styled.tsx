/* eslint-disable import/prefer-default-export */
import { styled } from '@mui/material/styles';

export const InnerWrapper = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'flex-start',
    height        : '100%',
    width         : '100%',
    overflow      : 'hidden'
}));
