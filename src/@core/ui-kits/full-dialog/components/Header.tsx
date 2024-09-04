/* eslint-disable import/no-anonymous-default-export */
import { Avatar, Stack, styled, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Header = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    justifyContent : 'space-between',
    alignItems     : 'center',
    padding        : '10px 15px',
    borderBottom   : `1px solid ${theme.palette.semantic.border.secondary}`,
    position       : 'sticky',
    gap            : 10,
    zIndex         : 2000,
    top            : 0,
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

const Title = styled(Typography)(() => ({
    mb          : 0.25,
    fontWeight  : 600,
    fontSize    : '1.275rem',
    alignItems  : 'center',
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace  : 'nowrap'
}));

export const TableHeaderTitle = styled(Typography)({
    fontSize  : '20px',
    fontWeight: 600,
    variant   : 'subtitle1',
    marginLeft: '15px'
});

const ClickableTitle = styled(Title)(() => ({
    cursor    : 'pointer',
    display   : 'flex',
    alignItems: 'center'
}));

type HeaderTitleProps = {
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    children?: React.ReactNode;
};

function HeaderTitle({
    title,
    translationOptions,
    children
}: HeaderTitleProps) {
    const { t } = useAppTranslation();
    return (
        <Title>
            {t(title, translationOptions)}
            {children}
        </Title>
    );
}

type ClickableHeaderTitleProps = {
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    children?: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

function HeaderClickableTitle({
    title,
    translationOptions,
    children,
    onClick
}: ClickableHeaderTitleProps) {
    const { t } = useAppTranslation();
    return (
        <ClickableTitle onClick={onClick}>
            {t(title, translationOptions)}
            {children}
        </ClickableTitle>
    );
}

type HeaderAvatarTitleProps = PropsWithChildren<{
    url: string;
    alt: string;
    avatarInitials?: string;
}>;

function HeaderAvatarTitle({
    children,
    alt,
    url,
    avatarInitials
}: HeaderAvatarTitleProps) {
    const { url: src } = usePrivateFileUrl(url);

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
        >
            <Avatar
                alt={alt}
                src={src}
            >
                {avatarInitials}
            </Avatar>
            <Title>{children}</Title>
        </Stack>
    );
}

type TableHeaderProps = PropsWithChildren<{
    icon: React.ReactNode;
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    noWrap?: boolean;
}>;

export function TableHeader({
    icon,
    title,
    translationOptions,
    noWrap = false
}: TableHeaderProps) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
        >
            {icon}
            <TableHeaderTitle noWrap={noWrap}>{t(title, translationOptions)}</TableHeaderTitle>
        </Stack>
    );
}

export default {
    Header,
    HeaderTitle,
    HeaderClickableTitle,
    HeaderAvatarTitle,
    TableHeader,
    Title
};
