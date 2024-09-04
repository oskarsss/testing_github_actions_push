import { styled } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiFormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MuiMenu from '@mui/material/Menu';

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
    width: '100%',

    '.MuiFormLabel-root.Mui-focused': {
        color: theme.palette.semantic.text.secondary
    },

    '.MuiInputBase-root': {
        height       : '40px',
        cursor       : 'pointer',
        paddingLeft  : 0,
        fontSize     : '14px',
        letterSpacing: '0.17px',
        outline      : 'none',
        lineHeight   : 1.4,

        '&.Mui-focused': {
            fieldset: {
                borderColor: `${theme.palette.semantic.border.secondary} !important`,
                borderWidth: '1px !important',
                outline    : 'none !important'
            }
        },

        '&.MuiSelect-filled': {
            backgroundColor: 'transparent !important'
        },

        fieldset: {
            span: {
                fontSize: '12px'
            }
        },

        '&::after': {
            transform: 'scaleX(0) !important'
        }
    },

    div: {
        cursor: 'pointer !important'
    },

    '.MuiSvgIcon-root': {
        color: theme.palette.colors.gray[600]
    }
}));

export const Chip = styled(MuiChip)(({ theme }) => ({
    fontSize   : '11px',
    fontWeight : 500,
    color      : theme.palette.semantic.text.secondary,
    height     : '20px',
    marginRight: 4,

    '.MuiChip-label': {
        padding   : '1px 6px',
        lineHeight: '12px'
    }
}));

export const Label = styled('div')(({ theme }) => ({
    fontSize     : '14px',
    lineHeight   : 1.66,
    letterSpacing: '0.4px',
    fontWeight   : 400,
    display      : 'flex',
    alignItems   : 'center',
    gap          : 4,
    color        : theme.palette.semantic.text.primary
}));

export const Count = styled('span')(({ theme }) => ({
    fontSize     : '14px',
    lineHeight   : 1.66,
    letterSpacing: '0.4px',
    fontWeight   : 400,
    color        : theme.palette.semantic.text.secondary
}));

export const ListItemButton = styled(MuiListItemButton)({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 12,
    padding       : '1px 16px',
    minHeight     : '44px'
});

export const MenuItemWrap = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    gap           : '8px'
});

export const MenuIconWrap = styled('div')({
    display: 'flex',

    svg: {
        marginRight: 6
    }
});
export const SearchField = styled(TextField)({
    height: '36px',

    '.MuiInputBase-root': {
        paddingLeft : 8,
        borderRadius: '4px'
    },

    '.MuiInputBase-input': {
        padding      : '6px 8px',
        fontSize     : '14px',
        lineHeight   : 1.4,
        letterSpacing: '0.17px'
    },
    '.MuiInputBase-root::before': {
        borderColor: 'transparent !important',
        borderWidth: '1px !important'
    },
    '.MuiInputBase-root::after': {
        borderWidth: '1px !important'
    }
});
export const MenuHeader = styled('div')(({ theme }) => ({
    padding     : '16px 0px 8px 0px',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));
export const SearchWrap = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 12,
    padding   : '0px 8px 8px 16px'
});
export const ListMenu = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    padding        : '8px 0px',
    overflow       : 'auto',
    maxHeight      : '300px'
}));
export const Menu = styled(MuiMenu)(({ theme }) => ({
    '.MuiList-root': {
        padding: 0
    },

    '.MuiPaper-root': {
        border    : `1px solid ${theme.palette.semantic.border.secondary}`,
        overflow  : 'visible',
        transition: 'none !important',

        '&:before': {
            content        : '""',
            display        : 'block',
            position       : 'absolute',
            top            : -2,
            right          : 8,
            left           : 16,
            width          : 10,
            height         : 10,
            backgroundColor: 'inherit',
            transform      : 'translateY(-50%) rotate(45deg)',
            boxShadow      : '-3px -3px 5px -2px rgba(0,0,0,0.1)',
            borderLeft     : `1px solid ${theme.palette.semantic.border.secondary}`,
            borderTop      : `1px solid ${theme.palette.semantic.border.secondary}`
        }
    }
}));

export const ContainerValue = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 4,
    overflow  : 'hidden'
});

export const FiltersContainer = styled('div')({
    display            : 'grid',
    alignItems         : 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20px, max-content))',
    gridAutoFlow       : 'column',
    gap                : 20
});
