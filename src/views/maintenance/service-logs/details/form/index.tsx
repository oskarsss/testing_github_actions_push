import { memo, useMemo } from 'react';
import { type ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import { isEqual } from 'lodash';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useServiceProvidersMap } from '@/store/hash_maps/hooks';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { Stack } from '@mui/material';
import EDIT_SERVICE_LOG_UTILS, { type DefaultValues } from '../service-log-form-utils';
import Header from './Header';
import ServiceProvider from './components/ServiceProvider';
import Equipment from './components/equipment';
import ServiceDetails from './components/ServiceDetails';
import ServiceItems from './components/service-items';
import Driver from './components/driver';
import ServiceLogDocument from './components/ServiceLogDocument';

export const useServiceLogForm = () => useFormContext<DefaultValues>();

type Props = {
    serviceLog: ServiceLogModel_ServiceLogRead;
    onClose?: () => void;
};

function Sections({
    serviceLog,
    onClose
}: Props) {
    const provider = useServiceProvidersMap(serviceLog.serviceProviderId);

    const [updateServiceLog, { isLoading }] = ServiceLogsGrpcService.useUpdateServiceLogMutation();

    const values: DefaultValues = useMemo(
        () => ({
            serviceProviderId : provider?.serviceProviderId || '',
            type              : serviceLog.type,
            orderNumber       : serviceLog.orderNumber,
            vehicleType       : serviceLog.vehicleType,
            truckId           : serviceLog.truckId,
            trailerId         : serviceLog.trailerId,
            odometerMiles     : serviceLog.odometerMiles,
            odometerKilometers: serviceLog.odometerKilometers,
            engineHours       : serviceLog.engineHours,
            driverId          : serviceLog.driverId,
            startDate         : serviceLog.startDate,
            endDate           : serviceLog.endDate,
            description       : serviceLog.description
        }),
        [
            provider?.serviceProviderId,
            serviceLog.type,
            serviceLog.description,
            serviceLog.driverId,
            serviceLog.endDate,
            serviceLog.engineHours,
            serviceLog.odometerKilometers,
            serviceLog.odometerMiles,
            serviceLog.orderNumber,
            serviceLog.startDate,
            serviceLog.trailerId,
            serviceLog.truckId,
            serviceLog.vehicleType
        ]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: EDIT_SERVICE_LOG_UTILS.defaultValues,
        values,
        resolver     : yupResolver(EDIT_SERVICE_LOG_UTILS.schema)
    });

    const save = (payload: DefaultValues) => {
        updateServiceLog({
            serviceLogId: serviceLog.serviceLogId,
            log         : {
                ...payload,
                ...(payload.vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK
                    ? {
                        truckId  : payload.truckId,
                        trailerId: ''
                    }
                    : {
                        truckId  : '',
                        trailerId: payload.trailerId
                    })
            }
        });
    };

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <Header
                serviceLogId={serviceLog.serviceLogId}
                serviceLogFriendlyId={serviceLog.friendlyId}
                isUpdating={isLoading}
                onClose={onClose}
            />

            <FullDialog.RowContent
                sx={{
                    gap: '20px',
                    ...(!onClose && {
                        width: '100%'
                    })
                }}
            >
                <FullDialog.ColumnContent maxWidth="600px">
                    <FullDialog.Fields rowSpacing={4}>
                        <ServiceProvider />

                        <Equipment />

                        <ServiceDetails />

                        <ServiceItems
                            serviceLogId={serviceLog.serviceLogId}
                            totalAmount={serviceLog.totalAmount}
                        />

                        <Driver driverId={serviceLog.driverId} />
                    </FullDialog.Fields>
                </FullDialog.ColumnContent>

                <Stack
                    height="100%"
                    overflow="hidden"
                    width="100%"
                >
                    <ServiceLogDocument
                        entityId={serviceLog.serviceLogId}
                        title={serviceLog.orderNumber}
                    />
                </Stack>
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}

export default memo(Sections, isEqual);
