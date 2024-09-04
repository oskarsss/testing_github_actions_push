import {
    Settlements_Cycle_Period_Settlement_Status,
    Settlements_Cycle_Period_Settlement_Transaction_Type,
    Settlements_RecurringTransaction_Status
} from '@proto/models/model_settlement';
import { SETTLEMENT_STATUS } from '@/models/settlements/settlement-status';
import {
    RecurringTransactionsStatus,
    TRANSACTION_TYPE
} from '@/models/settlements/settlement-transactions';
import {
    SettlementTransactionCategoryModel_EntityType,
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';

const {
    RECURRING_TRANSACTION_STATUS_UNSPECIFIED,
    RECURRING_TRANSACTION_STATUS_ACTIVE,
    RECURRING_TRANSACTION_STATUS_PAUSED,
    RECURRING_TRANSACTION_STATUS_COMPLETED,
    RECURRING_TRANSACTION_STATUS_DELETED,
    RECURRING_TRANSACTION_STATUS_CANCELED

    // RECURRING_TRANSACTION_STATUS_CANCELLED,
} = Settlements_RecurringTransaction_Status;

const {
    SETTLEMENT_STATUS_UNSPECIFIED,
    SETTLEMENT_STATUS_OPEN,
    SETTLEMENT_STATUS_IN_REVIEW,
    SETTLEMENT_STATUS_CLOSED,
    SETTLEMENT_STATUS_VERIFIED,
    SETTLEMENT_STATUS_SENT,
    SETTLEMENT_STATUS_PAID
} = Settlements_Cycle_Period_Settlement_Status;

const {
    TRANSACTION_TYPE_UNSPECIFIED,
    TRANSACTION_TYPE_DEBIT,
    TRANSACTION_TYPE_CREDIT
} =
    Settlements_Cycle_Period_Settlement_Transaction_Type;

export const RECURRING_TRANSACTIONS_GRPC_ENUM: Record<
    Settlements_RecurringTransaction_Status,
    RecurringTransactionsStatus
> = Object.freeze({
    [RECURRING_TRANSACTION_STATUS_UNSPECIFIED]: RecurringTransactionsStatus.ACTIVE,
    [RECURRING_TRANSACTION_STATUS_ACTIVE]     : RecurringTransactionsStatus.ACTIVE,
    [RECURRING_TRANSACTION_STATUS_PAUSED]     : RecurringTransactionsStatus.PAUSED,
    [RECURRING_TRANSACTION_STATUS_COMPLETED]  : RecurringTransactionsStatus.COMPLETED,
    [RECURRING_TRANSACTION_STATUS_DELETED]    : RecurringTransactionsStatus.DELETED,
    [RECURRING_TRANSACTION_STATUS_CANCELED]   : RecurringTransactionsStatus.CANCELED
});

export const SETTLEMENT_STATUS_GRPC_ENUM: Record<
    Settlements_Cycle_Period_Settlement_Status,
    SETTLEMENT_STATUS
> = Object.freeze({
    [SETTLEMENT_STATUS_UNSPECIFIED]: SETTLEMENT_STATUS.OPEN,
    [SETTLEMENT_STATUS_OPEN]       : SETTLEMENT_STATUS.OPEN,
    [SETTLEMENT_STATUS_IN_REVIEW]  : SETTLEMENT_STATUS.IN_REVIEW,
    [SETTLEMENT_STATUS_CLOSED]     : SETTLEMENT_STATUS.CLOSED,
    [SETTLEMENT_STATUS_VERIFIED]   : SETTLEMENT_STATUS.VERIFIED,
    [SETTLEMENT_STATUS_SENT]       : SETTLEMENT_STATUS.SENT,
    [SETTLEMENT_STATUS_PAID]       : SETTLEMENT_STATUS.PAID
});

export const SETTLEMENT_STATUS_TO_GRPC_ENUM: Record<
    SETTLEMENT_STATUS,
    Settlements_Cycle_Period_Settlement_Status
> = Object.freeze({
    [SETTLEMENT_STATUS.IN_REVIEW]: SETTLEMENT_STATUS_IN_REVIEW,
    [SETTLEMENT_STATUS.OPEN]     : SETTLEMENT_STATUS_OPEN,
    [SETTLEMENT_STATUS.CLOSED]   : SETTLEMENT_STATUS_CLOSED,
    [SETTLEMENT_STATUS.VERIFIED] : SETTLEMENT_STATUS_VERIFIED,
    [SETTLEMENT_STATUS.SENT]     : SETTLEMENT_STATUS_SENT,
    [SETTLEMENT_STATUS.PAID]     : SETTLEMENT_STATUS_PAID
});

export const TRANSACTION_TYPE_GRPC_ENUM: Record<
    Settlements_Cycle_Period_Settlement_Transaction_Type,
    TRANSACTION_TYPE
> = Object.freeze({
    [TRANSACTION_TYPE_UNSPECIFIED]: TRANSACTION_TYPE.DEBIT,
    [TRANSACTION_TYPE_DEBIT]      : TRANSACTION_TYPE.DEBIT,
    [TRANSACTION_TYPE_CREDIT]     : TRANSACTION_TYPE.CREDIT
});

export const TRANSACTION_TYPE_TO_GRPC_ENUM: Record<
    TRANSACTION_TYPE,
    Settlements_Cycle_Period_Settlement_Transaction_Type
> = Object.freeze({
    [TRANSACTION_TYPE.DEBIT] : TRANSACTION_TYPE_DEBIT,
    [TRANSACTION_TYPE.CREDIT]: TRANSACTION_TYPE_CREDIT
});

type TransactionCategoryEntity = 'driver' | 'trailer' | 'truck';

export const TRANSACTION_CATEGORY_ENTITY: Record<
    SettlementTransactionCategoryModel_EntityType,
    TransactionCategoryEntity
> = Object.freeze({
    [SettlementTransactionCategoryModel_EntityType.UNKNOWN]: 'driver',
    [SettlementTransactionCategoryModel_EntityType.DRIVER] : 'driver',
    [SettlementTransactionCategoryModel_EntityType.TRUCK]  : 'truck',
    [SettlementTransactionCategoryModel_EntityType.TRAILER]: 'trailer'
});

type RecurringTransactionCyclePeriodFrequency = 'every_period' | 'monthly';

export const RECURRING_TRANSACTION_CYCLE_PERIOD_FREQUENCY: Record<
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    RecurringTransactionCyclePeriodFrequency
> = Object.freeze({
    [SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.UNKNOWN]:
        'every_period',
    [SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.EVERY_PERIOD]:
        'every_period',
    [SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.MONTHLY]: 'monthly'
});

export const TRANSACTION_CATEGORIES_TYPE: Record<
    SettlementTransactionCategoryModel_Type,
    'credit' | 'debit'
> = {
    [SettlementTransactionCategoryModel_Type.CREDIT] : 'credit',
    [SettlementTransactionCategoryModel_Type.DEBIT]  : 'debit',
    [SettlementTransactionCategoryModel_Type.UNKNOWN]: 'debit'
};

export const TRANSACTION_CATEGORIES_TYPE_TO_ENUM: Record<
    'credit' | 'debit',
    SettlementTransactionCategoryModel_Type
> = {
    credit: SettlementTransactionCategoryModel_Type.CREDIT,
    debit : SettlementTransactionCategoryModel_Type.DEBIT
};
