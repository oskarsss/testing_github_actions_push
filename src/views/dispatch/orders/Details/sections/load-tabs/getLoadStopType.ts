import { LoadStopTypesEnum } from '@/models/loads/load-stop';

export const getLoadStopType = {
    [LoadStopTypesEnum.PICKUP]: {
        color_text : 'success' as const,
        description: 'Shipper'
    },
    [LoadStopTypesEnum.DROPOFF]: {
        color_text : 'error' as const,
        description: 'Receiver'
    },
    [LoadStopTypesEnum.PICKUP_DROPOFF]: {
        color_text : 'warning' as const,
        description: 'Receiver'
    },
    [LoadStopTypesEnum.PICKUP_TRAILER]: {
        color_text : 'purple' as const,
        description: 'Trailer'
    },

    [LoadStopTypesEnum.DROPOFF_TRAILER]: {
        color_text : 'indigo' as const,
        description: 'Trailer'
    },
    [LoadStopTypesEnum.PICKUP_CHASSIS]: {
        color_text : 'violet' as const,
        description: 'Chassis'
    },
    [LoadStopTypesEnum.DROPOFF_CHASSIS]: {
        color_text : 'pink' as const,
        description: 'Chassis'
    }
};
