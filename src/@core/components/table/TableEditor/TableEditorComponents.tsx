import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { CSSProperties } from 'react';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

type StyledFormControlLabelProps = {
    height: CSSProperties['height'];
    disabled?: boolean;
};

type PinnedPaperProps = {
    is_unpinned: boolean;
};

const SubSection = styled('div')(({ theme }) => ({
    marginTop      : '15px',
    marginBottom   : '8px',
    width          : '120%',
    height         : '40px',
    padding        : '5px 10px 5px 30px',
    backgroundColor: theme.palette.semantic.background.secondary,
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
    justifyContent : 'space-between',
    color          : theme.palette.semantic.text.primary
}));

const Title = styled(Typography)(() => ({
    fontSize  : '24px',
    fontWeight: 600,
    variant   : 'h5'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize  : '16px',
    fontWeight: 400,
    variant   : 'caption',
    color     : theme.palette.semantic.text.secondary
}));

export const Text = styled(Typography)(() => ({
    fontSize  : '16px',
    fontWeight: 500,
    variant   : 'h6',
    marginTop : '4px !important'
}));

const ViewAccordion = styled(Accordion)(({ theme }) => ({
    height      : 'fit-content !important',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius: '4px',
    elevation   : '0 !important',
    boxShadow   : 'none !important',
    '&::before' : {
        display: 'none !important'
    }
}));

const ViewAccordionSkeleton = styled(Box)(({ theme }) => ({
    height      : 'fit-content !important',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius: '4px',
    elevation   : '0 !important',
    boxShadow   : 'none !important',
    '&::before' : {
        display: 'none !important'
    }
}));

const PinnedPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'is_unpinned'
})<PinnedPaperProps>((props) => ({
    height         : 'fit-content !important',
    maxHeight      : 'none !important',
    border         : `1px solid ${props.theme.palette.semantic.border.secondary}`,
    borderRadius   : '8px',
    backgroundColor: props.is_unpinned ? 'none' : props.theme.palette.semantic.background.primary,
    elevation      : '0 !important',
    padding        : '16px'
}));

const DraggableArea = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'is_unpinned'
})<PinnedPaperProps>((props) => ({
    border         : `1px solid ${props.theme.palette.semantic.border.secondary}`,
    borderRadius   : '8px',
    backgroundColor: props.is_unpinned ? 'none' : props.theme.palette.semantic.background.primary,
    padding        : '16px',
    minHeight      : '60px',
    position       : 'relative',
    flexShrink     : 0,
    overflow       : 'hidden',
    height         : 'fit-content'
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 0
}));

const AccordionDetailsStack = styled(Stack)(() => ({
    display       : 'flex',
    flexDirection : 'row',
    flexWrap      : 'wrap',
    justifyContent: 'space-evenly'
}));

const FormControlLabel = styled(MuiFormControlLabel)<StyledFormControlLabelProps>(
    ({
        theme,
        checked,
        height,
        disabled = false
    }) => ({
        backgroundColor: checked ? theme.palette.semantic.background.secondary : '',
        flex           : '1 0 auto',
        display        : 'flex',
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
        padding        : '4px 0px',
        borderRadius   : '4px',
        margin         : '5px',
        height         : height || '32px',
        border         : checked ? '' : `1px solid ${theme.palette.semantic.border.secondary}`,

        ...(disabled
            ? {
                backgroundColor: theme.palette.semantic.background.secondary,
                svg            : {
                    opacity: 0.5
                }
            }
            : {})
    })
);

const ItemStack = styled(Stack)(({ theme }) => ({
    paddingX    : 2,
    minHeight   : '34px',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius: '4px'
}));

const GroupItemStack = styled(Stack)(() => ({
    paddingX      : 2,
    spacing       : 2,
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between'
}));

const AccordionSummary = styled(MuiAccordionSummary)(() => ({
    '.Mui-expanded': { margin: '0.625rem 0 !important' }
}));

const Container = styled(Stack)(() => ({
    overflow     : 'hidden',
    padding      : '24px',
    flexDirection: 'column'
}));

const WrapperContent = styled(Stack)(() => ({
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'row',
    gap          : '1.25rem'
}));

const WrapperColumns = styled(Stack)(({ theme }) => ({
    flex    : '2 1 0',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
        width: '0.4em !important'
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.mode === 'light' ? '#c8c6c6' : '#535252'} !important`,
        borderRadius   : '10px !important'
    },
    '&::-webkit-scrollbar-track-piece:vertical': {
        backgroundColor: `${theme.palette.semantic.background.white} !important`
    }
}));

const WrapperTableView = styled(Stack)(() => ({
    flex: '1 1 0'
}));

const EmptyColumns = styled('div')({
    position: 'absolute',
    left    : '16px',
    top     : '16px'
});

const TableEditorComponents = {
    Container,
    SubSection,
    PinnedPaper,
    FormControlLabel,
    ItemStack,
    GroupItemStack,
    DraggableArea,
    EmptyColumns,
    Wrapper: {
        Content  : WrapperContent,
        Columns  : WrapperColumns,
        TableView: WrapperTableView
    },
    Header: {
        Title,
        SubTitle
    },
    Accordion: {
        ViewAccordion,
        Skeleton    : ViewAccordionSkeleton,
        Details     : AccordionDetails,
        DetailsStack: AccordionDetailsStack,
        Summary     : AccordionSummary
    }
};

export default TableEditorComponents;
