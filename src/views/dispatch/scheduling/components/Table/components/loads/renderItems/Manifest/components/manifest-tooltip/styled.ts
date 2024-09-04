import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

const Row = styled(Stack)(() => ({
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px'
}));

const RowWrap = styled(Stack)(() => ({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
}));

type TextProps = {
    textColor?: 'primary' | 'secondary' | 'error' | 'disabled';
};

const Text = styled(Typography)<TextProps>(({
    theme,
    textColor = 'secondary'
}) => ({
    color:
        textColor !== 'error'
            ? theme.palette.semantic.text[textColor]
            : theme.palette.utility.text.error,
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: 1.4
}));

const ManifestTooltipStyled = {
    Row,
    RowWrap,
    Text
};

export default ManifestTooltipStyled;
