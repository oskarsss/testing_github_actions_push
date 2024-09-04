import MuiAssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { styled, Theme } from '@mui/material/styles';

export const Container = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '1 0 auto',
    position     : 'relative',
    width        : '100%',
    height       : '100%',
    order        : 2,
    overflow     : 'hidden'
}));
export const Description = styled('div')(() => ({
    display       : 'flex',
    justifyContent: 'space-between',
    width         : '100%',
    margin        : '50px auto 40px auto',
    h5            : {
        margin    : '0 0 8px',
        fontWeight: 600,
        fontSize  : '20px',
        lineHeight: 1.33
    },
    p: {
        margin    : '0 0 0 8px',
        fontWeight: 500,
        fontSize  : '14px',
        color     : '#71737e'
    }
}));
export const AssignmentLateIcon = styled(MuiAssignmentLateIcon)<{ is_error: boolean }>(
    ({
        theme,
        is_error
    }) => ({
        color: is_error
            ? theme.palette.utility.foreground.error.primary
            : theme.palette.semantic.foreground.brand.primary
    })
);
export const Box = styled('div')(() => ({
    display     : 'flex',
    alignItems  : 'center',
    marginBottom: '24px'
}));
export const RightSide = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '32px'
}));
export const InformationItem = styled('div')<{ theme?: Theme; is_error?: boolean }>(
    ({
        theme,
        is_error
    }) => ({
        display     : 'flex',
        alignItems  : 'center',
        border      : '1px solid #e7eef6',
        borderRadius: '8px',
        minWidth    : '178px',
        padding     : '8px 24px',
        h6          : {
            margin       : '0 16px 0 0',
            fontWeight   : 600,
            fontSize     : '32px',
            lineHeight   : 1.23,
            letterSpacing: '0.25px',
            color        : is_error
                ? theme.palette.utility.foreground.error.primary
                : theme.palette.semantic.foreground.brand.primary
        },
        p: {
            margin       : 0,
            fontWeight   : 500,
            fontSize     : '14px',
            letterSpacing: '0.15px',
            width        : '85px',
            color        : is_error
                ? theme.palette.utility.foreground.error.primary
                : theme.palette.semantic.foreground.brand.primary
        }
    })
);

export const Actions = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    marginTop     : 'auto',
    marginBottom  : '40px'
}));
