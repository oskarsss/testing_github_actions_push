export const UserStatuses = Object.freeze({
    INVITED : 'invited',
    ACTIVE  : 'active',
    DISABLED: 'disabled',
    DELETED : 'deleted'
});

export type UserStatus = (typeof UserStatuses)[keyof typeof UserStatuses];

export const UserInviteStatuses = Object.freeze({
    ACTIVE  : 'active',
    ACCEPTED: 'accepted',
    DELETED : 'deleted'
});

export type UserInviteStatus = (typeof UserInviteStatuses)[keyof typeof UserInviteStatuses];
