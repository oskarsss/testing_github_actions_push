import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Typography, ListItem } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import MuiIconButton from '@mui/material/IconButton';
import MuiBox from '@mui/material/Box';

const Container = styled('div')(({ theme }) => ({
    width     : '26%',
    height    : '100vh',
    background: theme.palette.semantic.foreground.white.tertiary,
    boxShadow : '0px 2px 10px 0px rgba(58, 53, 65, 0.1)'
}));

const Box = styled(MuiBox)({
    height       : '100%',
    overflow     : 'auto',
    paddingTop   : 14,
    paddingBottom: 26
});

const IconBlock = styled('div')(({ theme }) => ({
    minHeight     : '70px',
    marginBottom  : 10,
    '.MuiBox-root': {
        display              : 'flex',
        alignItems           : 'center',
        justifyContent       : 'space-between',
        padding              : '12px 24px',
        borderBottom         : `1px solid ${theme.palette.semantic.border.secondary}`,
        gap                  : 5,
        '.MuiTypography-root': {
            fontSize  : 20,
            fontWeight: 600
        },
        '.MuiButtonBase-root': {
            padding: '0 12px'
        },
        '.MuiTypography-subtitle1': {
            flex      : 1,
            fontWeight: 600
        }
    },
    '.MuiTextField-root': {
        marginTop   : 10,
        marginBottom: 10,
        borderRadius: 4,
        width       : '100%'
    }
}));

const VendorWrap = styled('div')(({ theme }) => ({
    padding       : '12px 24px',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`,
    cursor        : 'pointer',
    ':hover'      : {
        background: theme.palette.semantic.background.secondary
    }
}));

const IconBlockHeader = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center',
    minWidth  : 150,
    gap       : 5
}));

const CardInfo = styled('div')(({ theme }) => ({
    padding       : '12px 24px',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`,
    gap           : 12
}));

const Card = styled('div')({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    background    : 'none',
    svg           : {
        cursor: 'pointer'
    }
});

const AccountNumber = styled('div')(() => ({
    display: 'flex',
    width  : '60%'
}));

const Buttons = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 8
});

