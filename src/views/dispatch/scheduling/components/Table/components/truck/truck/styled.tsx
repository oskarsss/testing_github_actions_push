import { styled } from '@mui/material/styles';

export const Container = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    marginRight  : '8px'
});

export const Amount = styled('div')(({ theme }) => ({
    fontWeight   : 700,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    color        : theme.palette.semantic.foreground.brand.primary
}));

export const AmountForMile = styled('div')(({ theme }) => ({
    fontWeight   : 400,
    fontSize     : '12px',
    lineHeight   : '157%',
    letterSpacing: '0.1px',
    color        : theme.palette.semantic.text.secondary,
    marginTop    : '1px'
}));

export const Column = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    marginLeft   : '8px',
    fontWeight   : 400,
    fontSize     : '10px',
    lineHeight   : '157%',
    letterSpacing: '0.1px',
    textTransform: 'capitalize',
    color        : theme.palette.semantic.text.secondary
}));

export const PrimaryText = styled('div')(({ theme }) => ({
    fontWeight   : 700,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    color        : theme.palette.semantic.text.primary
}));

type StatusChipProps = {
    isTransit: boolean;
};

export const StatusChip = styled('div')<StatusChipProps>(({
    isTransit,
    theme
}) => ({
    padding        : '4px 12px',
    borderRadius   : '4px',
    width          : 'fit-content',
    backgroundColor: theme.palette.utility.foreground[isTransit ? 'blue_dark' : 'error'].tertiary,
    boxShadow      : '0px 2px 4px rgba(0, 0, 0, 0.1)',

    span: {
        fontSize     : 12,
        fontWeight   : 500,
        color        : theme.palette.utility.text[isTransit ? 'blue_dark' : 'error'],
        display      : 'flex',
        alignItems   : 'center',
        textWrap     : 'nowrap',
        textTransform: isTransit ? 'capitalize' : 'uppercase'
    }
}));
