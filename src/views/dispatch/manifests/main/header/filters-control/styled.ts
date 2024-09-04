import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const TextButton = styled('span')(() => ({
    position  : 'relative',
    top       : '1px',
    marginLeft: '4px'
}));

const FilterButton = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== 'isDirty'
})<{ isDirty: boolean }>(({
    theme,
    isDirty
}) => ({
    padding   : '4px 8px',
    lineHeight: 1.5,
    minWidth  : '32px',
    minHeight : '40px',
    color     : isDirty
        ? theme.palette.semantic.foreground.brand.primary
        : theme.palette.semantic.text.disabled,

    '.MuiButton-startIcon': {
        margin: 0,
        svg   : {
            path: {
                fill: isDirty
                    ? theme.palette.semantic.foreground.brand.primary
                    : theme.palette.semantic.text.disabled
            }
        }
    }
}));

const FilterControlStyled = {
    TextButton,
    FilterButton
};

export default FilterControlStyled;
