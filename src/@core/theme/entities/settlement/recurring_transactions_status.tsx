/* eslint-disable max-len */
import { COLORS, type IChipColors } from '@/@core/theme/chip';
import type { IconProps } from '@/@core/theme/entities/load/invoice_status';
import { Settlements_RecurringTransaction_Status } from '@proto/models/model_settlement';
import { useTheme } from '@mui/material';

export const RECURRING_TRANSACTION_STATUS_COLORS: Record<string, IChipColors> = {
    active   : COLORS.success,
    paused   : COLORS.gray,
    completed: COLORS.blue_dark,
    canceled : COLORS.indigo,
    deleted  : COLORS.error
};

const Active = ({ size = 16 }: IconProps) => {
    const { palette } = useTheme();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="8"
                cy="8"
                r="7"
                fill={palette.utility.foreground.success.primary}
                fillOpacity="0.3"
            />
            <circle
                cx="8"
                cy="8"
                r="3"
                fill={palette.utility.foreground.success.primary}
            />
        </svg>
    );
};

const Paused = ({ size = 16 }: IconProps) => {
    const { palette } = useTheme();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.3335 7.99992C1.3335 4.31802 4.31826 1.33325 8.00016 1.33325C11.6821 1.33325 14.6668 4.31802 14.6668 7.99992C14.6668 11.6818 11.6821 14.6666 8.00016 14.6666C4.31826 14.6666 1.3335 11.6818 1.3335 7.99992ZM7.00016 5.99992C7.00016 5.63173 6.70169 5.33325 6.3335 5.33325C5.96531 5.33325 5.66683 5.63173 5.66683 5.99992V9.99992C5.66683 10.3681 5.96531 10.6666 6.3335 10.6666C6.70169 10.6666 7.00016 10.3681 7.00016 9.99992V5.99992ZM10.3335 5.99992C10.3335 5.63173 10.035 5.33325 9.66683 5.33325C9.29864 5.33325 9.00016 5.63173 9.00016 5.99992V9.99992C9.00016 10.3681 9.29864 10.6666 9.66683 10.6666C10.035 10.6666 10.3335 10.3681 10.3335 9.99992V5.99992Z"
                fill={palette.utility.foreground.gray.primary}
            />
        </svg>
    );
};

const Completed = ({ size = 16 }: IconProps) => {
    const { palette } = useTheme();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666ZM11.1567 6.45211C11.4064 6.18156 11.3896 5.75979 11.119 5.51005C10.8485 5.26032 10.4267 5.27719 10.177 5.54774L6.97453 9.01704L5.82337 7.76996C5.57363 7.49941 5.15186 7.48254 4.88131 7.73228C4.61077 7.98201 4.59389 8.40378 4.84363 8.67433L6.48466 10.4521C6.61086 10.5888 6.78846 10.6666 6.97452 10.6666C7.16059 10.6666 7.33819 10.5888 7.46439 10.4521L11.1567 6.45211Z"
                fill={palette.utility.foreground.blue_dark.primary}
            />
        </svg>
    );
};

const Canceled = ({ size = 16 }: IconProps) => {
    const { palette } = useTheme();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00001 14.6666C11.6819 14.6666 14.6667 11.6818 14.6667 7.99992C14.6667 4.31802 11.6819 1.33325 8.00001 1.33325C4.31811 1.33325 1.33334 4.31802 1.33334 7.99992C1.33334 11.6818 4.31811 14.6666 8.00001 14.6666ZM6.47141 5.52851C6.21107 5.26816 5.78896 5.26816 5.52861 5.52851C5.26826 5.78886 5.26826 6.21097 5.52861 6.47132L7.0572 7.99992L5.52861 9.52851C5.26826 9.78886 5.26826 10.211 5.52861 10.4713C5.78896 10.7317 6.21107 10.7317 6.47141 10.4713L8.00001 8.94273L9.52861 10.4713C9.78896 10.7317 10.2111 10.7317 10.4714 10.4713C10.7318 10.211 10.7318 9.78886 10.4714 9.52851L8.94282 7.99992L10.4714 6.47132C10.7318 6.21097 10.7318 5.78886 10.4714 5.52851C10.2111 5.26816 9.78896 5.26816 9.52861 5.52851L8.00001 7.05711L6.47141 5.52851Z"
                fill={palette.utility.foreground.error.primary}
            />
        </svg>
    );
};

