import Button from '@mui/material/Button';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Lottie from 'lottie-react';
import { useImportHelpers } from '@/@core/components/import-dialog/helpers';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorContainer } from './styled';
import lottieDataFailed from '../../../../../public/lotties/data-failed.json';

type Props = {
    error:
        | (FetchBaseQueryError & { code?: string | number; message?: string })
        | SerializedError
        | undefined;
    is_reset?: boolean;
};
export default function Error({
    error,
    is_reset = false
}: Props) {
    const { t } = useAppTranslation();
    const { reset } = useImportHelpers();

    return (
        <ErrorContainer>
            <Lottie
                animationData={lottieDataFailed}
                loop={false}
                style={{ height: 130, width: 200, margin: '15% auto' }}
            />
            <h2>
                {t('common:error_title')}: {error?.message || 'Unknown error'}
            </h2>
            {is_reset && (
                <Button
                    variant="outlined"
                    onClick={() => reset({ isFilesDelete: true })}
                >
                    {t('common:button.back')}
                </Button>
            )}
        </ErrorContainer>
    );
}
