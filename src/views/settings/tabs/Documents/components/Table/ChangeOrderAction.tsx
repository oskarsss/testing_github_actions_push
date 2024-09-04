import { Button } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isChangeOrder: boolean;
    onSave: () => void;
    disabledSave: boolean;
    disabledChange: boolean;
    onCancel: () => void;
    onChangeOrder: (value: boolean) => void;
};

function ChangeOrderAction({
    isChangeOrder,
    onSave,
    disabledSave,
    onCancel,
    onChangeOrder,
    disabledChange
}: Props) {
    const { t } = useAppTranslation('common');
    return isChangeOrder ? (
        <>
            <Button
                onClick={onSave}
                variant="outlined"
                disabled={disabledSave}
            >
                {t('button.save')}
            </Button>
            <Button
                variant="outlined"
                color="error"
                onClick={onCancel}
            >
                {t('button.cancel')}
            </Button>
        </>
    ) : (
        <Button
            disabled={disabledChange}
            onClick={() => onChangeOrder(true)}
        >
            {t('button.change_order')}
        </Button>
    );
}

export default ChangeOrderAction;
