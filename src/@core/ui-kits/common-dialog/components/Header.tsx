/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-anonymous-default-export */
import { Stack, Typography, styled, SxProps, Theme } from '@mui/material';
import React, { ComponentProps, CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

const HeaderWrapper = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    marginBottom  : '20px',
    gap           : 5
}));

type HeaderProps = PropsWithChildren<{
    title: IntlMessageKey | ReactElement | string;
    translationOptions?: IntlOptions;
    textVariant?: 'h5' | 'h6';
    Icon?: React.ReactNode;
    justifyContent?: CSSProperties['justifyContent'];
    sx?: SxProps<Theme>;
}>;

function Header({
    Icon = null,
    translationOptions,
    title,
    textVariant = 'h5',
    justifyContent,
    children,
    sx = {}
}: HeaderProps) {
    const { t } = useAppTranslation();
    if (typeof title === 'string') {
        return (
            <HeaderWrapper sx={{ justifyContent, ...sx }}>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    {Icon}
                    <Typography variant={textVariant}>{t(title, translationOptions)}</Typography>
                </Stack>
                {children}
            </HeaderWrapper>
        );
    }
    return (
        <HeaderWrapper>
            {title}
            {children}
        </HeaderWrapper>
    );
}

type SubHeaderProps = {
    text: string | IntlMessageKey | ReactElement;
    translationOptions?: IntlOptions;
    textVariant?: ComponentProps<typeof Typography>['variant'];
    marginBottom?: CSSProperties['marginBottom'];
};

function SubHeader({
    text,
    translationOptions,
    textVariant = 'body2',
    marginBottom = '20px'
}: SubHeaderProps) {
    const { t } = useAppTranslation();
    if (typeof text === 'string') {
        return (
            <Typography
                sx={{ marginBottom }}
                variant={textVariant}
            >
                {t(text, translationOptions)}
            </Typography>
        );
    }
    return <>{text}</>;
}

export default {
    /**
     * ### Vektor Dialogs Components
     * Header component.
     * #### Props:
     * - `textVariant`(optional) - is h5 by default
     * - `Icon`(optional) - is null by default
     * - `title` - is required
     * #### Description:
     * You can set actions or other components as children of this component
     * if you want to display buttons on the right side of the header
     */
    Header,

    /**
     * ### Vektor Dialogs Components
     * SubHeader component.
     * #### Props:
     * - `textVariant`(optional) - is 'body2' by default
     * - `marginBottom` - (optional) - is '20px' by default
     * - `text` - is required
     */
    SubHeader
};
