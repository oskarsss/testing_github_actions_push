import { styled } from '@mui/material/styles';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';
import MuiAccordion from '@mui/material/Accordion';

const Container = styled(MuiAccordionSummary)(({ theme }) => ({
    minHeight: '90px !important',
    padding  : '20px',

    '.MuiAccordionSummary-content': {
        justifyContent: 'space-between',
        alignItems    : 'flex-start',
        gap           : '4px',
        margin        : '0px !important'
    }
}));

const TextWrapper = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between'
}));

const Title = styled('h2')(({ theme }) => ({
    margin    : 0,
    fontSize  : '18px',
    fontWeight: 600,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.primary
}));

const Text = styled('p')(({ theme }) => ({
    margin    : 0,
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.secondary
}));

const Link = styled('span')(({ theme }) => ({
    margin    : 0,
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.brand.primary,
    cursor    : 'pointer',
    transition: 'opacity 0.3s',

    '&:hover': {
        opacity: 0.7
    }
}));

const IconContainer = styled('div')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '48px',
    height         : '48px',
    flexShrink     : 0,
    borderRadius   : '8px',
    backgroundColor: theme.palette.semantic.foreground.brand.secondary,

    svg: {
        width : '32px',
        height: '32px',
        color : theme.palette.semantic.text.brand.primary,
        fill  : theme.palette.semantic.text.brand.primary
    }
}));

const WrapperLeft = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '12px'
}));

const WrapperRight = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '12px',
    position     : 'absolute',
    right        : '20px',
    top          : '20px'
}));

type SummaryIconButtonProps = {
    expanded: boolean;
};

const IconButton = styled(MuiIconButton)<SummaryIconButtonProps>(({
    theme,
    expanded
}) => ({
    padding: '0px',
    svg    : {
        transition: 'transform 0.3s',
        transform : expanded ? 'rotate(180deg)' : 'rotate(0deg)',
        fontSize  : '24px',
        path      : {
            fill: theme.palette.semantic.foreground.primary
        }
    }
}));

const AdditionalButton = styled(MuiButton)(({ theme }) => ({
    fontSize    : '12px',
    fontWeight  : 600,
    lineHeight  : 1.5,
    padding     : '0px 10px',
    height      : '24px',
    borderRadius: '4px',
    color       : theme.palette.semantic.text.secondary,

    '.MuiButton-icon': {
        marginLeft: '4px',

        svg: {
            fontSize: '16px',
            color   : theme.palette.semantic.foreground.primary,
            stroke  : theme.palette.semantic.foreground.primary
        }
    }
}));

const Accordion = styled(MuiAccordion)(({ theme }) => ({
    marginTop   : '0px !important',
    borderRadius: '12px !important',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    background  : theme.palette.semantic.foreground.white.tertiary,
    boxShadow   : '0px 1px 2px 0px rgba(16, 24, 40, 0.05) !important',

    '&:before': {
        display: 'none'
    }
}));

const OnBoardingAccordionComponents = {
    Accordion,
    Container,
    TextWrapper,
    Title,
    Text,
    Link,
    IconContainer,
    WrapperLeft,
    WrapperRight,
    IconButton,
    AdditionalButton
};

export default OnBoardingAccordionComponents;
