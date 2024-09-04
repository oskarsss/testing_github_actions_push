import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    docNumber: string;
};

export default function QuickbooksBillDocNumberRow({ docNumber }: Props) {
    const { t } = useAppTranslation('modals');
    return (
        <Stack
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
        >
            <Typography
                fontSize="12px"
                fontWeight={600}
                lineHeight="18px"
                color="text.secondary"
            >
                {t('settlements.edit_settlement.qb_bill.doc_number')}
            </Typography>
            <Typography
                fontSize="12px"
                fontWeight={600}
                lineHeight="18px"
            >
                {docNumber || '-'}
            </Typography>
        </Stack>
    );
}