const EmptyElement = styled(Typography)(({ theme }) => ({
    textAlign   : 'center',
    padding     : '12px 24px',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

const GPSTrackingMapWrap = styled('div')(({ theme }) => ({
    padding     : '12px 24px',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

const InfoBlock = styled('div')(({ theme }) => ({
    width                 : '100%',
    height                : 36,
    marginTop             : 10,
    marginBottom          : 10,
    display               : 'flex',
    alignItems            : 'center',
    borderRadius          : 5,
    border                : `1px solid ${theme.palette.semantic.border.secondary}`,
    justifyContent        : 'center',
    '.MuiTypography-body1': {
        fontSize  : 14,
        marginLeft: 15
    },
    '.notification': {
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center'
    }
}));

const MobileInfoBlock = styled('div')(({ theme }) => ({
    width         : '100%',
    height        : 64,
    marginTop     : 10,
    marginBottom  : 10,
    display       : 'flex',
    alignItems    : 'center',
    borderRadius  : 8,
    border        : `1px solid ${theme.palette.semantic.border.secondary}`,
    justifyContent: 'space-evenly'
}));

const MobileInfo = styled('div')(() => ({
    overflowWrap         : 'break-word',
    width                : 110,
    '.MuiTypography-root': {
        fontSize: 12
    },
    '.MuiTypography-body2': {
        fontWeight: 700
    }
}));

const InviteBlock = styled('div')(({ theme }) => ({
    width         : '100%',
    marginTop     : 10,
    marginBottom  : 10,
    display       : 'flex',
    alignItems    : 'center',
    borderRadius  : 5,
    justifyContent: 'space-between',
    svg           : {
        fill: theme.palette.semantic.foreground.brand.primary
    },
    '.MuiTypography-body2': {
        width         : '50%',
        height        : 48,
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        fontWeight    : 500,
        borderRadius  : 5,
        border        : `1px solid ${theme.palette.semantic.border.secondary}`
    }
}));

const DateUpdated = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    color         : theme.palette.semantic.text.secondary,
    fontWeight    : 500,
    background    : theme.palette.semantic.text.secondary,
    width         : '45%',
    minHeight     : 24,
    borderRadius  : 16,
    cursor        : 'pointer',
    fontSize      : 12
}));

const PartnerOnline = styled('div')(({ theme }) => ({
    display     : 'flex',
    alignItems  : 'center',
    width       : 'fit-content',
    minWidth    : 145,
    padding     : '4px 12px',
    color       : theme.palette.semantic.text.secondary,
    fontWeight  : 500,
    background  : theme.palette.semantic.background.secondary,
    minHeight   : 24,
    borderRadius: 4,
    fontSize    : 12,
    gap         : 4
}));

const Marker = styled('span')<{ current?: boolean }>(({
    theme,
    current = false
}) => ({
    height         : 4,
    width          : 4,
    borderRadius   : '50%',
    display        : 'inline-block',
    marginRight    : 4,
    backgroundColor: current
        ? theme.palette.utility.foreground.success.primary
        : theme.palette.utility.foreground.error.primary
}));

const Info = styled('div')(({ theme }) => ({
    width                : '100%',
    height               : 72,
    padding              : '12px 24px',
    display              : 'flex',
    alignItems           : 'center',
    justifyContent       : 'space-between',
    gap                  : 10,
    cursor               : 'pointer',
    borderBottom         : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiButtonBase-root': {
        height   : 48,
        width    : 48,
        marginTop: 0,
        svg      : {
            path: {
                fill: theme.palette.semantic.text.secondary
            }
        }
    },
    '&:hover': {
        background: theme.palette.semantic.background.secondary
    }
}));

const IconButton = styled(MuiIconButton)<{ isUnassign?: boolean }>(
    ({
        theme,
        isUnassign = false
    }) => ({
        marginTop: 0,
        svg      : {
            path: {
                fill: theme.palette.semantic.text.secondary
            }
        },
        ...(isUnassign && {
            '&:hover': {
                svg: {
                    path: {
                        fill: '#F04438'
                    }
                }
            }
        })
    })
);

const InfoIcon = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 12
});

const BankInfo = styled('div')(({ theme }) => ({
    width                   : '100%',
    display                 : 'flex',
    flexDirection           : 'column',
    marginBottom            : 10,
    borderRadius            : 5,
    '.MuiTypography-caption': {
        borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
    }
}));

const Item = styled('div')(({ theme }) => ({
    padding               : '12px 24px',
    width                 : '100%',
    display               : 'flex',
    justifyContent        : 'space-between',
    gap                   : 8,
    borderBottom          : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiTypography-body1': {
        textAlign: 'end'
    },
    '.MuiTypography-body2': {
        fontWeight: 700
    }
}));

const TruckInfo = styled('div')({
    display                 : 'flex',
    alignItems              : 'center',
    '.MuiTypography-caption': {
        span: {
            fontWeight: 700
        }
    }
});

const Icon = styled(MuiIconButton)<{ isUnassign?: boolean }>(({
    theme,
    isUnassign = false
}) => ({
    height    : 48,
    width     : 48,
    background: theme.palette.semantic.background.secondary,
    marginTop : 0,
    svg       : {
        path: {
            fill: theme.palette.semantic.text.secondary
        }
    },
    '&:hover': {
        background: theme.palette.semantic.background.secondary,
        ...(isUnassign && {
            svg: {
                path: {
                    fill: '#F04438 !important'
                }
            }
        })
    }
}));

const UserWrapper = styled('div')<{ is_hover_exist?: boolean }>(
    ({
        theme,
        is_hover_exist = true
    }) => ({
        padding              : '12px 24px',
        borderBottom         : `1px solid ${theme.palette.semantic.border.secondary}`,
        '.MuiButtonBase-root': {
            marginTop: 0
        },
        ...(is_hover_exist && {
            cursor  : 'pointer',
            ':hover': {
                background: theme.palette.semantic.background.secondary
            }
        })
    })
);

