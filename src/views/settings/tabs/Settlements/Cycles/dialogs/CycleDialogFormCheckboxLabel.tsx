import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    description: IntlMessageKey;
};

export default function CycleDialogFormCheckboxLabel({ description }: Props) {
    const { t } = useAppTranslation();

    return (
        <Typography
            fontSize="12px"
            variant="body1"
        >
            {t(description)}
        </Typography>
    );
}
