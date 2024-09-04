import React, { ComponentProps, ReactElement } from 'react';
import { Stack, Typography, styled, Theme, SxProps, Tab } from '@mui/material';
import Notes from '@/@core/components/notes/Notes';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NotesIcon } from './icons';

type ContainerProps = {
    size?: ComponentProps<typeof Notes>['size'];
    variant?: ComponentProps<typeof Notes>['variant'];
};

const Container = styled('div')<ContainerProps>(({
    size,
    variant
}) => ({
    display      : 'flex',
    flexDirection: 'column',
    width        : '100%',
    height       : '100%',
    overflow     : 'hidden',

    '&:focus-visible': {
        outline: 'none'
    },

    ...(variant === 'menu' && {
        height: '390px',
        width : '500px'
    }),

    minHeight: size === 'small' ? 'min(390px, 100%)' : 'min(464px, 100%)'
}));

type SectionHeaderProps = {
    title?: IntlMessageKey | ReactElement;
    sxContainer?: SxProps<Theme>;
    sxTitle?: SxProps<Theme>;
    variant?: ComponentProps<typeof Notes>['variant'];
};

const SectionHeader = ({
    title = 'core:notes.title',
    sxContainer = {},
    sxTitle = {},
    variant = 'outlined'
}: SectionHeaderProps) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            sx={{
                display      : 'flex',
                flexDirection: 'row',
                alignItems   : 'center',
                marginBottom : 2,
                ...(variant === 'filled' && {
                    justifyContent : 'center',
                    marginBottom   : 0,
                    minHeight      : '40px',
                    borderBottom   : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
                    borderRadius   : '12px 12px 0 0',
                    padding        : '4px 16px',
                    backgroundColor: (theme) => theme.palette.semantic.background.white
                }),
                ...(variant === 'menu'
                    ? {
                        padding: '10px 0px 0px 10px',
                        margin : 0
                    }
                    : {}),
                ...sxContainer
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <NotesIcon />
                <Typography
                    sx={{
                        fontSize  : '18px',
                        fontWeight: 700,
                        lineHeight: '28px',
                        color     : (theme) => theme.palette.semantic.text.primary,
                        ...sxTitle
                    }}
                >
                    {typeof title === 'string' ? t(title) : title}
                </Typography>
            </Stack>
        </Stack>
    );
};

type SectionBodyProps = {
    text_field_bottom?: boolean;
    isDragActive?: boolean;
    variant?: ComponentProps<typeof Notes>['variant'];
};

const SectionBody = styled('div')<SectionBodyProps>(
    ({
        text_field_bottom,
        isDragActive,
        variant,
        theme
    }) => ({
        position     : 'relative',
        overflow     : 'hidden',
        height       : '100%',
        display      : 'flex',
        flexDirection: text_field_bottom ? 'column' : 'column-reverse',
        padding      : isDragActive ? '16px' : '0',
        flexGrow     : 1,

        '&:focus-visible': {
            outline: 'none'
        },

        ...(variant === 'outlined' && {
            border      : `1px solid ${theme.palette.semantic.border.secondary}`,
            borderRadius: '8px'
        })
    })
);

const NoteTab = styled(Tab, {
    shouldForwardProp(propName) {
        return propName !== 'isSelect';
    }
})<{
    isSelect?: boolean;
}>(({
    theme,
    isSelect
}) => ({
    fontWeight   : 600,
    textTransform: 'none',
    fontSize     : '14px',
    padding      : '0',
    svg          : {
        height     : '22px',
        width      : '22px',
        marginRight: '5px !important',
        fill       : !isSelect
            ? `${theme.palette.semantic.text.secondary} !important`
            : `${theme.palette.semantic.foreground.brand.primary} !important`
    }
}));

const NoteTabCount = ({
    count = 0,
    selected = false
}) => (
    <Stack
        borderRadius="50%"
        padding="2px 6px"
        lineHeight="1.6"
        fontSize="12px"
        minWidth="24px"
        alignItems="center"
        justifyContent="center"
        fontWeight={600}
        flexShrink={0}
        sx={{
            backgroundColor: (theme) =>
                selected
                    ? theme.palette.semantic.foreground.brand.secondary
                    : theme.palette.semantic.foreground.secondary,
            color: (theme) =>
                selected
                    ? theme.palette.semantic.foreground.brand.primary
                    : theme.palette.semantic.text.secondary
        }}
    >
        {count}
    </Stack>
);

const NotesComponents = {
    Container,
    SectionHeader,
    SectionBody,
    NoteTab,
    NoteTabCount
};

export default NotesComponents;
