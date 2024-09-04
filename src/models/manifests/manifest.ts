export const ManifestStatuses = {
    ASSIGNED   : 'assigned',
    DELIVERED  : 'completed',
    CANCELED   : 'canceled',
    IN_PROGRESS: 'moving',
    PLANNING   : 'planning',
    DELETED    : 'deleted',
    TONNU      : 'tonnu'
} as const;

export type ManifestStatus = (typeof ManifestStatuses)[keyof typeof ManifestStatuses];

export const ManifestFilterStatuses = Object.freeze({
    STATUS_ASSIGNED   : 'STATUS_ASSIGNED',
    STATUS_PLANNING   : 'STATUS_PLANNING',
    STATUS_IN_PROGRESS: 'STATUS_IN_PROGRESS',
    STATUS_DELIVERED  : 'STATUS_DELIVERED',
    STATUS_CANCELED   : 'STATUS_CANCELED',
    STATUS_DELETED    : 'STATUS_DELETED',
    STATUS_UNSPECIFIED: 'STATUS_UNSPECIFIED',
    STATUS_TONNU      : 'STATUS_TONNU'
});

export type ManifestFilterStatus =
    (typeof ManifestFilterStatuses)[keyof typeof ManifestFilterStatuses];
