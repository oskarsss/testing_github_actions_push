import { Button } from '@mui/material';
import { Actions } from '@/@core/components/import-dialog/steps/Report/styled';
import { useDispatch } from 'react-redux';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ImportActions, initialState } from '@/store/import/slice';

export default function ActionButton() {
    const dispatch = useDispatch();
    const { t } = useAppTranslation();

    const onBack = () => {
        dispatch(ImportActions.UpdateFilters(initialState.filter));
        dispatch(ImportActions.SetActiveStep(2));
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
        </Actions>
    );
}
