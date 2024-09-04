import { Button, Stack, styled, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const Container = styled(Stack)({
    flexDirection: 'column',
    padding      : '16px',
    width        : '100%',
    height       : '100%',
    overflow     : 'hidden'
});

const Wrapper = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'stretch',
    alignContent : 'flex-start',
    gap          : '8px',
    flexWrap     : 'wrap',
    position     : 'relative',
    height       : '100%',
    overflowX    : 'hidden',
    overflowY    : 'auto'
});

const CardContainer = styled(Stack)(({ theme }) => ({
    display                     : 'flex',
    flexDirection               : 'column',
    justifyContent              : 'space-between',
    borderRadius                : '8px',
    overflow                    : 'hidden',
    gap                         : '12px',
    padding                     : '16px 16px 12px 16px',
    minWidth                    : '260px',
    maxWidth                    : '260px',
    [theme.breakpoints.up('xl')]: {
        minWidth: '300px',
        maxWidth: '300px'
    },
    minHeight      : '180px',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

const CardRow = styled(Stack)({
    gap: 'inherit'
});

const CardDescription = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '12px !important',
    fontWeight: 500
}));

const CardDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.semantic.border.secondary,
    margin         : '0',
    width          : '100%'
}));

const CardBottomContainer = styled(Stack)({
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    gap           : '8px',
    height        : '31px'
});

const CardCategoryLabel = styled(Stack)(({ theme }) => ({
    borderRadius   : '16px',
    padding        : '2px 4px',
    flexDirection  : 'row',
    alignItems     : 'center',
    gap            : '4px',
    fontSize       : '10px',
    fontWeight     : 500,
    color          : theme.palette.semantic.text.primary,
    backgroundColor: theme.palette.semantic.foreground.secondary,

    '& svg': {
        width : '16px',
        height: '16px',
        fill  : theme.palette.semantic.foreground.primary
    }
}));

const CardCategoriesWrapper = styled(Stack)({
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
});

const CardButton = styled(LoadingButton)(({ theme }) => ({
    padding   : '4px 10px',
    fontSize  : '12px',
    fontWeight: 500,

    '& .MuiButton-startIcon': {
        marginRight: '4px',

        svg: {
            fill: `${theme.palette.semantic.foreground.brand.primary} !important`
        }
    }
}));

const TabsItems = styled(Stack)({
    marginTop    : '24px',
    marginBottom : '24px',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '8px',
    flexWrap     : 'wrap'
});

const TabsItem = styled(Button)<{ selected: boolean }>(({
    theme,
    selected = false
}) => ({
    textTransform  : 'none',
    fontWeight     : 500,
    fontSize       : '14px',
    lineHeight     : '150%',
    padding        : '8px 12px',
    borderRadius   : '8px',
    color          : theme.palette.semantic.text.primary,
    backgroundColor: selected
        ? theme.palette.semantic.foreground.brand.secondary
        : theme.palette.semantic.background.white,
    borderColor: selected
        ? theme.palette.semantic.border.brand.primary
        : theme.palette.semantic.border.secondary,
    display   : 'flex',
    alignItems: 'center',
    gap       : '8px',

    svg: {
        width : '16px',
        height: '16px',
        fill  : selected
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.semantic.foreground.primary
    }
}));

const IntegrationComponents = {
    Container,
    Wrapper,
    Card: {
        Container        : CardContainer,
        Row              : CardRow,
        Description      : CardDescription,
        Divider          : CardDivider,
        Bottom           : CardBottomContainer,
        Category         : CardCategoryLabel,
        CategoriesWrapper: CardCategoriesWrapper,
        Button           : CardButton
    },
    Tabs: {
        Items: TabsItems,
        Item : TabsItem
    }
};

export default IntegrationComponents;
