import { memo, type ReactNode, type PropsWithChildren } from 'react';
import { Stack, Typography } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { InfoConfigItem } from './info-sections-config';

type Props = PropsWithChildren<{
    icon: ReactNode;
    title: IntlMessageKey;
    config: InfoConfigItem[];
}>;

function Section({
    icon,
    title,
    config,
    children
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack gap="12px">
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                {icon}

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t(title)}
                </Typography>

                {children}
            </Stack>

            <Stack
                padding="16px"
                gap="12px"
                bgcolor="semantic.foreground.white.tertiary"
                borderRadius="8px"
            >
                {config.map((item) => (
                    <Stack
                        key={item.key}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            lineHeight="22px"
                        >
                            {t(item.label)}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={500}
                            lineHeight="22px"
                            color="semantic.text.secondary"
                        >
                            {item.value}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}

export default memo(Section);
