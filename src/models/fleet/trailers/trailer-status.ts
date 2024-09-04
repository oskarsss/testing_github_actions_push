export const TrailerStatuses = Object.freeze({
    ACTIVE : 'active',
    OFFLINE: 'offline',
    DELETED: 'deleted'
});

export type TrailerStatus = (typeof TrailerStatuses)[keyof typeof TrailerStatuses];
