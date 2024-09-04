import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isEmptyForm: boolean;
    hasFieldsTypeText: boolean;
    isEdit: boolean;
    isDirty: boolean;
    handleDisable: () => void;
};

export default function FormControls({
    isEmptyForm,
    isEdit,
    isDirty,
    hasFieldsTypeText,
    handleDisable
}: Props) {
    const { t } = useAppTranslation();

    if (isEmptyForm) {
        return null;
    }

    return (
        <>
            <Button
                startIcon={isEdit ? null : <EditIcon />}
                onClick={handleDisable}
            >
                {/* eslint-disable-next-line no-nested-ternary */}
                {isEdit
                    ? hasFieldsTypeText
                        ? t('common:button.cancel')
                        : t('settings:integrations.details.right_side.form.buttons.finish_changing')
                    : t('common:button.edit')}
            </Button>
            {isEdit && hasFieldsTypeText && (
                <Button
                    startIcon={<SaveIcon />}
                    disabled={!isDirty}
                    type="submit"
                    variant="contained"
                >
                    {t('common:button.save')}
                </Button>
            )}
        </>
    );
}
