namespace ReminderConfig {
    export const Statuses = Object.freeze({
        ACTIVE                                      : 1,
        FREE_TRIAL_ACTIVE                           : 4,
        FREE_TRIAL_ENDED_MUST_SUBSCRIBE_DONT_SUSPEND: 5,
        FREE_TRIAL_ENDED_MUST_SUBSCRIBE_SUSPEND     : 6,
        MUST_FIX_PAYMENT_METHOD_DONT_SUSPEND        : 2,
        MUST_FIX_PAYMENT_METHOD_SUSPEND             : 3
    });

    export type StatusesType = keyof typeof Statuses;
}

export default ReminderConfig;
