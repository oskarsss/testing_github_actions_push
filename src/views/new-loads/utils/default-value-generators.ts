import DraftsTypes from '@/store/drafts/types';
import { uuidv4 } from '@/utils/uuidv4';
import { LoadDraftFields_Stop } from '@proto/load_drafts';
import { LOAD_STOP_TYPE_TO_GRPC_ENUM } from '@/models/loads/load-mappings';

export const generateInvoiceItem = (defaultCategoryId?: string): DraftsTypes.InvoiceItem => ({
    invoiceItemId: uuidv4(),
    categoryId   : defaultCategoryId || '1',
    amountPerUnit: 0,
    units        : 1
});

export const generateStopItem = (
    type: 'pickup' | 'dropoff',
    sequence: number
): DraftsTypes.Stop => ({
    ...LoadDraftFields_Stop.create(),
    stopId          : uuidv4(),
    type            : LOAD_STOP_TYPE_TO_GRPC_ENUM[type],
    fixedAppointment: true,
    sequence
});
