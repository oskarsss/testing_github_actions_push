import { Fade } from '@mui/material';
import { ExtractData } from '@/store/import/hooks';
import ActionButtons from '@/@core/components/import-dialog/steps/StepSecond/components/ActionButtons';
import { ComponentProps } from 'react';
import Table from '../../components/Table/Table';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import ExtractedResults from './components/ExtractedResults';
import { Container } from './styled';

type Props = {
    importData: () => void;
    error?: ComponentProps<typeof Error>['error'] | null;
    isLoading: boolean;
} & ExtractData;

export default function StepSecond({
    importData,
    data,
    isValidTable,
    error,
    isLoading
}: Props) {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Error
                error={error}
                is_reset
            />
        );
    }

    if (!data) {
        return null;
    }

    return (
        <Fade
            in
            timeout={500}
        >
            <Container>
                <ExtractedResults
                    data={data}
                    isValidTable={isValidTable}
                />
                <Table data={data} />
                <ActionButtons
                    importData={importData}
                    isValidTable={isValidTable}
                    totalRowsValid={data.stats.totalRowsValid}
                />
            </Container>
        </Fade>
    );
}
