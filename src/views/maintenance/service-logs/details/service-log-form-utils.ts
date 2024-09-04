import * as yup from 'yup';
import {
    ServiceLogModel_ServiceLogType,
    type ServiceLogModel_ServiceLogWrite
} from '@proto/models/model_service_log';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';

export type DefaultValues = ServiceLogModel_ServiceLogWrite;

const defaultValues: DefaultValues = {
    serviceProviderId : '',
    type              : ServiceLogModel_ServiceLogType.UNSPECIFIED,
    orderNumber       : '',
    vehicleType       : VehicleMaintenanceModel_VehicleType.UNSPECIFIED,
    truckId           : '',
    trailerId         : '',
    odometerMiles     : 0,
    odometerKilometers: 0,
    engineHours       : 0,
    driverId          : '',
    startDate         : '',
    endDate           : '',
    description       : ''
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    serviceProviderId: yup.string().required('Service Provider is required'),
    type             : yup
        .number<ServiceLogModel_ServiceLogType>()
        .notOneOf([ServiceLogModel_ServiceLogType.UNSPECIFIED], 'Type is required')
        .required('Type is required'),
    orderNumber: yup.string().required('Order Number is required'),
    vehicleType: yup
        .number<VehicleMaintenanceModel_VehicleType>()
        .notOneOf([VehicleMaintenanceModel_VehicleType.UNSPECIFIED], 'Vehicle Type is required')
        .required('Vehicle Type is required'),
    truckId           : yup.string().defined(),
    trailerId         : yup.string().defined(),
    odometerMiles     : yup.number().defined(),
    odometerKilometers: yup.number().defined(),
    engineHours       : yup.number().defined(),
    driverId          : yup.string().defined(),
    startDate         : yup.string().required('Start Date is required'),
    endDate           : yup.string().defined(),
    description       : yup.string().defined()
});

const EDIT_SERVICE_LOG_UTILS = {
    defaultValues,
    schema
};

export default EDIT_SERVICE_LOG_UTILS;
