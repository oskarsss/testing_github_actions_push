import { useAppTranslation } from '@/hooks/useAppTranslation';
import Lottie from 'lottie-react';
import lottieUploadSuccess from '../../../../../../../public/lotties/data-upload-completed.json';
import lottieUploadLoading from '../../../../../../../public/lotties/data-upload-in-progress.json';
import lottieUploadFailed from '../../../../../../../public/lotties/upload-failed.json';
import { Animation } from '../styled';

type Props = {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};
export default function AnimationBlock({
    isLoading,
    isError,
    isSuccess
}: Props) {
    const { t } = useAppTranslation('core');

    let animationData;
    if (isLoading) {
        animationData = lottieUploadLoading;
    } else if (isSuccess) {
        animationData = lottieUploadSuccess;
    } else {
        animationData = lottieUploadFailed;
    }

    return (
        <Animation>
            {(isLoading || isError) && (
                <h6>
                    {isLoading && <span>{t('import.step.third.desc.is_loading')}</span>}
                    {isError && t('import.step.third.desc.is_error')}
                </h6>
            )}
            <Lottie
                style={{ height: 380, width: 380 }}
                animationData={animationData}
                loop={isLoading}
            />
        </Animation>
    );
}
