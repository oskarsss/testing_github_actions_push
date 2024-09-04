import { styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

const Container = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%',
    height        : 36,
    background    : theme.palette.semantic.background.white,
    borderTop     : `1px solid ${theme.palette.semantic.border.secondary}`
}));
const LeftSide = styled('div')(() => ({
    height        : '100%',
    width         : '100%',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-start'
}));
const RightSide = styled('div')(() => ({
    height        : '100%',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-start'
}));
const DraftSaved = styled('div')(({ theme }) => ({
    minWidth     : '282px',
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    fontWeight   : 500,
    fontSize     : '14px',
    lineHeight   : '140%',
    textTransform: 'uppercase',
    whiteSpace   : 'nowrap',
    color        : theme.palette.mode === 'light' ? '#667085' : theme.palette.semantic.text.secondary,
    marginRight  : 16,
    '& svg'      : {
        width      : 20,
        height     : 20,
        marginRight: 8
    }
}));
const DraftSavedRow = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center'
}));
const DeleteDraftBtn = styled(LoadingButton)(({ theme }) => ({
    whiteSpace : 'nowrap',
    color      : theme.palette.mode === 'light' ? '#667085' : theme.palette.semantic.text.secondary,
    marginRight: 16,
    '& svg'    : {
        width      : 20,
        height     : 20,
        marginRight: 8
    }
}));
const SubmitLoadBtn = styled(Button)(() => ({
    borderRadius      : 0,
    marginRight       : 0,
    height            : '100%',
    width             : '158px',
    color             : '#FFFFFF',
    fontWeight        : 500,
    fontSize          : 14,
    lineHeight        : '140%',
    textTransform     : 'uppercase',
    whiteSpace        : 'nowrap',
    '.MuiSvgIcon-root': {
        width      : 20,
        height     : 20,
        marginRight: 8,
        color      : '#FFFFFF'
    },
    '.MuiCircularProgress-root': {
        marginRight: 8,
        color      : '#FFFFFF'
    }
}));

const ToolbarStyled = {
    Container,
    LeftSide,
    RightSide,
    DraftSaved,
    DraftSavedRow,
    DeleteDraftBtn,
    SubmitLoadBtn
};

export default ToolbarStyled;
