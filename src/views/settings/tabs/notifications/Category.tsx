import { memo, type ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    title: IntlMessageKey;
    icon: ReactNode;
};

function Category({
    title,
    icon
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            flex={1}
            position="relative"
        >
            <Stack
                top={0}
                position="sticky"
                gap="2px"
            >
                <Stack
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="semantic.border.secondary"
                    boxShadow="0px 1px 2px 0px #1018280D"
                    borderRadius="8px"
                    sx={{
                        svg: {
                            fill: ({ palette }) => palette.semantic.foreground.primary
                        }
                    }}
                >
                    {icon}
                </Stack>

                <Typography
                    variant="body1"
                    fontSize="16px"
                    fontWeight={600}
                >
                    {t(title)}
                </Typography>
            </Stack>
        </Stack>
    );
}

export default memo(Category);
