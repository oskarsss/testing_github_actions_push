import { Fade } from '@mui/material';
import { ExtractData } from '@/store/import/hooks';
import TopBlock from '@/@core/components/import-dialog/steps/Report/components/TopBlock';
import ActionButton from '@/@core/components/import-dialog/steps/Report/components/ActionButton';
import Table from '../../components/Table/Table';
import { Container } from './styled';

type Props = {
    importData: ExtractData['data'];
    isError: boolean;
};

export default function Report({
    importData,
    isError
}: Props) {
    if (!importData) {
        return null;
    }

    return (
        <Fade
            in
            timeout={500}
        >
            <Container>
                <TopBlock
                    is_error={isError}
                    total_rows_valid={importData.stats.totalRowsValid}
                    total_rows_invalid={importData.stats.totalRowsInvalid}
                />
                <Table data={importData} />
                <ActionButton />
            </Container>
        </Fade>
    );
}
