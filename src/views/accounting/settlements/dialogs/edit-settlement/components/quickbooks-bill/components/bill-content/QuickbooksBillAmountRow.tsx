import { Stack, Tooltip, Typography } from '@mui/material';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    balance: string;
    amount: string;
};

export default function QuickbooksBillAmountRow({
    balance,
    amount
}: Props) {
    const { t } = useAppTranslation('modals');
    const copy = useCopyToClipboard();
    return (
        <Tooltip title={t('settlements.edit_settlement.qb_bill.copy_balance')}>
            <Stack
                alignItems="center"
                gap="8px"
                flexDirection="row"
                width="fit-content"
                sx={{ cursor: 'pointer' }}
                onClick={() => copy(balance)}
            >
                <Typography
                    fontSize="18px"
                    fontWeight={600}
                    lineHeight="28px"
                >
                    {balance}
                    <Typography
                        fontSize="inherit"
                        fontWeight="inherit"
                        lineHeight="inherit"
                        component="span"
                        color="text.secondary"
                    >
                        {`/${amount}`}
                    </Typography>
                </Typography>
                <ContentCopyIcon
                    fontSize="small"
                    color="secondary"
                />
            </Stack>
        </Tooltip>
    );
}
