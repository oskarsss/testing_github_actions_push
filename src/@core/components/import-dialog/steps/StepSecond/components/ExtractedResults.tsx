import { useAppTranslation } from '@/hooks/useAppTranslation';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useMemoize } from '@/store/import/hooks';
import DownloadFiles from '../../../components/DownloadFiles/DownloadFiles';
import {
    ResultsContainer,
    Description,
    Left,
    Right,
    ExtractedRows,
    InformationRows,
    InformationItem
} from '../styled';

type Props = ReturnType<typeof useMemoize>;
export default function ExtractedResults({
    data,
    isValidTable
}: Props) {
    const { t } = useAppTranslation('core');
    const {
        totalRowsValid,
        totalRows,
        rowsGroupByError
    } = data.stats;

    return (
        <ResultsContainer>
            <Left>
                <h5>{t('import.step.second.title')}</h5>
                <Description isValidTable={isValidTable}>
                    <AssignmentLateIcon />
                    <p>
                        {!isValidTable
                            ? t('import.step.second.desc_invalid')
                            : t('import.step.second.desc_valid')}
                    </p>
                </Description>
                <DownloadFiles />
            </Left>
            <Right>
                <ExtractedRows>
                    <h6>{totalRowsValid}</h6>
                    <p>{t('import.step.second.extracted')}</p>
                </ExtractedRows>
                <InformationRows>
                    {rowsGroupByError.map(({
                        count,
                        description
                    }, index) => (
                        <InformationItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            isError
                        >
                            <p>{`${count}/${totalRows}`}</p>
                            <h6>{description}</h6>
                        </InformationItem>
                    ))}
                    <InformationItem>
                        <p>{`${totalRowsValid}/${totalRows}`}</p>
                        <h6>{t('import.step.second.importable')}</h6>
                    </InformationItem>
                </InformationRows>
            </Right>
        </ResultsContainer>
    );
}
