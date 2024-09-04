import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useWatch } from 'react-hook-form';
import { StepButton } from '../../styled';
import { useDraftFormContext } from '../../Draft';

export default function AddItemButton() {
    const {
        setValue,
        control
    } = useDraftFormContext();
    const { t } = useAppTranslation();

    const commodity = useWatch({ control, name: 'commodity' });

    const handlerAddItem = () => {
        if (!commodity) {
            setValue('commodity', 'Commodity Name');
            setValue('weight', 0);
        }
    };

    return (
        <StepButton
            variant="text"
            size="small"
            disabled={Boolean(commodity)}
            style={{ marginLeft: 'auto' }}
            onClick={handlerAddItem}
        >
            <AddOutlinedIcon />
            {t('new_loads:draft.form.buttons.add_line_item')}
        </StepButton>
    );
}
