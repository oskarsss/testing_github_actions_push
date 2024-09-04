import { styled } from '@mui/material/styles';

export const Container = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '1 0 0',
    overflow     : 'hidden',
    position     : 'relative',
    width        : '100%',
    order        : 2
}));
export const ResultsContainer = styled('div')(() => ({
    padding   : 30,
    display   : 'flex',
    alignItems: 'flex-start',
    gap       : '24px'
}));
export const Left = styled('div')(() => ({
    marginBottom: '30px',
    h5          : {
        margin    : '0 0 8px',
        fontWeight: 600,
        fontSize  : '20px',
        lineHeight: 1.33
    }
}));
export const Right = styled('div')(() => ({
    display: 'flex',
    gap    : '12px'
}));
export const Description = styled('div')<{ isValidTable: boolean }>(({
    theme,
    isValidTable
}) => ({
    display     : 'flex',
    alignItems  : 'center',
    marginBottom: '24px',
    svg         : {
        color: isValidTable
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.utility.foreground.error.primary
    },
    p: {
        margin    : '0 0 0 8px',
        fontWeight: 500,
        fontSize  : '14px',
        color     : isValidTable
            ? theme.palette.semantic.text.secondary
            : theme.palette.utility.foreground.error.primary
    }
}));
export const ExtractedRows = styled('div')(({ theme }) => ({
    width         : '90px',
    padding       : '12px',
    border        : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius  : '8px',
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : '2px',
    h6            : {
        margin       : 0,
        fontWeight   : 600,
        fontSize     : '32px',
        lineHeight   : 1.23,
        textAlign    : 'center',
        letterSpacing: '0.25px'
    },
    p: {
        margin    : 0,
        fontWeight: 500,
        fontSize  : '14px',
        textAlign : 'center'
    }
}));
export const InformationRows = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '6px'
}));
export const InformationItem = styled('div')<{ isError?: boolean }>(({ isError }) => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '12px',
    p         : {
        margin         : 0,
        padding        : '6px 9px',
        minWidth       : '65px',
        fontWeight     : 700,
        fontSize       : '16px',
        lineHeight     : 1.33,
        textAlign      : 'center',
        color          : isError ? '#CB281A' : '#285ff6',
        backgroundColor: isError ? '#F4F5FA' : '#e3effe',
        borderRadius   : '3px'
    },
    h6: {
        margin    : 0,
        fontWeight: 500,
        fontSize  : '14px',
        lineHeight: 1.33
    }
}));
export const Actions = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%',
    marginTop     : 'auto',
    span          : {
        fontWeight: 700,
        margin    : '0 4px'
    }
}));
