/* eslint-disable max-len */

import {
    LoadModel_InvoiceStatus,
    LoadModel_Status,
    LoadModel_Stop_Status,
    LoadModel_Stop_Type
} from '@proto/models/model_load';
import { StopStatuses, LoadStopTypesEnum } from '@/models/loads/load-stop';
import { LoadInvoiceStatus, LoadStatus } from '@/models/loads/load';

export const LOAD_STOP_STATUS_GRPC_ENUM: Record<LoadModel_Stop_Status, StopStatuses> =
    Object.freeze({
        [LoadModel_Stop_Status.unspecified]: StopStatuses.PENDING,
        [LoadModel_Stop_Status.pending]    : StopStatuses.PENDING,
        [LoadModel_Stop_Status.en_route]   : StopStatuses.EN_ROUTE,
        [LoadModel_Stop_Status.on_location]: StopStatuses.ON_LOCATION,
        [LoadModel_Stop_Status.checked_in] : StopStatuses.CHECKED_IN,
        [LoadModel_Stop_Status.completed]  : StopStatuses.COMPLETED,
        [LoadModel_Stop_Status.canceled]   : StopStatuses.CANCELED,
        [LoadModel_Stop_Status.tonu]       : StopStatuses.TONU
    });

export const LOAD_STOP_STATUS_TO_GRPC_ENUM: Record<StopStatuses, LoadModel_Stop_Status> =
    Object.freeze({
        [StopStatuses.PENDING]    : LoadModel_Stop_Status.pending,
        [StopStatuses.EN_ROUTE]   : LoadModel_Stop_Status.en_route,
        [StopStatuses.ON_LOCATION]: LoadModel_Stop_Status.on_location,
        [StopStatuses.CHECKED_IN] : LoadModel_Stop_Status.checked_in,
        [StopStatuses.COMPLETED]  : LoadModel_Stop_Status.completed,
        [StopStatuses.CANCELED]   : LoadModel_Stop_Status.canceled,
        [StopStatuses.TONU]       : LoadModel_Stop_Status.tonu
    });

export const LOAD_STOP_TYPE_GRPC_ENUM: Record<LoadModel_Stop_Type, LoadStopTypesEnum> =
    Object.freeze({
        [LoadModel_Stop_Type.type_unspecified]: LoadStopTypesEnum.PICKUP_DROPOFF,
        [LoadModel_Stop_Type.pickup]          : LoadStopTypesEnum.PICKUP,
        [LoadModel_Stop_Type.dropoff]         : LoadStopTypesEnum.DROPOFF,
        [LoadModel_Stop_Type.pickup_dropoff]  : LoadStopTypesEnum.PICKUP_DROPOFF,
        [LoadModel_Stop_Type.dropoff_chassis] : LoadStopTypesEnum.DROPOFF,
        [LoadModel_Stop_Type.pickup_chassis]  : LoadStopTypesEnum.PICKUP,
        [LoadModel_Stop_Type.pickup_trailer]  : LoadStopTypesEnum.PICKUP,
        [LoadModel_Stop_Type.dropoff_trailer] : LoadStopTypesEnum.DROPOFF
    });

export const LOAD_STOP_TYPE_TO_GRPC_ENUM: Record<LoadStopTypesEnum, LoadModel_Stop_Type> =
    Object.freeze({
        [LoadStopTypesEnum.PICKUP_DROPOFF] : LoadModel_Stop_Type.pickup_dropoff,
        [LoadStopTypesEnum.PICKUP]         : LoadModel_Stop_Type.pickup,
        [LoadStopTypesEnum.DROPOFF]        : LoadModel_Stop_Type.dropoff,
        [LoadStopTypesEnum.PICKUP_CHASSIS] : LoadModel_Stop_Type.pickup_chassis,
        [LoadStopTypesEnum.DROPOFF_CHASSIS]: LoadModel_Stop_Type.dropoff_chassis,
        [LoadStopTypesEnum.PICKUP_TRAILER] : LoadModel_Stop_Type.pickup_trailer,
        [LoadStopTypesEnum.DROPOFF_TRAILER]: LoadModel_Stop_Type.dropoff_trailer
    });

export const LOAD_STATUS_GRPC_ENUM: Record<LoadModel_Status, LoadStatus> = Object.freeze({
    [LoadModel_Status.pending]    : 'pending',
    [LoadModel_Status.assigned]   : 'assigned',
    [LoadModel_Status.in_progress]: 'in_progress',
    [LoadModel_Status.delivered]  : 'delivered',
    [LoadModel_Status.canceled]   : 'canceled',
    [LoadModel_Status.tonu]       : 'tonu',
    [LoadModel_Status.unspecified]: 'canceled',
    [LoadModel_Status.deleted]    : 'deleted'
});

export const LOAD_STATUS_TO_GRPC_ENUM: Record<LoadStatus, LoadModel_Status> = Object.freeze({
    pending    : LoadModel_Status.pending,
    assigned   : LoadModel_Status.assigned,
    in_progress: LoadModel_Status.in_progress,
    delivered  : LoadModel_Status.delivered,
    canceled   : LoadModel_Status.canceled,
    tonu       : LoadModel_Status.tonu,
    deleted    : LoadModel_Status.deleted
});

export const LOAD_INVOICE_STATUS_TO_GRPC_ENUM: Record<LoadInvoiceStatus, LoadModel_InvoiceStatus> =
    Object.freeze({
        detention_requested: LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_DETENTION_REQUESTED,
        not_invoiced       : LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NOT_INVOICED,
        invoiced           : LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_INVOICED,
        paid               : LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_PAID,
        need_review        : LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NEED_REVIEW,
        rejected           : LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_REJECTED
    });

export const LOAD_INVOICE_STATUS_GRPC_ENUM: Record<LoadModel_InvoiceStatus, LoadInvoiceStatus> =
    Object.freeze({
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NOT_INVOICED]       : 'not_invoiced',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_INVOICED]           : 'invoiced',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_PAID]               : 'paid',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NEED_REVIEW]        : 'need_review',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_REJECTED]           : 'rejected',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_DETENTION_REQUESTED]: 'detention_requested',
        [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_UNSPECIFIED]        : 'not_invoiced'
    });
