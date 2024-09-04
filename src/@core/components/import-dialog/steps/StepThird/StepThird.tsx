import { useAppTranslation } from '@/hooks/useAppTranslation';
import Fade from '@mui/material/Fade';
import { ExtractData } from '@/store/import/hooks';
import { ComponentProps } from 'react';
import ActionButtons from '@/@core/components/import-dialog/steps/StepThird/components/ActionButtons';
import Error from '../../components/Error';
import AnimationBlock from './components/AnimationBlock';
import InformationBlock from './components/InformationBlock';
import { Actions, Container, Title, Top } from './styled';

type Props = {
    closeDialog: () => void;
    extractTotalRows: number;
    importData: ExtractData['data'];
    isError: boolean;
    error?: ComponentProps<typeof Error>['error'] | null;
    isLoading: boolean;
    isSuccess: boolean;
};

export default function StepThird({
    closeDialog,
    extractTotalRows,
    importData,
    isError,
    error,
    isLoading,
    isSuccess
}: Props) {
    const { t } = useAppTranslation();

    if (isError && error) {
        return (
            <Error
                error={error}
                is_reset
            />
        );
    }

    return (
        <Fade
            in
            timeout={500}
        >
            <Container>
                <Title>{t('core:import.step.third.title')}</Title>
                <Top>
                    <AnimationBlock
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                    />
                    <InformationBlock
                        data={importData}
                        extractTotalRows={extractTotalRows}
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                    />
                </Top>
                <Actions>
                    {(isSuccess || isError) && (
                        <ActionButtons
                            closeDialog={closeDialog}
                            isSuccess={isSuccess}
                        />
                    )}
                </Actions>
            </Container>
        </Fade>
    );
}
