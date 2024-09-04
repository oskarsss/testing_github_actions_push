import { useAppTranslation } from '@/hooks/useAppTranslation';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { ExtractData } from '@/store/import/hooks';
import DownloadFiles from '../../../components/DownloadFiles/DownloadFiles';
import { Information, InformationBox, InformationItem, InformationTitle } from '../styled';

const icon = {
    loading: <ReplayCircleFilledIcon sx={{ fontSize: '40px', color: '#99A4B0' }} />,
    done   : <CheckCircleIcon sx={{ fontSize: '40px', color: '#285FF6' }} />,
    error  : <CancelIcon sx={{ fontSize: '40px', color: '#CB281A' }} />
};

type Props = {
    data: ExtractData['data'];
    extractTotalRows: number;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
};
export default function InformationBlock({
    data,
    extractTotalRows,
    isLoading,
    isError,
    isSuccess
}: Props) {
    const { t } = useAppTranslation('core');

    return (
        <Information>
            <InformationTitle>
                {isLoading && t('import.step.third.desc.loading')}
                {isSuccess && t('import.step.third.desc.done')}
                {isError && t('import.step.third.desc.error')}
            </InformationTitle>
            <DownloadFiles style={{ marginBottom: '32px' }} />
            <InformationBox>
                {isSuccess &&
                    data &&
                    data.stats.rowsGroupByError.map((el, index) => (
                        <InformationItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            isError
                        >
                            <div>
                                <p>{`${el.count}/${data.stats.totalRows}`}</p>
                                <h6>{el.label}</h6>
                            </div>
                            {icon.error}
                        </InformationItem>
                    ))}
                <InformationItem isError={isError}>
                    <div>
                        <p>
                            {isLoading && `0/${extractTotalRows || 0}`}
                            {isSuccess && `${data?.stats.totalRowsValid}/${data?.stats.totalRows}`}
                            {isError && `0/${data?.stats.totalRows}`}
                        </p>
                        <h6>{t('import.step.third.uploaded_rows')}</h6>
                    </div>
                    {isLoading && icon.loading}
                    {isSuccess && icon.done}
                    {isError && icon.error}
                </InformationItem>
            </InformationBox>
        </Information>
    );
}
