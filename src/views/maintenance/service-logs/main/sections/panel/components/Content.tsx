import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { useEffect } from 'react';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import { Stack } from '@mui/material';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { SelectServiceLogsAction } from '@/store/maitenance/service-logs/slice';
import ServiceLogItemGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item.service';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import Header from './Header';
import Equipment from './Equipment';
import Provider from './Provider';
import Details from './Details';
import Items from './items';
import Driver from './driver';

export default function Content() {
    const dispatch = useAppDispatch();
    const selectedServiceLogId = useAppSelector((state) => state.serviceLogs.selectedServiceLogId);

    const {
        currentData,
        isError: isServiceLogError
    } =
        ServiceLogsGrpcService.useRetrieveServiceLogQuery(
            { serviceLogId: selectedServiceLogId },
            {
                skip           : !selectedServiceLogId,
                refetchOnFocus : true,
                pollingInterval: 15000
            }
        );

    const { currentData: currentDataItems } = ServiceLogItemGrpcService.useGetServiceLogItemsQuery(
        {
            serviceLogId: selectedServiceLogId
        },
        {
            skip: !selectedServiceLogId
        }
    );

    const currentDataDriver = useDriverById(currentData?.log?.driverId || '');

    // DriversGrpcService.useRetrieveDriverQuery(
    //     { driverId: currentData?.log?.driverId || '' },
    //     { skip: !currentData?.log?.driverId || !selectedServiceLogId }
    // );

    useEffect(() => {
        if (currentData?.log) {
            dispatch(SelectServiceLogsAction.selectServiceLog(currentData.log));
        }
    }, [currentData, dispatch]);

    if (isServiceLogError) {
        return (
            <FallbackContent
                icon={<VectorIcons.Cone size={100} />}
                firstText="common:something_went_wrong"
            />
        );
    }

    return (
        <Stack
            height="100%"
            width="100%"
            overflow="hidden"
            bgcolor="semantic.background.secondary"
            paddingBottom="20px"
        >
            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false,
                    suppressScrollX : true
                }}
            >
                <Stack
                    padding="0 20px 0"
                    height="100%"
                    gap="20px"
                    position="relative"
                >
                    <Header />

                    <Provider />

                    <Equipment />

                    <Details />

                    <Items items={currentDataItems} />

                    <Driver driver={currentDataDriver} />
                </Stack>
            </PerfectScrollbar>
        </Stack>
    );
}
