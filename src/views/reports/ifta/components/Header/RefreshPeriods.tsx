import RefreshIcon from '@mui/icons-material/Refresh';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import IftaGrpcService from '@/@grpcServices/services/ifta.service';

export default function RefreshPeriods() {
    const { refetch } = IftaGrpcService.useGetIftaPeriodsQuery({});

    return (
        <PageHeadersKit.Buttons.Primary
            onClick={refetch}
            icon={<RefreshIcon />}
            title="common:button.refresh"
        />
    );
}
