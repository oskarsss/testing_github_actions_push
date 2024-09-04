/* eslint-disable no-nested-ternary */
import { styled } from '@mui/material/styles';
import { LOAD_HEIGHT } from '@/views/dispatch/scheduling/components/Table/components/loads/renderItems/contants';
import { OverlayParams } from '@/views/dispatch/scheduling/components/Table/types';

export const RenderContainer = styled('div')({
    position: 'absolute',
    left    : 0,
    top     : 0,
    bottom  : 0,
    margin  : '8px 0',
    display : 'flex',
    width   : '100%',
    height  : '100%'
});

export const LoadsContainer = styled('div')({
    width         : '100%',
    height        : '100%',
    position      : 'absolute',
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'flex-start'
});

export const Column = styled('div')({
    width   : '100%',
    height  : LOAD_HEIGHT.large,
    position: 'relative'
});
export const Container = styled('div')(({ theme }) => ({
    position    : 'relative',
    display     : 'flex',
    alignItems  : 'center',
    height      : '100%',
    overflow    : 'hidden',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));
type OverlayProps = {
    overlayLoad: OverlayParams;
};
export const Overlay = styled('div')<OverlayProps>(({
    overlayLoad,
    theme
}) => ({
    position    : 'absolute',
    height      : '100%',
    background  : theme.palette.utility.foreground.error.primary,
    borderRadius: '2px',
    zIndex      : 2,
    width       : overlayLoad.widthOverlay,
    minWidth    : overlayLoad.widthOverlay,
    maxWidth    : overlayLoad.widthOverlay,
    backgroundImage:
        'url(\'data:image/svg+xml,%3Csvg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M1 5.5L5.82733 1.11152C6.20875 0.764775 6.79125 0.764774 7.17267 1.11152L12 5.5" stroke="white" stroke-linecap="round"%3E%3C/path%3E%3C/svg%3E\')',
    backgroundRepeatY  : 'no-repeat',
    backgroundPositionX: 'center',

    ...(overlayLoad?.positionOverlay?.right
        ? {
            right: `${overlayLoad.positionOverlay.right}px`
        }
        : {
            left: `${overlayLoad?.positionOverlay?.left}px`
        })
}));