const UserBlock = styled('div')(({ theme }) => ({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 5,
    borderRadius  : 8,
    div           : {
        '.MuiTypography-h6': {
            fontSize  : 16,
            fontWeight: 600,
            lineHeight: '24px'
        },
        '.MuiTypography-body1': {
            fontSize  : 12,
            fontWeight: 400,
            lineHeight: '24px'
        },
        '.MuiTypography-body2': {
            fontSize  : 12,
            fontWeight: 500,
            color     : theme.palette.semantic.text.disabled,
            span      : {
                display  : 'inline-block',
                marginTop: 4
            }
        }
    }
}));

const UserInfo = styled('div')(() => ({
    flex         : 1,
    display      : 'flex',
    flexDirection: 'column',
    gap          : 5
}));

const WrapperInfo = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between'
});

const UserInfoContent = styled('div')({
    display      : 'flex',
    flexDirection: 'column'
});

const UserPhone = styled('div')(() => ({
    display           : 'flex',
    alignItems        : 'center',
    justifyContent    : 'flex-start',
    flexGrow          : 1,
    '.MuiSvgIcon-root': {
        width : 12,
        height: 12
    }
}));

const UserAction = styled('div')(() => ({
    width: '40%'
}));

const Icons = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 8
});

const PartnerIcons = styled('div')(({ theme }) => ({
    svg: {
        fill: theme.palette.semantic.foreground.brand.primary
    }
}));

const AvatarStyled = styled(Avatar)(() => ({
    width : 48,
    height: 48,
    svg   : {
        height: 24,
        width : 24
    }
}));

const DeviceBlock = styled(Accordion)(({ theme }) => ({
    boxShadow   : 'none',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`,
    background  : 'transparent',
    '&:before'  : {
        background: 'none'
    },
    '&:last-of-type': {
        borderRadius: 0
    },
    '&.Mui-expanded': {
        margin: '10px 0'
    }
}));

const Device = styled(AccordionSummary)({
    display                       : 'flex',
    alignItems                    : 'center',
    justifyContent                : 'space-between',
    padding                       : '12px 24px',
    '.MuiAccordionSummary-content': {
        margin          : 0,
        justifyContent  : 'space-between',
        alignItems      : 'center',
        gap             : 8,
        '&.Mui-expanded': {
            margin: 0
        }
    }
});

const DeviceDetailsListItem = styled(ListItem)(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    padding       : '12px 24px',
    borderTop     : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const GPSTrackingWrapper = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems    : 'start',
    gap           : 10,
    padding       : '12px 24px',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const GPSTrackingMap = styled('div')(({ theme }) => ({
    width       : '100%',
    position    : 'relative',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

const Loader = styled('div')({
    height    : '100%',
    width     : 'fit-content',
    display   : 'flex',
    alignItems: 'center',
    margin    : '0 auto',
    padding   : '12px 0'
});

const NavigationButton = styled(MuiIconButton)(({ theme }) => ({
    position  : 'absolute',
    left      : 8,
    top       : 8,
    zIndex    : 1,
    background: theme.palette.semantic.background.primary,
    '&:hover' : {
        background: theme.palette.semantic.text.secondary,
        opacity   : 1
    }
}));

const RightStyled = {
    Container,
    Box,
    UserInfoContent,
    IconBlock,
    IconBlockHeader,
    CardInfo,
    Card,
    AccountNumber,
    Buttons,
    InfoBlock,
    WrapperInfo,
    MobileInfoBlock,
    MobileInfo,
    InviteBlock,
    DateUpdated,
    PartnerOnline,
    Info,
    InfoIcon,
    BankInfo,
    TruckInfo,
    Icon,
    UserWrapper,
    UserBlock,
    UserInfo,
    UserPhone,
    UserAction,
    Icons,
    PartnerIcons,
    AvatarStyled,
    Marker,
    EmptyElement,
    VendorWrap,
    DeviceBlock,
    Device,
    DeviceDetailsListItem,
    GPSTrackingWrapper,
    GPSTrackingMap,
    IconButton,
    Item,
    Loader,
    NavigationButton,
    GPSTrackingMapWrap
};

export default RightStyled;
