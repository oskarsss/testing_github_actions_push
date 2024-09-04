import { styled } from '@mui/material/styles';

export const Container = styled('div')<{ activeStep: number }>(({ activeStep }) => ({
    display   : 'flex',
    alignItems: 'center',
    width     : '100%',
    padding   : '0 24px',
    order     : activeStep === 0 ? 2 : 1
}));

export const Wrap = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center',
    flex      : 1
}));

export const Step = styled('p')<{ isActive: boolean }>(({
    theme,
    isActive
}) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '40px',
    minWidth       : '40px',
    height         : '40px',
    margin         : '0 16px 0 0',
    fontWeight     : 700,
    fontSize       : '24px',
    textAlign      : 'center',
    // eslint-disable-next-line max-len
    color          : isActive ? theme.palette.semantic.text.white : theme.palette.semantic.text.secondary,
    backgroundColor: isActive ? theme.palette.semantic.foreground.brand.primary : '',
    borderRadius   : '100%',
    border         : isActive ? 'none' : `2px solid ${theme.palette.semantic.border.secondary}`,
    boxShadow      : isActive ? 'none' : '2px 2px 8px rgba(117, 135, 170, 0.12)'
}));
export const Label = styled('p')<{ isActive: boolean }>(({
    theme,
    isActive
}) => ({
    margin    : 0,
    fontWeight: isActive ? 700 : 400,
    fontSize  : '14px',
    // eslint-disable-next-line max-len
    color     : isActive ? theme.palette.semantic.text.primary : theme.palette.semantic.text.secondary,
    whiteSpace: 'nowrap'
}));
export const Separator = styled('div')<{ activeStep: boolean }>(({
    theme,
    activeStep
}) => ({
    display    : 'block',
    width      : '100%',
    margin     : '0 26px',
    border     : '1px solid #bdc7d2',
    borderColor: activeStep ? theme.palette.semantic.foreground.brand.primary : ''
}));
