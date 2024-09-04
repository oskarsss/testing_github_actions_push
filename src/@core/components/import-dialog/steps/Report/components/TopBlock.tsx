import {
    AssignmentLateIcon,
    Box,
    Description,
    InformationItem,
    RightSide
} from '@/@core/components/import-dialog/steps/Report/styled';
import DownloadFiles from '@/@core/components/import-dialog/components/DownloadFiles/DownloadFiles';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    is_error: boolean;
    total_rows_valid: number | string;
    total_rows_invalid: number | string;
};
export default function TopBlock({
    is_error,
    total_rows_valid,
    total_rows_invalid
}: Props) {
    const { t } = useAppTranslation('core');
    return (
        <Description>
            <div>
                <h5>{t('import.step.report.title')}</h5>
                <Box>
                    <AssignmentLateIcon is_error={is_error} />
                    <p>
                        {is_error
                            ? t('import.step.second.desc_invalid')
                            : t('import.step.second.report_valid')}
                    </p>
                </Box>
                <DownloadFiles />
            </div>
            <RightSide>
                <InformationItem>
                    <h6>{total_rows_valid}</h6>
                    <p>{t('import.step.second.extracted')}</p>
                </InformationItem>
                <InformationItem is_error={is_error}>
                    <h6>{total_rows_invalid}</h6>
                    <p>{t('import.step.report.incomplete')}</p>
                </InformationItem>
            </RightSide>
        </Description>
    );
}