const Deleted = ({ size = 16 }: IconProps) => {
    const { palette } = useTheme();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.44091 1.3331C6.98526 1.33242 6.58534 1.33182 6.229 1.47197C5.91741 1.59452 5.64157 1.79333 5.42678 2.05018C5.18114 2.34392 5.05524 2.7235 4.9118 3.15598L4.85283 3.3332H2.66667C2.29848 3.3332 2 3.63167 2 3.99986C2 4.36805 2.29848 4.66653 2.66667 4.66653H3.3763L3.87036 12.0774C3.89232 12.4071 3.91135 12.6926 3.94586 12.9276C3.9824 13.1765 4.0428 13.4222 4.17629 13.6565C4.37636 14.0077 4.67814 14.2901 5.04186 14.4663C5.28453 14.5839 5.53368 14.6278 5.78446 14.6478C6.02124 14.6666 6.3074 14.6665 6.63783 14.6665H9.36216C9.69259 14.6665 9.97876 14.6666 10.2155 14.6478C10.4663 14.6278 10.7155 14.5839 10.9581 14.4663C11.3219 14.2901 11.6236 14.0077 11.8237 13.6565C11.9572 13.4222 12.0176 13.1765 12.0541 12.9276C12.0887 12.6926 12.1077 12.4071 12.1296 12.0774L12.6237 4.66653H13.3333C13.7015 4.66653 14 4.36805 14 3.99986C14 3.63167 13.7015 3.3332 13.3333 3.3332H11.1472L11.0882 3.15597C10.9448 2.7235 10.8189 2.34392 10.5732 2.05018C10.3584 1.79333 10.0826 1.59452 9.771 1.47197C9.41466 1.33182 9.01474 1.33242 8.55909 1.3331H7.44091ZM6.26042 3.3332H9.73958C9.63718 3.0404 9.59739 2.96172 9.5504 2.90552C9.4788 2.81991 9.38686 2.75364 9.28299 2.71279C9.19386 2.67773 9.07218 2.66653 8.46238 2.66653H7.53762C6.92782 2.66653 6.80614 2.67773 6.71701 2.71279C6.61314 2.75364 6.5212 2.81991 6.4496 2.90552C6.40261 2.96172 6.36282 3.0404 6.26042 3.3332ZM7.33333 6.66667C7.33333 6.29848 7.03486 6 6.66667 6C6.29848 6 6 6.29848 6 6.66667V11.3333C6 11.7015 6.29848 12 6.66667 12C7.03486 12 7.33333 11.7015 7.33333 11.3333V6.66667ZM10 6.66667C10 6.29848 9.70152 6 9.33333 6C8.96514 6 8.66667 6.29848 8.66667 6.66667V11.3333C8.66667 11.7015 8.96514 12 9.33333 12C9.70152 12 10 11.7015 10 11.3333V6.66667Z"
                fill={palette.utility.foreground.gray.primary}
            />
        </svg>
    );
};

export const recurring_transaction_status_icon = (size: number | undefined) => ({
    active   : <Active size={size} />,
    paused   : <Paused size={size} />,
    completed: <Completed size={size} />,
    canceled : <Canceled size={size} />,
    deleted  : <Deleted size={size} />
});

export const RECURRING_TRANSACTION_STATUS_ENUM_COLORS: Record<
    Settlements_RecurringTransaction_Status,
    IChipColors
> = {
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_ACTIVE]: COLORS.success,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_PAUSED]: COLORS.gray,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_COMPLETED]:
        COLORS.blue_dark,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_CANCELED]   : COLORS.error,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_DELETED]    : COLORS.indigo,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_UNSPECIFIED]: COLORS.error
};

export const RECURRING_TRANSACTION_STATUS_ENUM_ICONS: Record<
    Settlements_RecurringTransaction_Status,
    JSX.Element
> = {
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_ACTIVE]     : <Active />,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_PAUSED]     : <Paused />,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_COMPLETED]  : <Completed />,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_CANCELED]   : <Canceled />,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_DELETED]    : <Deleted />,
    [Settlements_RecurringTransaction_Status.RECURRING_TRANSACTION_STATUS_UNSPECIFIED]: <Deleted />
};
