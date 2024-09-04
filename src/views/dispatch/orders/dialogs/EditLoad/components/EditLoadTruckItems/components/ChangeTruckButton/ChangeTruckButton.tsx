import VectorIcons from '@/@core/icons/vector_icons';
import { Button, ButtonProps } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function ChangeTruckButton({ onClick }: ButtonProps) {
    const { t } = useAppTranslation();

    return (
        <Button
            onClick={onClick}
            startIcon={<VectorIcons.LoadIcons.Switch />}
        >
            {t('common:button.change')}
        </Button>
    );
}
