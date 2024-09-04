import { Button, styled } from '@mui/material';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';

export const StepContainer = styled('div')(({ theme }) => ({
    background  : theme.palette.semantic.background.white,
    borderRadius: 16,
    padding     : 24,
    marginBottom: 16
}));
export const StepTitle = styled('div')(({ theme }) => ({
    position  : 'relative',
    display   : 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize  : 20,
    lineHeight: '120%',
    color     : theme.palette.semantic.text.primary,
    '& > svg' : {
        weight     : 32,
        height     : 32,
        marginRight: 12
    }
}));
export const StepButton = styled(Button)(() => ({
    fontWeight   : 500,
    fontSize     : 14,
    textTransform: 'uppercase',
    whiteSpace   : 'nowrap',
    marginLeft   : 16,
    display      : 'flex',
    alignItems   : 'center',
    svg          : {
        fontSize   : 20,
        marginRight: 4
    }
}));

export const SelectedContainer = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : '100%',
    height        : '100%',
    background    : theme.palette.semantic.background.white,
    borderRadius  : 16,
    padding       : 24,
    border        : `1px dashed ${theme.palette.semantic.border.secondary}`,
    svg           : {
        maxWidth: '100%',
        height  : 'auto'
    },
    p: {
        fontFamily: 'Inter',
        fontStyle : 'normal',
        fontWeight: 400,
        fontSize  : 16,
        lineHeight: '150%',
        textAlign : 'center',
        color     : theme.palette.semantic.text.secondary,
        margin    : 0
    }
}));
export const UploadFileTitle = styled('div')(({ theme }) => ({
    fontFamily: 'Inter',
    fontStyle : 'normal',
    fontWeight: 700,
    fontSize  : 22,
    lineHeight: '150%',
    textAlign : 'center',
    color     : theme.palette.mode === 'light' ? '#525164' : theme.palette.semantic.text.primary,
    margin    : '8px 0 16px'
}));
export const ChoosePdfButton = styled(Button)(() => ({
    fontFamily   : 'Inter',
    fontStyle    : 'normal',
    fontWeight   : 700,
    fontSize     : 22,
    lineHeight   : '150%',
    textTransform: 'capitalize',
    whiteSpace   : 'nowrap'
}));
export const DocumentUploaded = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : '100%',
    height        : '100%',
    background    : theme.palette.semantic.background.white,
    borderRadius  : 16
}));
export const DocumentUploadedIcon = styled('div')(() => ({
    width         : 109,
    height        : 109,
    background    : '#E1EEFF',
    borderRadius  : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    position      : 'relative',
    overflow      : 'hidden'
}));
export const Loading = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    height       : '100%',
    position     : 'absolute',
    transform    : 'translate3d(0, 90%, 0)',
    animation    : 'spin 2s infinite linear',
    '& svg'      : {
        width            : 42,
        height           : 42,
        '&:first-of-type': {
            marginBottom: 40
        }
    },
    '@keyframes spin': {
        '0%': {
            transform: 'translate3d(0, 90%, 0)'
        },
        '100%': {
            transform: 'translate3d(0, -125%, 0)'
        }
    }
}));
export const Title = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize  : 32,
    textAlign : 'center',
    color     : theme.palette.semantic.text.primary,
    margin    : '16px',
    hyphens   : 'auto'
}));
export const Text = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    height    : 22,
    fontWeight: 400,
    fontSize  : 18,
    lineHeight: 22,
    color     : theme.palette.semantic.text.secondary
}));

export const PerfectScrollbar = styled(PerfectScrollbarComponent)(() => ({
    height       : '100%',
    marginRight  : 32,
    display      : 'flex',
    flexDirection: 'column'
}));

export const DraftForm = styled('form')({
    position     : 'relative',
    display      : 'flex',
    flexDirection: 'column',
    overflow     : 'hidden',
    flexGrow     : 1,
    height       : '100%',
    width        : '100%'
});
