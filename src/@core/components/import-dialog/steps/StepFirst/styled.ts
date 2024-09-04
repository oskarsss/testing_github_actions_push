import { styled } from '@mui/material/styles';
import FileCopy from '@mui/icons-material/FileCopy';
import MuiLink from '@mui/material/Link';
import { hexToRGBA } from '@/utils/hex-to-rgba';

export const ContentWrapper = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : 1,
    order        : 4,
    width        : '100%'
}));

export const Container = styled('div')(() => ({
    overflow     : 'auto',
    position     : 'relative',
    display      : 'flex',
    flex         : '1 0 0',
    flexDirection: 'column',
    width        : '100%',
    margin       : '50px auto 16px'
}));
export const Title = styled('h5')(() => ({
    fontWeight: 600,
    fontSize  : '20px',
    margin    : '0 0 24px',
    span      : {
        fontWeight: 400
    }
}));
export const RequiredFileTitle = styled('div')(() => ({
    display     : 'flex',
    alignItems  : 'flex-end',
    marginBottom: '20px',
    h5          : {
        fontWeight: 600,
        fontSize  : '20px',
        margin    : 0
    }
}));
export const Links = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'flex-end'
}));
export const Link = styled(MuiLink)(() => ({
    fontWeight: 600,
    marginLeft: '10px'
}));
export const DownloadBlock = styled('div')(() => ({
    display     : 'flex',
    alignItems  : 'flex-end',
    gap         : '32px',
    marginBottom: '32px',
    button      : {
        flexShrink: 0
    }
}));

export const UploadFilesContainer = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : 24,
    flex         : 1,
    width        : '100%'
}));

export const UploadFileItem = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : 1
}));

export const Dropzone = styled('div')<{ isDragActive: boolean }>(({
    theme,
    isDragActive
}) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    flex         : 1,
    width        : '100%',
    paddingBottom: '20px',
    cursor       : 'pointer',

    // backgroundColor: getBackgroundColor(theme, isDragActive),
    backgroundColor: isDragActive
        ? theme.palette.semantic.foreground.brand.secondary
        : theme.palette.semantic.background.primary,
    border: `2px solid ${
        isDragActive ? theme.palette.semantic.foreground.brand.primary : '#DDE0E4'
    }`,
    borderRadius: '16px',
    transition  : 'background-color 250ms',
    '&:hover'   : {
        backgroundColor: theme.palette.semantic.foreground.brand.secondary
    },
    h5: {
        fontWeight: 600,
        fontSize  : '20px',
        margin    : '0 0 8px',
        color     : theme.palette.semantic.text.primary
    },
    p: {
        margin: 0,
        color : theme.palette.semantic.text.secondary
    }
}));
export const UploadFile = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : 'calc(100% - 48px)',
    padding       : '12px 8px 12px 12px',
    background    : theme.palette.semantic.background.primary,
    border        : `2px solid ${theme.palette.semantic.border.secondary}`,
    boxShadow     : '4px 4px 16px rgba(117, 135, 170, 0.15)',
    borderRadius  : '16px',
    margin        : '12px 24px',
    cursor        : 'default'
}));
export const BottomNext = styled('div')(() => ({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-end',
    marginTop     : 'auto',
    button        : {
        width     : '120px',
        fontWeight: 700,
        fontSize  : '18px'
    }
}));
export const FileCopyIcon = styled(FileCopy)(({ theme }) => ({
    padding        : '4px',
    backgroundColor: hexToRGBA(theme.palette.semantic.foreground.brand.primary, 0.12),
    borderRadius   : '8px',
    fontSize       : '44px',
    color          : theme.palette.semantic.foreground.brand.primary,
    marginRight    : '20px'
}));
export const ProcessContainer = styled('div')(() => ({
    flexGrow: 1,
    h6      : {
        margin    : '0 0 5px',
        fontWeight: 600,
        fontSize  : '14px'
    },
    '& > div': {
        display   : 'flex',
        alignItems: 'center'
    }
}));
export const Size = styled('p')(() => ({
    margin  : '0 21px 0 0',
    fontSize: '12px',
    color   : '#8b8d92',
    width   : '70px'
}));
export const Indicator = styled('div')(({ theme }) => ({
    height         : '8px',
    flexGrow       : 1,
    backgroundColor: theme.palette.semantic.foreground.brand.primary,
    borderRadius   : '8px',
    overflow       : 'hidden',
    marginRight    : '8px',
    span           : {
        display        : 'block',
        height         : '100%',
        backgroundColor: theme.palette.semantic.foreground.brand.primary,
        transition     : 'all 500ms'
    }
}));
export const Percent = styled('p')(() => ({
    margin    : 0,
    width     : '36px',
    fontWeight: 700,
    fontSize  : '12px',
    lineHeight: 1.5
}));
export const RightBlock = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    button        : {
        fontSize: '24px',
        color   : '#bdc7d2'
    }
}));
export const LottieBox = styled('div')(() => ({
    height: 50,
    width : 50
}));
