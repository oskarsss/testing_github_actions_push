import { styled } from '@mui/material/styles';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Container = styled(MuiAccordionDetails)(({ theme }) => ({}));

const RowsContainer = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'stretch',
    gap          : '8px',
    width        : '100%',
    paddingLeft  : '50px'
}));

const RowContainer = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '6px',
    width         : '100%',
    height        : '32px',
    padding       : '0 8px',
    borderRadius  : '8px',
    transition    : 'background-color 0.2s',
    cursor        : 'pointer',

    '.chevronUpIcon': {
        opacity   : 0,
        transition: 'opacity 0.2s',
        transform : 'rotate(90deg)'
    },

    '&:hover': {
        backgroundColor: theme.palette.semantic.foreground.secondary,

        '.chevronUpIcon': {
            opacity: 1
        }
    }
}));

const RowWrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '6px',

    svg: {
        width : '24px',
        height: '24px'
    }
}));

const RowLabel = styled('div')(({ theme }) => ({
    fontSize  : '16px',
    fontWeight: 500,
    lineHeight: 1.4
}));

const OptionalChipLabel = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
    height         : '20px',
    padding        : '0px 6px',
    borderRadius   : '4px',
    fontSize       : '12px',
    fontWeight     : 500,
    letterSpacing  : '0.12px',
    color          : theme.palette.utility.text.blue_dark,
    backgroundColor: theme.palette.utility.foreground.blue_dark.secondary
}));

const OnBoardingAccordionDetailsComponents = {
    Container,
    RowsContainer,
    RowContainer,
    RowWrapper,
    RowLabel,
    OptionalChipLabel
};

export default OnBoardingAccordionDetailsComponents;
