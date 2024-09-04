import { PageWrapper } from '@/@core/components/page/components';

import { useAppSelector } from '@/store/hooks';
import PageWithInfoPanelStyled from '@/@core/ui-kits/basic/info-panel/PageWithInfoPanelStyled';
import Header from './sections/header';
import Table from './sections/table';
import Panel from './sections/panel';

export default function MaintenanceServiceLogs() {
    const selectedServiceLogId = useAppSelector((state) => state.serviceLogs.selectedServiceLogId);
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);

    return (
        <PageWrapper>
            <PageWithInfoPanelStyled.ContentWrapper>
                <PageWithInfoPanelStyled.TableWrapper
                    isPanelOpen={!!selectedServiceLogId && !!selectedServiceLog}
                >
                    <Header />
                    <Table />
                </PageWithInfoPanelStyled.TableWrapper>

                <Panel />
            </PageWithInfoPanelStyled.ContentWrapper>
        </PageWrapper>
    );
}
