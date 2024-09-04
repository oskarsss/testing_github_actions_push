import { styled } from '@mui/material/styles';

// -----------------  TABLE -----------------
export const ContainerTable = styled('div')(({ theme }) => ({
    position       : 'relative',
    flexGrow       : 1,
    display        : 'flex',
    flexDirection  : 'column',
    overflow       : 'hidden',
    width          : '100%',
    cursor         : 'pointer',
    padding        : '8px 8px 0 8px',
    backgroundColor: theme.palette.semantic.background.secondary
}));

// -----------------  BODY -----------------
export const ContainerBody = styled('div')({
    display      : 'flex',
    flexDirection: 'column'
});

// -----------------  HEADER -----------------
export const ContainerHeader = styled('div')({
    position: 'sticky',
    top     : 0,
    zIndex  : 2,
    display : 'flex',
    height  : '56px'
});

export const WrapFixed = styled('div')({
    overflow: 'hidden',
    position: 'sticky',
    left    : 0,
    float   : 'left',
    zIndex  : 3,
    height  : '56px'
});

type WrapRegularType = {
    totalFixedWidth: number;
};
export const WrapRegular = styled('div')<WrapRegularType>(({
    theme,
    totalFixedWidth
}) => ({
    display        : 'flex',
    flexDirection  : 'column',
    position       : 'absolute',
    backgroundColor: theme.palette.semantic.background.primary,
    transform      : `translate3d(${totalFixedWidth}px, 0px, 0px)`
}));

export const Row = styled('div')({
    height     : '56px',
    display    : 'flex',
    width      : 'fit-content',
    breakInside: 'avoid'
});

type columnType = {
    minWidth: number;
};

export const Column = styled('div')<columnType>(({ minWidth }) => ({
    minWidth,
    width   : minWidth,
    maxWidth: minWidth
}));

export const DayCell = styled('div')(({ theme }) => ({
    width          : '100%',
    height         : '36px',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    fontWeight     : 500,
    lineHeight     : '157%',
    textAlign      : 'center',
    letterSpacing  : '0.1px',
    textTransform  : 'uppercase',
    borderRadius   : '4px 4px 0 0',
    position       : 'relative',
    fontSize       : 14,
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    color          : theme.palette.semantic.text.primary,

    div: {
        position    : 'absolute',
        top         : 0,
        left        : 0,
        right       : 0,
        margin      : 'auto',
        background  : theme.palette.semantic.foreground.brand.primary,
        width       : '90%',
        height      : '4px',
        borderRadius: '0 0 8px 8px'
    },
    span: {
        fontWeight: 700,
        marginLeft: '4px'
    }
}));

export const PeriodList = styled('div')({
    display       : 'flex',
    justifyContent: 'space-between',
    width         : '100%',
    div           : {
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        height        : '20px',
        width         : 'calc((100% / 3) - 2px)',
        svg           : {
            margin: '0 4px'
        },
        span: {
            fontWeight   : 700,
            fontSize     : '8px',
            lineHeight   : '157%',
            letterSpacing: '0.1px',
            textTransform: 'capitalize'
        }
    }
});

export const Morning = styled('div')(({ theme }) => ({
    background  : theme.palette.utility.foreground.blue_dark.secondary,
    borderRadius: '0 0 0 4px',
    span        : {
        color: theme.palette.utility.foreground.blue_dark.primary
    },
    svg: {
        fill: theme.palette.utility.foreground.blue_dark.primary
    }
}));

export const Day = styled('div')(({ theme }) => ({
    background: theme.palette.utility.foreground.violet.secondary,
    span      : {
        color: theme.palette.utility.foreground.violet.primary
    },
    svg: {
        fill: theme.palette.utility.foreground.violet.primary
    }
}));

export const Evening = styled('div')(({ theme }) => ({
    background  : theme.palette.utility.foreground.purple.secondary,
    borderRadius: '0 0 0 4px',
    span        : {
        color: theme.palette.utility.foreground.purple.primary
    },
    svg: {
        fill: theme.palette.utility.foreground.purple.primary
    }
}));

// -----------------  ROW -----------------
export const ContainerRow = styled('div')({
    position: 'relative'
});

type RowFixedType = {
    minHeight: number;
    width: number;
};

export const RowFixed = styled('div')<RowFixedType>(({
    minHeight,
    width
}) => ({
    overflow      : 'hidden',
    position      : 'sticky',
    left          : 0,
    float         : 'left',
    zIndex        : 1,
    height        : '100%',
    paddingTop    : '3px',
    paddingBottom : '3px',
    display       : 'flex',
    justifyContent: 'space-between',
    minWidth      : width,
    maxWidth      : width,
    width,
    minHeight,
    boxShadow     : '18px 0px 20px -0px rgba(0,0,0,0.02)'

    // -webkit-box-shadow: 11px 0px 25px -14px rgba(0,0,0,0.75);
    // -moz-box-shadow: 11px 0px 25px -14px rgba(0,0,0,0.75);
}));

type RowRegularType = {
    totalFixedWidth: number;
};

export const RowRegular = styled('div')<RowRegularType>(({
    theme,
    totalFixedWidth
}) => ({
    display        : 'flex',
    flexDirection  : 'column',
    position       : 'absolute',
    top            : 0,
    bottom         : 0,
    transform      : `translate3d(${totalFixedWidth}px, 0px, 0px)`,
    backgroundColor: theme.palette.semantic.background.primary,
    height         : '100%'
}));
