import { styled } from '@mui/material';

const DeleteButton = styled('div')(() => ({
    position: 'absolute',
    top     : 2,
    right   : 4,
    cursor  : 'pointer',
    svg     : {
        position: 'relative',

        zIndex: 3,
        width : 18,
        height: 18,
        color : '#98A2B3'
    },
    '&:hover': {
        '&:before': {
            content        : "''",
            position       : 'absolute',
            zIndex         : 2,
            top            : -7,
            right          : -7,
            width          : 32,
            height         : 32,
            borderRadius   : '100%',
            backgroundColor: 'rgba(138, 141, 147, 0.04)'
        }
    }
}));

const Label = styled('div')(({ theme }) => ({
    width         : '100%',
    height        : 72,
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'flex-start',
    justifyContent: 'center',
    padding       : '10px 32px',
    textTransform : 'capitalize',
    maxWidth      : '300px',

    backgroundColor:
        theme.palette.mode === 'light' ? '#F2F8FF' : theme.palette.semantic.background.secondary
}));

const Status = styled('div')(({ theme }) => ({
    fontWeight: 500,
    fontSize  : 14,
    lineHeight: '120%',
    flexGrow  : 1,
    color     : theme.palette.semantic.text.secondary
}));

const Location = styled('div')(({ theme }) => ({
    display   : 'flex',
    fontWeight: 400,
    fontSize  : 16,
    color     : theme.palette.semantic.text.primary,
    flexGrow  : 1
}));

const LabelTabStyled = {
    DeleteButton,
    Label,
    Location,
    Status
};

export default LabelTabStyled;
