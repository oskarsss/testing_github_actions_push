import { styled } from '@mui/material/styles';

export const Container = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : 1,
    width        : '100%',
    overflow     : 'hidden'
}));

export const Wrap = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    padding      : '32px 16px 16px',
    height       : '100%',
    overflow     : 'hidden'
}));

export const UploadFileInfo = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    flex          : 1
}));
