import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { IconButton, Stack } from '@mui/material';
import { IChipColors } from '@/@core/theme/chip';

const Container = styled('div')({
    minHeight    : '100%',
    padding      : '16px 0px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '16px'
});

const RowContainer = styled(Stack)({
    flexDirection : 'row',
    gap           : '8px',
    alignItems    : 'center',
    justifyContent: 'space-between'
});

const RowWrapper = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '8px'
});

const MoreOptionsButton = styled(IconButton)(({
    theme,
    disabled
}) => ({
    borderRadius: '4px',
    boxShadow   : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    border      : `1px solid ${theme.palette.semantic.border.brand.primary}`,
    padding     : 0,
    width       : '24px',
    height      : '24px',

    ...(disabled && {
        border: `1px solid ${theme.palette.semantic.border.secondary}`
    }),

    svg: {
        width : '16px',
        height: '16px'
    }
}));

const EditButton = styled(MuiButton)({
    padding   : '0px 10px',
    height    : '20px',
    fontSize  : '12px',
    fontWeight: 600,
    lineHeight: 1.5,

    '.MuiButton-icon': {
        marginRight: '4px',
        svg        : {
            width : '16px',
            height: '16px'
        }
    }
});

const ManifestId = styled('p')<{ color: IChipColors }>(({
    theme,
    color
}) => ({
    margin    : 0,
    color     : theme.palette.utility.text[color],
    fontSize  : '14px',
    fontWeight: 600,
    lineHeight: 1.4
}));

const LoadStopsStyled = {
    Container,
    RowContainer,
    RowWrapper,
    ManifestId,
    MoreOptionsButton,
    EditButton
};

export default LoadStopsStyled;
