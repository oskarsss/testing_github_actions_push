import { styled } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

const Container = styled('div')(({ theme }) => ({
    position: 'relative',
    display : 'flex',

    flexDirection: 'column',

    justifyContent: 'space-between',
    padding       : 8,
    background    : theme.palette.semantic.foreground.brand.primary,
    borderRadius  : 16,
    marginBottom  : 4
}));

const Text = styled('div')(() => ({
    minWidth     : 379,
    display      : 'flex',
    flexDirection: 'column',
    fontSize     : 20,
    lineHeight   : '150%',
    padding      : '8px 16px',
    position     : 'relative',
    zIndex       : 4
}));

const TextTitle = styled('div')(() => ({
    fontWeight: 600,
    color     : '#F2F8FF',
    svg       : {
        width     : 20,
        height    : 20,
        marginLeft: 8,
        color     : '#8EA8FF',
        cursor    : 'pointer'
    }
}));

const TextSubtitle = styled('div')(() => ({
    fontWeight: 400,
    fontSize  : 16,
    color     : '#C6D7FF'
}));

const HelperText = styled(FormHelperText)(() => ({
    textAlign: 'right',
    padding  : '0 16px'
}));

const Decor = styled('div')(({ theme }) => ({
    position    : 'absolute',
    top         : 0,
    left        : 0,
    width       : '100%',
    height      : '100%',
    borderRadius: 16,
    overflow    : 'hidden',

    '&:before': {
        content     : "''",
        position    : 'absolute',
        zIndex      : 2,
        width       : 460,
        height      : 460,
        borderRadius: '100%',
        left        : '65%',
        top         : '-24px',
        background  : theme.palette.colors.brand[400]
    }
}));

const Button = styled('div', {
    label: 'upload-button'
})(({ theme }) => ({
    display : 'flex',
    overflow: 'hidden',
    width   : '100%',

    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 16,
    zIndex        : 3,
    cursor        : 'pointer',
    minHeight     : 80,
    background    : 'rgba(255, 255, 255, 0.1)',
    border        : '1px dashed #F2F8FF',
    backdropFilter: 'blur(40px)',
    borderRadius  : 16,
    padding       : 16,
    '&:hover'     : {
        background: 'rgba(255, 255, 255, 0.2)'
    },
    '&[data-error="true"]': {
        borderStyle: 'solid',
        borderColor: theme.palette.utility.foreground.error.primary
    }
}));

const ProcessIndicator = styled('div')(() => ({
    position    : 'absolute',
    top         : 0,
    left        : 0,
    height      : '100%',
    background  : 'rgba(242, 248, 255, 0.2)',
    borderRadius: 16,
    zIndex      : 4
}));

const ButtonIcon = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : 48,
    minWidth      : 48,
    height        : 48,
    borderRadius  : '100%',
    background    : theme.palette.semantic.text.white,
    marginRight   : 16,
    svg           : {
        width : 24,
        height: 24,
        color : theme.palette.semantic.foreground.brand.primary
    }
}));

const UploadIcon = styled('div')(() => ({
    width         : 48,
    minWidth      : 48,
    height        : 48,
    background    : '#E1EEFF',
    borderRadius  : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    position      : 'relative',
    overflow      : 'hidden'
}));

const ButtonText = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column'
}));

const Title = styled('div')(() => ({
    fontSize  : 18,
    fontWeight: 600,
    lineHeight: '120%',
    color     : '#F2F8FF'
}));

const Subtitle = styled('div')(() => ({
    fontSize  : 14,
    fontWeight: 400,
    lineHeight: '150%',
    color     : '#C6D7FF'
}));

const Loading = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    height       : '100%',
    position     : 'absolute',
    transform    : 'translate3d(0, 90%, 0)',
    animation    : 'spin 2s infinite linear',
    '& svg'      : {
        width            : 16,
        height           : 16,
        '&:first-of-type': {
            marginBottom: 16
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

const TitleDecor = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    width     : '100%',
    marginTop : '-4px',

    '&:before, &:after': {
        content   : '""',
        flexGrow  : 1,
        height    : 2,
        background: theme.palette.semantic.border.secondary
    },
    '& > span': {
        flexGrow  : 1,
        height    : 2,
        background: theme.palette.semantic.border.secondary
    },
    '& > p': {
        fontWeight   : 500,
        fontSize     : 13,
        lineHeight   : '143%',
        textAlign    : 'center',
        textTransform: 'uppercase',
        color        : theme.palette.semantic.text.secondary,
        padding      : '0 16px'
    }
}));

const UploadButtonStyled = {
    Container,
    Text,
    TextTitle,
    TextSubtitle,
    HelperText,
    Decor,
    Button,
    ProcessIndicator,
    ButtonIcon,
    UploadIcon,
    ButtonText,
    Title,
    Subtitle,
    Loading,
    TitleDecor
};

export default UploadButtonStyled;
