export const TrailerOwnershipTypes = Object.freeze({
    OWNED         : 'owned',
    LEASED        : 'leased',
    OWNER_OPERATOR: 'owner_operator'
});

export type TrailerOwnershipType =
    (typeof TrailerOwnershipTypes)[keyof typeof TrailerOwnershipTypes];
