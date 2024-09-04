import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditLoadTemperatureDialog } from '@/views/dispatch/orders/dialogs/EditLoad/components/EditLoadFields/custom-fields/load-temperature/EditLoadTemperatureDialog';

type Props = {
    temperature: number;
    loadId: string;
    disabled: boolean;
};

export default function LoadTemperatureField({
    disabled,
    loadId,
    temperature
}: Props) {
    const { t } = useAppTranslation('fields');
    const dialog = useEditLoadTemperatureDialog();

    const openDialog = () => {
        if (disabled) return;
        dialog.open({
            loadId,
            temperature
        });
    };

    return (
        <TextField
            name="temperature"
            label={t('temperature.label')}
            disabled={disabled}
            type="number"
            variant="filled"
            size="small"
            sx={{ width: '100%' }}
            placeholder="12"
            value={temperature}
            onClick={openDialog}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">{t('temperature.unit')}</InputAdornment>
                ),
                autoComplete: 'off',
                readOnly    : true
            }}
        />
    );
}
