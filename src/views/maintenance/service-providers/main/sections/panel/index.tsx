import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SelectServiceProviderAction } from '@/store/maitenance/service-providers/slice';
import InfoPanel from '@/@core/ui-kits/basic/info-panel/InfoPanel';
import Content from './components/Content';

export default function ServiceProviderPanel() {
    const dispatch = useAppDispatch();
    const selectedServiceProviderId = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProviderId
    );
    const selectedServiceProvider = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProvider
    );

    const closeServiceProviderPanel = () => {
        dispatch(SelectServiceProviderAction.selectServiceProviderId(''));
        dispatch(SelectServiceProviderAction.selectServiceProvider(null));
    };

    return (
        <InfoPanel
            isPanelOne={!!selectedServiceProviderId && !!selectedServiceProvider}
            closePanel={closeServiceProviderPanel}
        >
            <Content />
        </InfoPanel>
    );
}
