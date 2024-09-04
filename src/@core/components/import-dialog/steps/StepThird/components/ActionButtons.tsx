import Button from '@mui/material/Button';
import { ImportActions } from '@/store/import/slice';
import { useAppDispatch } from '@/store/hooks';
import { useImportHelpers } from '@/@core/components/import-dialog/helpers';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    closeDialog: () => void;
    isSuccess: boolean;
};

export default function ActionButtons({
    closeDialog,
    isSuccess
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const {
        reset,
        handleClose
    } = useImportHelpers();

    const onImportAnotherFile = () => {
        reset({ isFilesDelete: true });
    };
    const onClickDone = () => {
        reset({});
        handleClose(closeDialog);
    };

    const onReport = () => {
        dispatch(ImportActions.SetActiveStep(3));
    };
    return (
        <>
            <Button
                variant="outlined"
                onClick={onImportAnotherFile}
            >
                {t('core:import.button.import_another_file')}
            </Button>
            <div>
                <Button
                    variant="contained"
                    onClick={onReport}
                >
                    {t('core:import.button.view_report')}
                </Button>
                {isSuccess && (
                    <Button
                        variant="contained"
                        onClick={onClickDone}
                        sx={{
                            width     : '120px',
                            fontWeight: 700,
                            marginLeft: '20px'
                        }}
                    >
                        {t('common:button.done')}
                    </Button>
                )}
            </div>
        </>
    );
}
