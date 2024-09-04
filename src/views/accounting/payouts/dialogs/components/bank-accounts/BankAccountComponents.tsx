import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    width        : '100%',
    gap          : '12px',
    overflow     : 'auto',
    paddingLeft  : '20px',
    marginTop    : '12px',

    '&::-webkit-scrollbar': {
        width  : '4px !important',
        height : '4px !important',
        opacity: ' 1 !important'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} !important`,
        borderRadius   : '16px !important',
        width          : '4px !important'
    },
    '&::-webkit-scrollbar-track-piece:vertical': {
        width          : '4px !important',
        backgroundColor: `${theme.palette.semantic.background.secondary} !important`
    }
}));

type WrapperProps = {
    selected: boolean;
    isEdit?: boolean;
};

const Wrapper = styled('div')<WrapperProps>(({
    theme,
    selected,
    isEdit
}) => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'flex-start',
    padding      : '8px',
    borderRadius : '4px',
    gap          : '8px',
    border       : `1px solid ${
        selected
            ? theme.palette.semantic.border.brand.primary
            : theme.palette.semantic.border.primary
    }`,
    cursor         : isEdit ? 'default' : 'pointer',
    backgroundColor: selected ? theme.palette.semantic.foreground.brand.tertiary : undefined,

    ...(isEdit
        ? {}
        : {
            '&:hover': {
                backgroundColor: theme.palette.semantic.foreground.brand.tertiary
            }
        })
}));

const Rows = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '4px',
    width        : '100%'
}));

const Row = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px',
    width         : '100%'
}));

const Label = styled('p')(({ theme }) => ({
    margin    : 0,
    fontSize  : '12px',
    fontWeight: 500,
    lineHeight: 1.5,
    color     : theme.palette.semantic.text.primary
}));

const Value = styled('p')<{ color?: 'primary' | 'secondary' }>(
    ({
        theme,
        color = 'secondary'
    }) => ({
        margin       : 0,
        fontSize     : '12px',
        fontWeight   : 500,
        lineHeight   : 1.5,
        textTransform: 'uppercase',
        color        : theme.palette.semantic.text[color]
    })
);

const AddButton = styled(Button)({
    height       : '24px',
    padding      : '0 8px',
    borderRadius : '4px',
    textTransform: 'none',
    fontSize     : '12px',
    fontWeight   : 500,
    lineHeight   : 1.5,
    minWidth     : 'auto',

    '.MuiButton-startIcon': {
        marginRight: '4px',
        svg        : {
            fontSize: '16px'
        }
    }
});

const BankAccountComponents = {
    Container,
    AddButton,
    Wrapper,
    Rows,
    Row,
    Label,
    Value
};

export default BankAccountComponents;
