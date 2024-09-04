import { LoadModel_Status } from '@proto/models/model_load';

export const checkLoadForDownloadInvoice = (loadStatus: LoadModel_Status, truckId: string) =>
    [LoadModel_Status.delivered, LoadModel_Status.tonu].includes(loadStatus) && !!truckId;
