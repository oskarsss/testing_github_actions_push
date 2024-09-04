/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/no-unused-prop-types */
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    styled,
    SxProps,
    Theme
} from '@mui/material';
import { applyTestId } from '@/configs/tests';
import type { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { AppPalette } from '@/@core/theme/palette';

const List = styled(MenuList)(() => ({
    padding: 0
}));

const ListIconWrapper = styled(ListItemIcon)<{ color?: keyof AppPalette['utility']['foreground'] }>(
    ({
        theme,
        color
    }) => ({
        minWidth   : 'auto !important',
        marginRight: '4px',
        svg        : {
            fontSize: '16px',
            width   : '16px',
            height  : '16px',
            color   : color
                ? theme.palette.utility.foreground[color]?.primary
                : theme.palette.semantic.foreground.primary,
            fill: color
                ? theme.palette.utility.foreground[color]?.primary
                : theme.palette.semantic.foreground.primary
        }
    })
);

const ListTextWrapper = styled(ListItemText)<{
    color?: keyof Omit<AppPalette['semantic']['text'], 'brand'>;
}>(({
    theme,
    color = 'secondary'
}) => ({
    span: {
        color     : theme.palette.semantic.text[color],
        fontSize  : '12px',
        fontWeight: 500,
        lineHeight: 1.5
    }
}));

type ItemProps = {
    onClick?: (e?: MouseEvent) => void;
    Icon: React.ReactNode;
    text: IntlMessageKey;
    translateOptions?: IntlOptions;
    disabled?: boolean;
    test_id?: string;
    sxMenuItem?: SxProps<Theme>;
};

function Item({
    onClick,
    Icon,
    text,
    translateOptions,
    disabled = false,
    sxMenuItem
}: ItemProps) {
    const { t } = useAppTranslation();
    return (
        <MenuItem
            disabled={disabled}
            onClick={onClick}
            sx={sxMenuItem}
        >
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText>{t(text, translateOptions)}</ListItemText>
        </MenuItem>
    );
}

function OptionItem({
    onClick,
    Icon,
    text,
    translateOptions,
    disabled = false,
    test_id,
    color
}: ItemProps & { color?: 'success' | 'error' }) {
    const { t } = useAppTranslation();
    return (
        <MenuItem
            onClick={onClick}
            disabled={disabled}
            {...applyTestId(test_id)}
            sx={{
                padding        : '6px 8px',
                backgroundColor: (theme) => theme.palette.semantic.foreground.white.primary,
                '&:hover'      : {
                    backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
                },
                ...(color
                    ? {
                        backgroundColor: (theme) =>
                            theme.palette.utility.foreground[color].tertiary,
                        '&:hover': {
                            backgroundColor: (theme) =>
                                theme.palette.utility.foreground[color].secondary
                        }
                    }
                    : {})
            }}
        >
            <ListIconWrapper color={color}>{Icon}</ListIconWrapper>
            <ListTextWrapper color={color}>{t(text, translateOptions)}</ListTextWrapper>
        </MenuItem>
    );
}

function DangerItem({
    onClick,
    Icon,
    text,
    translateOptions,
    disabled = false,
    test_id
}: ItemProps) {
    const { t } = useAppTranslation();
    return (
        <MenuItem
            onClick={onClick}
            disabled={disabled}
            {...applyTestId(test_id)}
            sx={{
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#782b2b' : '#ffe5e5')
            }}
        >
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText
                sx={{
                    color     : '#b74949',
                    fontWeight: 500
                }}
            >
                {t(text, translateOptions)}
            </ListItemText>
        </MenuItem>
    );
}

export default {
    /**
     * ### Vektor Menus Components
     * List component. Its a wrapper for MenuList component.
     * Its styled component. Has all props from MenuList component from MUI.
     */
    List,

    /**
     * ### Vektor Menus Components
     * Item component. Use it in List component.
     * #### Props:
     * - `onClick` is required
     * - `Icon` is required
     * - `text` is required
     * - `disabled` is false by default
     */
    Item,

    /**
     * ### Vektor Menus Components
     * DangerItem component. Its a wrapper for MenuItem component.
     * #### Props:
     * - `onClick` is required
     * - `Icon` is required
     * - `text` is required
     * - `disabled` is false by default
     * - `test_id` is optional for testing
     */
    DangerItem,

    /**
     * ### Vektor Menus Components
     * OptionItem component. Its a wrapper for MenuItem component.
     * #### Props:
     * - `onClick` is required
     * - `Icon` is required
     * - `text` is required
     * - `disabled` is false by default
     * - `test_id` is optional for testing
     * - `color` is optional 'success' | 'error'
     */
    OptionItem
};
