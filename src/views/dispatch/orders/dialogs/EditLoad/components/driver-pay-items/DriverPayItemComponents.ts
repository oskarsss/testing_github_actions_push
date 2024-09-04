import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import { Stack, Typography, Button } from '@mui/material';
import { IChipColors } from '@/@core/theme/chip';

type HeaderButtonExpandProps = {
    expanded: boolean;
    statusColor: IChipColors;
};

const ButtonExpand = styled(MuiIconButton)<HeaderButtonExpandProps>(
    ({
        expanded,
        theme,
        disabled,
        statusColor
    }) => ({
        svg: {
            width     : '16px',
            height    : '16px',
            transform : expanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
            color     : disabled
                ? theme.palette.semantic.foreground.disabled
                : theme.palette.utility.foreground[statusColor]?.primary
        }
    })
);

type ButtonAddDriverProps = {
    statusColor: IChipColors;
};

const ButtonAddDriver = styled(Button)<ButtonAddDriverProps>(({
    theme,
    statusColor
}) => ({
    backgroundColor         : 'transparent',
    color                   : theme.palette.utility.text[statusColor],
    '& .MuiButton-startIcon': {
        marginRight: '4px'
    },

    '&:hover': {
        backgroundColor: theme.palette.utility.foreground[statusColor]?.tertiary
    }
}));

const ManifestFriendlyId = styled(Typography)(({ theme }) => ({
    fontSize      : '16px',
    fontWeight    : 600,
    color         : theme.palette.semantic.text.brand.primary,
    textDecoration: 'underline',
    cursor        : 'pointer',
    marginRight   : '4px',
    transition    : 'color 0.3s ease',
    '&:hover'     : {
        color: theme.palette.semantic.text.brand.secondary
    }
}));

const AmountFormatted = styled(Typography)(({ theme }) => ({
    fontSize  : 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color     : theme.palette.semantic.text.primary
}));

const RowWrapper = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
});

const Row = styled(Stack)({
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px'
});

const DriverPayItemComponents = {
    ButtonExpand,
    ButtonAddDriver,
    ManifestFriendlyId,
    AmountFormatted,
    RowWrapper,
    Row
};

export default DriverPayItemComponents;
