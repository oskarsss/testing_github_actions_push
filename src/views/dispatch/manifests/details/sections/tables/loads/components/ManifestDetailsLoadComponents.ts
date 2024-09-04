import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { Color } from '@/views/dispatch/manifests/details/sections/tables/loads/color-config';

const HeaderContainer = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    gap           : 2
}));

type HeaderButtonExpandProps = {
    expanded: boolean;
};

const HeaderButtonExpand = styled(MuiButton)<HeaderButtonExpandProps>(({
    expanded,
    theme
}) => ({
    borderRadius : '4px',
    height       : '24px',
    padding      : '0px 10px',
    fontSize     : '12px',
    fontWeight   : 600,
    lineHeight   : 1,
    textTransform: 'uppercase',
    color        : theme.palette.semantic.text.secondary,
    opacity      : 1,
    transition   : 'opacity 0.3s ease',

    '&:hover': {
        backgroundColor: 'transparent',
        opacity        : 0.8
    },

    '.MuiButton-icon': {
        marginLeft: '4px',

        svg: {
            width     : '16px',
            height    : '16px',
            transform : expanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
            color     : theme.palette.semantic.text.primary
        }
    }
}));

const HeaderLeftSide = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '12px'
}));

type HeaderLeftSideWrapperProps = {
    color?: Color;
};

const HeaderLeftSideWrapper = styled('div')<HeaderLeftSideWrapperProps>(({
    color,
    theme
}) => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px',
    color        : color ? theme.palette.utility.text[color] : undefined,

    svg: {
        color : color ? theme.palette.utility.foreground[color]?.primary : undefined,
        width : '24px',
        height: '24px'
    }
}));

const HeaderLeftSideLink = styled('p')(() => ({
    margin        : 0,
    color         : 'inherit',
    fontSize      : '18px',
    fontWeight    : 600,
    lineHeight    : 1.4,
    textDecoration: 'underline',
    cursor        : 'pointer'
}));

const HeaderLocation = styled('p')(({ theme }) => ({
    margin    : 0,
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '16px',
    fontWeight: 500,
    lineHeight: 1.4
}));

const BodyWrapper = styled('div')(({ theme }) => ({
    width          : '50%',
    height         : '100%',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    padding        : '16px 16px 0px 16px',
    boxShadow      : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    borderRadius   : '8px',
    border         : `1px solid ${theme.palette.semantic.border.secondary}`,
    display        : 'flex',
    flexDirection  : 'column',
    gap            : '12px',
    overflow       : 'hidden'
}));

const BodyHeaderContainer = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    gap           : 2,
    width         : '100%'
}));

const BodyHeaderWrapper = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
}));

const BodyHeaderTitle = styled('p')(({ theme }) => ({
    margin    : 0,
    fontSize  : '16px',
    fontWeight: 600,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.primary
}));

const BodyHeaderButton = styled(MuiButton)(({
    theme,
    variant,
    disabled
}) => ({
    height       : '24px',
    minWidth     : 'auto',
    padding      : '0px 8px !important',
    textTransform: 'none',
    borderRadius : '4px',
    fontSize     : '12px',
    fontWeight   : 600,
    lineHeight   : 1.66,

    '.MuiButton-startIcon': {
        marginRight: '2px',

        svg: {
            fontSize: '16px'
        }
    },

    ...(variant === 'outlined' && {
        borderColor: theme.palette.semantic.border.secondary,
        color      : theme.palette.semantic.text.secondary,

        svg: {
            transition: 'opacity 0.3s',
            color     : theme.palette.semantic.foreground.primary,
            opacity   : disabled ? 0.5 : 1
        },

        '&:hover': {
            borderColor    : theme.palette.semantic.border.secondary,
            backgroundColor: theme.palette.semantic.background.secondary
        }
    })
}));

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    marginRight  : '-16px',
    paddingRight : '16px',
    paddingBottom: '16px',

    '& .ps__rail-y': {
        width: '6px !important'
    },
    '& .ps__thumb-y': {
        width: '4px !important',
        right: '1px !important'
    }
});

const ManifestDetailsLoadComponents = {
    Header: {
        Container   : HeaderContainer,
        ExpandButton: HeaderButtonExpand,
        LeftSide    : HeaderLeftSide,
        LeftSideWrap: HeaderLeftSideWrapper,
        LeftSideLink: HeaderLeftSideLink,
        Location    : HeaderLocation
    },
    Body: {
        Wrapper        : BodyWrapper,
        HeaderContainer: BodyHeaderContainer,
        HeaderWrapper  : BodyHeaderWrapper,
        HeaderButton   : BodyHeaderButton,
        PerfectScrollbar,
        Title          : BodyHeaderTitle
    }
};

export default ManifestDetailsLoadComponents;
