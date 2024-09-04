import { styled } from '@mui/material/styles';
import MUIDividir from '@mui/material/Divider';
import MuiButton from '@mui/material/Button';
import { Typography } from '@mui/material';
import MUIFormControlLabel from '@mui/material/FormControlLabel';
import { StatusProps } from '@/views/fleet/drivers/Details/components/Left/styled';

const Content = styled('div')(({ theme }) => ({
    padding      : '16px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '10px',
    overflow     : 'hidden',
    borderTop    : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const AlarmContent = styled('div')(({ theme }) => ({
    height                : 410,
    textAlign             : 'center',
    display               : 'grid',
    alignContent          : 'center',
    gap                   : 10,
    borderTop             : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiTypography-body2': {
        width : '65%',
        margin: '0 auto'
    }
}));

const Notification = styled('div')({
    width         : '100%',
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center',
    gap           : 15,
    background    : '#FFF1E3',
    padding       : '8px 16px',
    borderRadius  : 8,
    color         : '#F78009'
});

const Divider = styled(MUIDividir)({
    position: 'absolute',
    left    : 0,
    width   : '100%',
    height  : '1px'
});

const Button = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== 'isDisabled'
})<{ isDisabled: boolean }>(({
    isDisabled,
    theme
}) => ({
    color                 : '#285FF6',
    '.MuiButton-startIcon': {
        marginRight: 5,
        svg        : {
            path: {
                fill: isDisabled ? theme.palette.semantic.text.disabled : '#285FF6'
            }
        }
    }
}));

const Table = styled('div')(({ theme }) => ({
    borderRadius: 8,
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    marginBottom: 5,
    overflow    : 'hidden'
}));

const TableHeader = styled('div')(({ theme }) => ({
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center',
    position      : 'sticky',
    background    : '#F9FAFC',
    height        : 48,
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const TableHeaderCell = styled(Typography)({
    display          : 'flex',
    alignItems       : 'center',
    paddingLeft      : 10,
    minWidth         : 135,
    '&:first-of-type': {
        width: 180
    }
});

const TableBody = styled('div')({
    height: 210
});

const TableBodyRow = styled('div')(({ theme }) => ({
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center',
    height        : 64,
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const TableBodyRowCell = styled(Typography)({
    paddingLeft      : 10,
    minWidth         : 135,
    maxWidth         : 450,
    '&:first-of-type': {
        width: 180
    }
});

const EmptyTable = styled(Typography)({
    height        : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    fontSize      : 20,
    fontWeight    : 500
});

const Status = styled('div')(({
    theme,
    color
}: StatusProps) => ({
    width         : 110,
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    fontWeight    : 600,

    paddingLeft : '10px',
    paddingRight: '10px',

    minHeight   : 22,
    borderRadius: 4,
    fontSize    : 12,

    background: theme?.palette.utility.foreground[color].secondary,
    color     : theme?.palette.utility.foreground[color].primary,

    span: {
        height      : 6,
        width       : 6,
        borderRadius: '50%',
        display     : 'inline-block',
        background  : theme?.palette.utility.foreground[color].primary,
        margin      : '0 4px 0 0'
    }
}));

const Form = styled('div')({
    display      : 'flex',
    gap          : 10,
    flexDirection: 'column'
});

const Field = styled('div')({
    padding: '0 16px',
    width  : '100%'
});

const SirenMessageWrapper = styled('div')({
    display      : 'flex',
    gap          : 10,
    flexDirection: 'column'
});

const SirenMessage = styled('div')({
    margin      : '0 16px',
    borderRadius: 8,
    padding     : '12px 16px',
    background  : '#F4F5FA'
});

const FormControlLabel = styled(MUIFormControlLabel)({
    margin                      : 0,
    padding                     : '0 20px',
    gap                         : '6px',
    '.MuiFormControlLabel-label': {
        fontSize: 14
    }
});

const SirenButton = styled('div')(({ theme }) => ({
    padding              : 16,
    display              : 'flex',
    justifyContent       : 'flex-end',
    borderTop            : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiButtonBase-root': {
        fontWeight: 600,
        width     : 180
    }
}));

const ErrorWrapper = styled('div')({
    height: 640,
    width : 640
});

const ErrorContent = styled('div')(({ theme }) => ({
    height      : 496,
    textAlign   : 'center',
    display     : 'grid',
    alignContent: 'center',
    gap         : 10,
    borderTop   : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`,
    svg         : {
        margin: '0 auto'
    },
    '.MuiTypography-body2': {
        width : '65%',
        margin: '0 auto'
    }
}));

const ErrorActions = styled('div')({
    display              : 'flex',
    alignItems           : 'center',
    justifyContent       : 'space-between',
    gap                  : 16,
    padding              : 16,
    '.MuiButtonBase-root': {
        width : '50%',
        height: 48
    }
});

const CriticalNotificationStyled = {
    Content,
    AlarmContent,
    Notification,
    Divider,
    Button,
    Table,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableBodyRow,
    TableBodyRowCell,
    EmptyTable,
    Status,
    Form,
    Field,
    SirenMessageWrapper,
    SirenMessage,
    FormControlLabel,
    SirenButton,
    ErrorWrapper,
    ErrorContent,
    ErrorActions
};

export default CriticalNotificationStyled;
