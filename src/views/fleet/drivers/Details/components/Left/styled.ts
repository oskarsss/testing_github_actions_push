import { styled, Theme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IChipColors } from '@/@core/theme/chip';
import MuiIconButton from '@mui/material/IconButton';

export type StatusProps = {
    theme?: Theme;
    color: IChipColors;
};

const Container = styled('div')(({ theme }) => ({
    width           : 420,
    '.MuiPaper-root': {
        height       : '100%',
        display      : 'flex',
        flexDirection: 'column',
        background   : theme.palette.semantic.foreground.white.tertiary
    }
}));

const CardContentHeader = styled(CardContent)(() => ({
    display      : 'flex',
    alignItems   : 'center',
    flexDirection: 'column',
    position     : 'relative',
    paddingTop   : 0,
    paddingBottom: 0,
    paddingRight : 24,
    paddingLeft  : 24
}));

const Header = styled('div')(({ theme }) => ({
    width         : '100%',
    paddingTop    : 36,
    marginBottom  : 15,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : 32,
    position      : 'relative',
    '&::before'   : {
        content     : '""',
        position    : 'absolute',
        top         : 0,
        right       : 0,
        width       : '100%',
        height      : 96,
        background  : theme.palette.semantic.foreground.secondary,
        borderRadius: '0 0 8px 8px'
    }
}));

const NewCardContent = styled('div')(({ theme }) => ({
    display               : 'flex',
    flexDirection         : 'column',
    overflow              : 'auto',
    borderTop             : `1px solid ${theme.palette.semantic.border.secondary}`,
    marginTop             : 20,
    '.scrollbar-container': {
        width        : '100%',
        paddingBottom: 36
    }
}));

const Navigate = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    width         : '80%',
    margin        : '0 auto',
    cursor        : 'pointer',
    div           : {
        width      : 18,
        marginRight: 11
    },
    p: {
        fontSize: 14,
        margin  : '0 0 3px 0'
    }
}));

const Status = styled('div')(({
    theme,
    color
}: StatusProps) => ({
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

    // background: theme?.palette.chip[color]?.background,
    // color     : theme?.palette.chip[color]?.icon.background,
    span: {
        height      : 6,
        width       : 6,
        borderRadius: '50%',
        display     : 'inline-block',

        // background  : theme?.palette.utility.foreground[color]?.icon.background,
        margin: '0 4px 0 0'
    }
}));

const ButtonEdit = styled(Button)(() => ({
    width                                              : '94%',
    height                                             : 48,
    fontSize                                           : 20,
    fontWeight                                         : 500,
    borderRadius                                       : 8,
    marginTop                                          : '15px',
    '.MuiDivider-root::before, .MuiDivider-root::after': {
        borderTop: 'none'
    }
}));

const Span = styled(Divider)(() => ({
    flex: 1
}));

const DividerStyled = styled(Divider)(() => ({
    margin: '20px auto 0',
    width : '100%'
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    paddingTop: 20,
    width     : '85%',
    margin    : '0 auto',
    color     : theme.palette.semantic.text.disabled
}));

const OnlineBadge = styled('span', { shouldForwardProp: (prop) => prop !== 'isOnline' })<{
    isOnline?: boolean;
}>(({ isOnline = false }) => ({
    height         : 10,
    width          : 10,
    borderRadius   : '50%',
    display        : 'inline-block',
    margin         : '0 4px 0 0',
    backgroundColor: isOnline ? '#279F45' : '#F44336'
}));

const PhoneNumberBlock = styled('div')(({ theme }) => ({
    padding           : '12px 24px',
    borderBottom      : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiSvgIcon-root': {
        width : 19,
        height: 19
    },
    '.MuiButton-contained': {
        height                : 40,
        '.MuiButton-startIcon': {
            margin: 0
        }
    }
}));

const CopyNumberBlock = styled(Typography)(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%',
    gap           : 10,
    '.MuiBox-root': {
        width     : '50%',
        display   : 'flex',
        alignItems: 'center',
        gap       : 10,
        svg       : {
            width: 16,
            fill : theme.palette.semantic.foreground.primary
        }
    },
    '.MuiTypography-body1': {
        width     : '50%',
        fontSize  : 16,
        color     : theme.palette.semantic.text.brand.primary,
        fontWeight: 400,
        textAlign : 'right'
    }
}));

const IconBlock = styled('div')(({ theme }) => ({
    width             : '100%',
    display           : 'flex',
    alignItems        : 'center',
    justifyContent    : 'space-between',
    padding           : '12px 24px',
    borderBottom      : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiSvgIcon-root': {
        width : 19,
        height: 19
    },
    '.MuiBox-root': {
        width     : 'fit-content',
        display   : 'flex',
        alignItems: 'center',
        gap       : 10,
        svg       : {
            width: 16,
            fill : theme.palette.semantic.foreground.primary
        }
    },
    '.MuiTypography-root': {
        width: 'fit-content'
    },
    '.MuiTypography-body1': {
        fontSize  : 16,
        textAlign : 'right',
        color     : '#285FF6',
        fontWeight: 700
    },
    '.MuiTypography-body2': {
        fontSize : 16,
        textAlign: 'right',
        color    : theme.palette.semantic.text.primary
    },
    '.MuiFormGroup-root': {
        '.MuiFormControlLabel-root': {
            '.MuiTypography-body1': {
                fontWeight: 400,
                color     : theme.palette.semantic.text.primary
            }
        }
    }
}));

const Buttons = styled('div')({
    marginTop     : 28,
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 8
});

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    height      : 48,
    width       : 48,
    borderRadius: '50%',
    background  : theme.palette.semantic.foreground.white.primary,
    boxShadow   : '0 20px 24px #10182814',
    '&:hover'   : {
        background: theme.palette.semantic.foreground.white.primary
    }
}));

const FuelDiscount = styled('div')({
    width     : 'fit-content',
    display   : 'flex',
    alignItems: 'center',
    gap       : 8,
    svg       : {
        width: 16
    }
});

const LeftStyled = {
    Container,
    CardContentHeader,
    NewCardContent,
    Header,
    Navigate,
    Status,
    ButtonEdit,
    Span,
    DividerStyled,
    Subtitle,
    OnlineBadge,
    PhoneNumberBlock,
    CopyNumberBlock,
    IconBlock,
    Buttons,
    IconButton,
    FuelDiscount
};

export default LeftStyled;
