export const TruckStatuses = Object.freeze({
    ONBOARDING        : 'onboarding',
    COMPLIANCE_REVIEW : 'compliance_review',
    ACTIVE            : 'active',
    INACTIVE          : 'inactive',
    PENDING_TERMINATED: 'pending_termination',
    TERMINATED        : 'terminated',
    DELETED           : 'deleted'
});

export type TruckStatus = (typeof TruckStatuses)[keyof typeof TruckStatuses];
