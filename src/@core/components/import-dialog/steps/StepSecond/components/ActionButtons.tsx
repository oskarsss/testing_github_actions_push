import { Button } from '@mui/material';
import { Actions } from '@/@core/components/import-dialog/steps/StepSecond/styled';
import { ImportActions, initialState } from '@/store/import/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAppDispatch } from '@/store/hooks';

type Props = {
    importData: () => void;
    isValidTable: boolean;
    totalRowsValid: number | string;
};

export default function ActionButtons({
    importData,
    isValidTable,
    totalRowsValid
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const onImport = () => {
        dispatch(ImportActions.UpdateFilters(initialState.filter));
        importData();
        dispatch(ImportActions.SetActiveStep(2));
    };

    const onBack = () => {
        dispatch(ImportActions.SetActiveStep(0));
    };

    return (
        <Actions>
            <Button
                variant="outlined"
                onClick={onBack}
                sx={{ width: '120px' }}
            >
                {t('common:button.back')}
            </Button>
            {isValidTable && (
                <Button
                    variant="contained"
                    onClick={onImport}
                >
                    {t('common:button.import')}
                    <span>{` ${totalRowsValid} `}</span>
                    {t('core:import.button.records')}
                </Button>
            )}
        </Actions>
    );
}
