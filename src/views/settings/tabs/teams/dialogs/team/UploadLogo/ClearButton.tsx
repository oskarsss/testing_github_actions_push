import { Control, Path, useController } from 'react-hook-form';
import { Button } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TeamDefaultValues } from '../TeamFields';

type Props = {
    control: Control<TeamDefaultValues>;
    name: Path<TeamDefaultValues>;
};

export default function ClearButton({
    name,
    control
}: Props) {
    const { t } = useAppTranslation();
    const {
        field: { onChange }
    } = useController({ name, control });
    const handleDeleteFile = () => {
        onChange('');
    };

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteFile}
            sx={{ padding: '0px 8px' }}
        >
            {t('common:button.clear')}
        </Button>
    );
}
