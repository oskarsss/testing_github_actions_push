import type { IntlMessageKey } from '@/@types/next-intl';
import { formatPhoneNumber } from '@/utils/formatting';
import {
    ServiceLogModel_ServiceLogRead,
    ServiceLogModel_ServiceLogType
} from '@proto/models/model_service_log';
import Equipment from '@/@core/components/service-log-equipment';
import type { ReactNode } from 'react';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import type { TFunction } from 'i18next';
import TypeChip from '@/views/maintenance/service-logs/ui-elements/TypeChip';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import moment from 'moment-timezone';

export type InfoConfigItem = {
    key: string;
    label: IntlMessageKey;
    value: string | ReactNode;
};

const getProviderInfo = (
    serviceProvider?: ServiceProviderModel_ServiceProvider,
    serviceLogOrderNumber?: string
): InfoConfigItem[] => [
    {
        key  : '1',
        label: 'common:provider',
        value: serviceProvider?.name || '-'
    },
    {
        key  : '2',
        label: 'maintenance:service_logs.panel.sections.provider.service_order',
        value: serviceLogOrderNumber || '-'
    },
    {
        key  : '3',
        label: 'fields:contact_name.label',
        value: serviceProvider?.contactName || '-'
    },
    {
        key  : '4',
        label: 'fields:phone_number.label',
        value: serviceProvider?.phone ? formatPhoneNumber(serviceProvider.phone) : '-'
    },
    {
        key  : '5',
        label: 'fields:email.label',
        value: serviceProvider?.email || '-'
    },
    {
        key  : '6',
        label: 'fields:address.label',
        value: `${serviceProvider?.addressLine1 || ''} ${serviceProvider?.addressLine2 || ''} ${
            serviceProvider?.addressCity || ''
        } ${serviceProvider?.addressState || ''} ${serviceProvider?.addressPostalCode || ''}`
    }
];

const getEquipmentInfo = (
    serviceLog: ServiceLogModel_ServiceLogRead | null,
    t: TFunction
): InfoConfigItem[] => [
    {
        key  : '1',
        label: `entity:${
            serviceLog?.vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK
                ? 'truck'
                : 'trailer'
        }`,
        value: (
            <Equipment
                vehicleType={serviceLog?.vehicleType || VehicleMaintenanceModel_VehicleType.TRUCK}
                truckId={serviceLog?.truckId || ''}
                trailerId={serviceLog?.trailerId || ''}
                fontSize="16px"
            />
        )
    },
    {
        key  : '2',
        label: 'maintenance:service_logs.common.odometer',
        value: serviceLog?.odometerMiles
            ? `${serviceLog.odometerMiles.toLocaleString('en-US')} ${t('common:mi')}`
            : '-'
    },
    {
        key  : '3',
        label: 'maintenance:service_logs.common.engine_hours',
        value: serviceLog?.engineHours ? `${serviceLog.engineHours.toLocaleString('en-US')}` : '-'
    }
];

const getDetailsInfo = (
    serviceLog: ServiceLogModel_ServiceLogRead | null,
    t: TFunction
): InfoConfigItem[] => [
    {
        key  : '1',
        label: 'maintenance:service_logs.panel.sections.details.date_in',
        value: serviceLog?.startDate ? moment(serviceLog?.startDate).format('MM/DD/YYYY') : '-'
    },
    {
        key  : '2',
        label: 'maintenance:service_logs.panel.sections.details.date_out',
        value: serviceLog?.endDate ? moment(serviceLog?.endDate).format('MM/DD/YYYY') : '-'
    },
    {
        key  : '3',
        label: 'maintenance:service_logs.panel.sections.details.time_spent',
        value: serviceLog?.odometerMiles
            ? `${serviceLog.odometerMiles.toLocaleString('en-US')} ${t('common:mi')}`
            : '-'
    },
    {
        key  : '4',
        label: 'common:type',
        value: <TypeChip type={serviceLog?.type || ServiceLogModel_ServiceLogType.PLANNED} />
    }
];

const infoSectionsConfig = {
    getProviderInfo,
    getEquipmentInfo,
    getDetailsInfo
};

export default infoSectionsConfig;
