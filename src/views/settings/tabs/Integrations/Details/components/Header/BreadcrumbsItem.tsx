import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ReactElement } from 'react';

function Text({
    children,
    active
}: { children: React.ReactNode; active?: boolean }) {
    return (
        <Typography
            fontSize="14px"
            fontWeight={500}
            color={(theme) =>
                active
                    ? theme.palette.semantic.foreground.brand.primary
                    : theme.palette.semantic.text.secondary}
            sx={
                !active
                    ? {
                        transition: 'color 0.3s ease',
                        '&:hover' : {
                            color: (theme) => theme.palette.semantic.foreground.brand.primary
                        }
                    }
                    : {}
            }
        >
            {children}
        </Typography>
    );
}

export type Props = {
    icon?: React.ReactNode;
    title: IntlMessageKey | ReactElement;
    link?: string;
    active?: boolean;
};

export function BreadcrumbsItem({
    icon,
    title,
    link,
    active
}: Props) {
    const { t } = useAppTranslation();

    if (!link) {
        return <Text active={active}>{title}</Text>;
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="8px"
            sx={{
                svg: {
                    fill  : (theme) => theme.palette.semantic.foreground.primary,
                    width : '24px',
                    height: '24px'
                }
            }}
        >
            {icon}
            <Link href={link}>
                <Text active={active}>{typeof title === 'string' ? t(title) : title}</Text>
            </Link>
        </Stack>
    );
}
