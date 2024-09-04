import { styled } from '@mui/material';
import { PropsWithChildren } from 'react';

const Icon = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    overflow      : 'hidden',
    flexShrink    : 0,
    borderRadius  : 8,
    width         : 60,
    height        : 60,
    background    : theme.palette.semantic.foreground.white.tertiary,
    border        : `1px solid ${theme.palette.semantic.border.secondary}`,
    img           : {
        maxWidth    : 'inherit',
        width       : 'inherit',
        objectFit   : 'contain',
        borderRadius: '6px',
        height      : 'inherit'
    }
}));

export default function UploadLogoWrapper({ children }: PropsWithChildren) {
    return <Icon>{children}</Icon>;
}
