import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { IChipColors } from '@/@core/theme/chip';

const Container = styled(Stack)(() => ({
    display      : 'flex',
    flexDirection: 'column'
}));

type TopWrapper = {
    statusColor: IChipColors;
};

const TopWrapper = styled(Stack)<TopWrapper>(({
    theme,
    statusColor
}) => ({
    height           : '28px',
    flexDirection    : 'row',
    alignItems       : 'center',
    gap              : '4px',
    padding          : '0px 12px 0px 12px',
    borderRadius     : '4px 4px 0px 0px',
    overflow         : 'hidden',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.utility.foreground[statusColor]?.primary,
    backgroundColor  : theme.palette.utility.foreground[statusColor]?.secondary
}));

const BottomWrapper = styled(Stack)(({ theme }) => ({
    height         : '26px',
    flexDirection  : 'row',
    alignItems     : 'center',
    justifyContent : 'space-between',
    gap            : '6px',
    padding        : '0px 12px 0px 12px',
    borderRadius   : '0px 0px 4px 4px',
    overflow       : 'hidden',
    borderBottom   : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderLeft     : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRight    : `1px solid ${theme.palette.semantic.border.secondary}`,
    boxShadow      : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

const ManifestHeaderStyled = {
    Container,
    TopWrapper,
    BottomWrapper
};
export default ManifestHeaderStyled;
