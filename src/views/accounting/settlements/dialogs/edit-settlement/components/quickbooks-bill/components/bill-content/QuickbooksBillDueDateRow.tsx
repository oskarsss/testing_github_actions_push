import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    dueDate: string;
};

export default function QuickbooksBillDueDateRow({ dueDate }: Props) {
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
                {t('settlements.edit_settlement.qb_bill.due_date')}
            </Typography>
            <Typography
                fontSize="12px"
                fontWeight={600}
                lineHeight="18px"
            >
                {dueDate}
            </Typography>
        </Stack>
    );
}
