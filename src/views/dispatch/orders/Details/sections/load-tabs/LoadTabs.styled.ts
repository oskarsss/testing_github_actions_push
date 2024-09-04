/* eslint-disable max-len */
import { styled, Theme } from '@mui/material';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import TabPanelMui from '@mui/lab/TabPanel';
import { IChipColors } from '@/@core/theme/chip';

const Container = styled('div')({
    height       : '100%',
    overflow     : 'hidden',
    flex         : '3 1 0',
    display      : 'flex',
    flexDirection: 'column'
});

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    '& .ps__rail-y': {
        width: '6px !important'
    },
    '& .ps__thumb-y': {
        width: '4px !important',
        right: '1px !important'
    }
});

type StyledProps = {
    selected: boolean;
    count: number | null | string;
    theme?: Theme;
    color?: IChipColors;
};

const Label = styled('p')<StyledProps>(({
    theme,
    selected,
    count,
    color
}) => ({
    fontSize     : '14px',
    fontWeight   : 600,
    margin       : 0,
    textTransform: 'capitalize',
    display      : 'flex',
    alignItems   : 'center',

    '&:after': {
        content       : count ? `"${count}"` : null,
        marginLeft    : '4px',
        padding       : '0 4px',
        borderRadius  : '50%',
        fontSize      : '12px',
        minWidth      : '20px',
        minHeight     : '20px',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        lineHeight    : 1,
        fontWeight    : 600,
        background    : selected
            ? theme.palette.semantic.foreground.brand.secondary
            : theme.palette.semantic.background.secondary,
        color: selected
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.semantic.text.secondary,
        ...(color && {
            background: theme.palette.utility.foreground[color].tertiary,
            color     : theme.palette.utility.foreground[color].primary
        })
    }
}));

const TabPanel = styled(TabPanelMui)({
    width        : '100%',
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'column',
    padding      : 0
});

const LoadTabsStyled = {
    Container,
    PerfectScrollbar,
    Label,
    TabPanel
};

export default LoadTabsStyled;
