import { PageWrapper } from '@/@core/components/page/components';
import Panel from '@/views/maintenance/service-providers/main/sections/panel';
import { useAppSelector } from '@/store/hooks';
import PageWithInfoPanelStyled from '@/@core/ui-kits/basic/info-panel/PageWithInfoPanelStyled';
import Table from './sections/table';
import Header from './sections/header';

export default function MaintenanceServiceProviders() {
    const selectedServiceProviderId = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProviderId
    );
    const selectedServiceProvider = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProvider
    );

    return (
        <PageWrapper>
            <PageWithInfoPanelStyled.ContentWrapper>
                <PageWithInfoPanelStyled.TableWrapper
                    isPanelOpen={!!selectedServiceProviderId && !!selectedServiceProvider}
                >
                    <Header />

                    <Table />
                </PageWithInfoPanelStyled.TableWrapper>

                <Panel />
            </PageWithInfoPanelStyled.ContentWrapper>
        </PageWrapper>
    );
}
