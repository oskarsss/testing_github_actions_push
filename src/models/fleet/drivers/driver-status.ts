export const DriverStatuses = Object.freeze({
    ONBOARDING        : 'onboarding',
    COMPLIANCE_REVIEW : 'compliance_review',
    ACTIVE            : 'active',
    PENDING_TERMINATED: 'pending_termination',
    TERMINATED        : 'terminated',
    DELETED           : 'deleted'
});

export type DriverStatus = (typeof DriverStatuses)[keyof typeof DriverStatuses];
