export const serviceLogsTypes = Object.freeze({
    PLANNED  : 'planned',
    UNPLANNED: 'unplanned',
    EMERGENCY: 'emergency'
});

export type ServiceLogsType = (typeof serviceLogsTypes)[keyof typeof serviceLogsTypes];
