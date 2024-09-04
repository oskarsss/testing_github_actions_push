import { memo, useMemo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import ServiceLogPanelInfoSection from '@/views/maintenance/service-logs/main/sections/panel/components/Section';
import infoSectionsConfig from '@/views/maintenance/service-logs/main/sections/panel/components/info-sections-config';
import { useServiceProvidersMap } from '@/store/hash_maps/hooks';
import { useAppSelector } from '@/store/hooks';

function Provider() {
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);
    const provider = useServiceProvidersMap(selectedServiceLog?.serviceProviderId || '');

    const providerInfo = useMemo(
        () => infoSectionsConfig.getProviderInfo(provider, selectedServiceLog?.orderNumber),
        [provider, selectedServiceLog?.orderNumber]
    );

    return (
        <ServiceLogPanelInfoSection
            icon={(
                <VectorIcons.Maintenance.ServiceProviders
                    sx={{
                        fontSize: '24px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />
            )}
            title="common:provider"
            config={providerInfo}
        />
    );
}

export default memo(Provider);
