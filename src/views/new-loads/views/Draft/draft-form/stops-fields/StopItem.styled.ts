import { styled } from '@mui/material';

const Title = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    flexGrow  : 1,
    fontWeight: 600,
    fontSize  : 18,
    lineHeight: '150%',
    color     : theme.palette.semantic.text.primary
}));

const CheckboxContainer = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'column',
    flexShrink    : 0,
    height        : '48px',
    justifyContent: 'center'
}));

const Label = styled('div')(({ theme }) => ({
    fontWeight  : 400,
    fontSize    : 12,
    lineHeight  : '100%',
    color       : theme.palette.semantic.text.secondary,
    marginBottom: 6
}));

const StopIndicator = styled('div')(({ theme }) => ({
    position   : 'relative',
    width      : 32,
    height     : 'auto',
    marginRight: 42,
    '&:before' : {
        content   : "''",
        position  : 'absolute',
        left      : '50%',
        transform : 'translateX(-50%)',
        top       : 32,
        width     : 2,
        height    : '100%',
        borderLeft: `2px dashed ${theme.palette.semantic.border.secondary}`
    },
    '&:last-child': {
        'div:first-of-type:before': {
            border: 'none'
        }
    }
}));

const Distance = styled('div')(({ theme }) => ({
    position    : 'absolute',
    left        : '50%',
    transform   : 'translate(-50%, 50%)',
    top         : '50%',
    fontWeight  : 500,
    fontSize    : '12px',
    lineHeight  : '150%',
    textAlign   : 'center',
    color       : '#98A2B3',
    padding     : '2px 8px',
    background  : theme.palette.semantic.background.primary,
    boxShadow   : '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
    borderRadius: '24px',
    whiteSpace  : 'nowrap'
}));
const Container = styled('div')(() => ({
    display       : 'flex',
    marginTop     : 24,
    '&:last-child': {
        'div:first-of-type:before': {
            border: 'none'
        }
    }
}));

const StopItemStyled = {
    Title,
    CheckboxContainer,
    Label,
    StopIndicator,
    Distance,
    Container
};

export default StopItemStyled;
