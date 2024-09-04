import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    margin       : 0,
    width        : '100%', // 'calc(100% + 64px)'
    height       : '100%', // 'calc(100% - 82px)'
    padding      : '12px', // '32px 32px 32px 96px'
    // marginLeft   : '-64px',
    position     : 'relative',
    background   : theme.palette.semantic.background.secondary,
    overflow     : 'auto',
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'stretch'
}));

type WrapperProps = {
    isColumn?: boolean;
};
export const Wrapper = styled('div')<WrapperProps>(({
    theme,
    isColumn
}) => ({
    display      : 'flex',
    flexDirection: isColumn ? 'column' : 'row',
    width        : isColumn ? '50%' : '100%',
    flexShrink   : 1,
    flexGrow     : 2,
    flexBasis    : 'max-content'
}));
