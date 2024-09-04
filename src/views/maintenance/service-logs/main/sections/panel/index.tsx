import { useAppDispatch, useAppSelector } from '@/store/hooks';
import InfoPanel from '@/@core/ui-kits/basic/info-panel/InfoPanel';
import { SelectServiceLogsAction } from '@/store/maitenance/service-logs/slice';
import Content from './components/Content';

export default function ServiceLogPanel() {
    const dispatch = useAppDispatch();
    const selectedServiceLogId = useAppSelector((state) => state.serviceLogs.selectedServiceLogId);
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);

    const closeServiceProviderPanel = () => {
        dispatch(SelectServiceLogsAction.selectServiceLogId(''));
        dispatch(SelectServiceLogsAction.selectServiceLog(null));
    };

    return (
        <InfoPanel
            isPanelOne={!!selectedServiceLogId && !!selectedServiceLog}
            closePanel={closeServiceProviderPanel}
        >
            <Content />
        </InfoPanel>
    );
}
