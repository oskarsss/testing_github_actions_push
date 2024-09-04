import { Stack } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import VectorIcons from '@/@core/icons/vector_icons';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SelectServiceProviderAction } from '@/store/maitenance/service-providers/slice';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { ServiceLogGetRequest_SortType } from '@proto/service_log';
import ServiceProviderPanelHeader from './Header';
import ContactInfo from './ContactInfo';
import LogStats from './LogStats';
import LastServiceLogs from './last-service-logs';
import infoSectionsConfig from './info-sections-config';

function Content() {
    const dispatch = useAppDispatch();
    const selectedServiceProviderId = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProviderId
    );
    const serviceProvider = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProvider
    );

    const {
        currentData,
        isError
    } = ServiceProvidersGrpcService.useRetrieveServiceProviderQuery(
        {
            serviceProviderId: selectedServiceProviderId
        },
        { skip: !selectedServiceProviderId }
    );

    const { data } = ServiceLogsGrpcService.useGetServiceLogsQuery(
        {
            page       : 0,
            perPage    : 50,
            sortType   : ServiceLogGetRequest_SortType.LATEST,
            search     : '',
            startDate  : '',
            endDate    : '',
            providerIds: [selectedServiceProviderId],
            truckIds   : [],
            trailerIds : [],
            driverIds  : [],
            types      : []
        },
        {
            skip: !selectedServiceProviderId
        }
    );

    useEffect(() => {
        if (currentData?.providerItem) {
            dispatch(SelectServiceProviderAction.selectServiceProvider(currentData.providerItem));
        }
    }, [currentData, dispatch]);

    const contactInfoConfig = useMemo(
        () => infoSectionsConfig.getContactInfo(serviceProvider),
        [serviceProvider]
    );
    const addressInfoConfig = useMemo(
        () => infoSectionsConfig.getAddressInfo(serviceProvider),
        [serviceProvider]
    );

    if (isError) {
        return (
            <FallbackContent
                icon={<VectorIcons.Cone size={100} />}
                firstText="common:something_went_wrong"
            />
        );
    }

    if (!serviceProvider) {
        return null;
    }

    return (
        <Stack
            height="100%"
            width="100%"
            overflow="auto"
            bgcolor="semantic.background.secondary"
            sx={(theme) => ({ ...getScrollBarStyles(theme) })}
        >
            <Stack
                padding="0 20px 0"
                height="100%"
                position="relative"
                gap="20px"
            >
                <ServiceProviderPanelHeader serviceProvider={serviceProvider} />

                {data?.logs && data.logs.length > 0 && <LogStats />}

                <ContactInfo
                    icon={(
                        <VectorIcons.FullDialogIcons.ContactInfoIcon
                            sx={{
                                fontSize: '24px',
                                color   : ({ palette }) => palette.semantic.foreground.brand.primary
                            }}
                        />
                    )}
                    title="maintenance:service_providers.modals.form.sections.contact_info"
                    config={contactInfoConfig}
                />

                <ContactInfo
                    icon={<VectorIcons.FullDialogIcons.AddressInfo />}
                    title="maintenance:service_providers.modals.form.sections.address_info"
                    config={addressInfoConfig}
                />

                <LastServiceLogs />
            </Stack>
        </Stack>
    );
}

export default memo(Content);
