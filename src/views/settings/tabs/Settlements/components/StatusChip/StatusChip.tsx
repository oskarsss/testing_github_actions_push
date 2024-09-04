import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip, Text } from '@/views/settings/tabs/Settlements/components/StatusChip/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    label: IntlMessageKey;
    color: 'green' | 'blue';
};

export default function StatusChip({
    label,
    color
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Chip color={color}>
            <Text>{t(label)}</Text>
            <CheckCircleIcon fontSize="small" />
        </Chip>
    );
}
