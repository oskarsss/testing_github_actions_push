import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Stack, Typography, Tooltip } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import { memo } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    amount?: string;
    title: IntlMessageKey;
};

function Header({
    amount,
    title
}: Props) {
    const { t } = useAppTranslation();
    const copy = useCopyToClipboard();
    const handleCopy = () => copy(amount ?? '');
    return (
        <Stack gap="8px">
            <DialogComponents.Header title={title}>
                <Stack
                    flex={1}
                    height="20px"
                    direction="row"
                    alignItems="center"
                    marginLeft="10px"
                >
                    <Stack
                        direction="row"
                        padding="1px 6px"
                        border="1px solid"
                        borderColor={({ palette }) => palette.semantic.border.primary}
                        boxShadow="0px 1px 2px 0px #1018280D"
                        bgcolor={({ palette }) => palette.semantic.foreground.white.tertiary}
                        borderRadius="4px"
                        alignItems="center"
                        gap="4px"
                    >
                        <Typography
                            variant="body2"
                            fontSize="12px"
                            fontWeight={500}
                        >
                            {t('common:original')}:
                        </Typography>

                        <Tooltip
                            title={t('common:button.copy')}
                            disableHoverListener={!amount}
                            placement="top"
                            onClick={handleCopy}
                        >
                            <Typography
                                variant="caption"
                                color="text.primary"
                                fontSize="12px"
                                fontWeight={500}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                {amount ?? '-'}
                            </Typography>
                        </Tooltip>
                    </Stack>
                </Stack>
            </DialogComponents.Header>
        </Stack>
    );
}

export default memo(Header);
