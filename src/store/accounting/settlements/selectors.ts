/* eslint-disable import/prefer-default-export */
import { RootState } from '@/store/types';

export const editSettlementTabValueSelector = (state: RootState) =>
    state.settlements.edit_dialog.tabValue;

export const editSettlementTransactionsTabValueSelector = (state: RootState) =>
    state.settlements.edit_dialog.transactionsTabValue;
