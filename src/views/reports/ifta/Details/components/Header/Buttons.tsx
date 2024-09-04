import RefreshIcon from '@mui/icons-material/Refresh';
import SpeedIcon from '@mui/icons-material/Speed';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/Download';
import IftaGrpcService from '@/@grpcServices/services/ifta.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Buttons = styled('div')(({ value }: { value: string }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : value !== '2' ? 310 : 500
}));

type Props = {
    id: string;
    value: string;
};

export default function IftaButtons({
    id,
    value
}: Props) {
    const { t } = useAppTranslation();
    const { refetch } = IftaGrpcService.useGeIftatPeriodQuery({ periodId: id });

    return (
        <Buttons value={value}>
            {value === '2' && (
                <Button
                    variant="contained"
                    startIcon={<FileCopyIcon />}
                >
                    {t('ifta:buttons.view_report')}
                </Button>
            )}
            {value === '2' && (
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                >
                    {t('common:button.download')}
                </Button>
            )}

            <Button
                variant="contained"
                startIcon={<SpeedIcon />}
            >
                {t('ifta:buttons.view_rates')}
            </Button>

            {value !== '2' && (
                <Button
                    variant="contained"
                    onClick={refetch}
                    startIcon={<RefreshIcon />}
                >
                    {t('common:button.refresh')}
                </Button>
            )}
        </Buttons>
    );
}
