import { createSvgIcon, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Stack from '@mui/material/Stack';

const WarningIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.82865 1.61308C8.30223 1.37344 7.69784 1.37344 7.17142 1.61308C6.79756 1.78326 6.53519 2.09575 6.31438 2.42247C6.09447 2.74788 5.85371 3.18565 5.56249 3.71516L1.80576 10.5456C1.53281 11.0418 1.30588 11.4544 1.15686 11.796C1.00602 12.1417 0.888929 12.5123 0.935933 12.9046C1.00268 13.4616 1.30032 13.965 1.75626 14.292C2.07734 14.5222 2.45847 14.5982 2.83408 14.6326C3.20519 14.6667 3.67605 14.6666 4.24239 14.6666H11.7577C12.324 14.6666 12.7949 14.6667 13.166 14.6326C13.5416 14.5982 13.9227 14.5222 14.2438 14.292C14.6997 13.965 14.9974 13.4616 15.0641 12.9046C15.1111 12.5123 14.994 12.1417 14.8432 11.796C14.6942 11.4544 14.4673 11.0419 14.1943 10.5457L10.4376 3.71515C10.1464 3.18564 9.90559 2.74788 9.68568 2.42247C9.46488 2.09575 9.20251 1.78326 8.82865 1.61308ZM8.66671 6.66663C8.66671 6.29844 8.36823 5.99996 8.00004 5.99996C7.63185 5.99996 7.33337 6.29844 7.33337 6.66663V9.33329C7.33337 9.70148 7.63185 9.99996 8.00004 9.99996C8.36823 9.99996 8.66671 9.70148 8.66671 9.33329V6.66663ZM8.00004 10.6666C7.63185 10.6666 7.33337 10.9651 7.33337 11.3333C7.33337 11.7015 7.63185 12 8.00004 12H8.00671C8.3749 12 8.67337 11.7015 8.67337 11.3333C8.67337 10.9651 8.3749 10.6666 8.00671 10.6666H8.00004Z"
            fill="currentColor"
        />
    </svg>,
    'WarningIcon'
);

type Props = {
    text: string;
    icon?: React.ReactNode;
    color?: 'warning' | 'error' | 'success';
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
};

export default function WarningAlert({
    text,
    icon,
    color = 'warning',
    sx,
    children
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            gap="4px"
            borderRadius="2px"
            padding="2px 12px"
            fontSize="12px"
            fontWeight={500}
            lineHeight={1.5}
            color={(theme) => theme.palette.semantic.text[color]}
            border={(theme) => `1px solid ${theme.palette.utility.foreground[color].secondary}`}
            sx={{
                backgroundColor: (theme) => theme.palette.utility.foreground[color].tertiary,
                svg            : {
                    color: (theme) => theme.palette.utility.foreground[color].primary,
                    fill : (theme) => theme.palette.utility.foreground[color].primary
                },
                ...(sx || {})
            }}
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="inherit"
            >
                {icon || <WarningIcon fontSize="small" />}
                <Typography
                    component="span"
                    fontSize="inherit"
                    fontWeight="inherit"
                    lineHeight="inherit"
                    color="inherit"
                >
                    {t(text)}
                </Typography>
            </Stack>

            {children}
        </Stack>
    );
}
