/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import { MouseEvent } from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PropsForAction } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import SettlementTransactionsGrpcService from '@/@grpcServices/services/settlements-service/settlement-transactions.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditDialogTable from '../../../ui-elements/edit-settlement-table/EditSettlementTable';
import columns from './transaction_pro_columns';
import EditSettlement from '../../../styled';
import EditSettlementIcons from '../../../edit-settlement-icons';
import { useCreateTransactionDialog } from './dialogs/AddTransactionDialog';
import { useEditTransactionDialog } from './dialogs/EditTransactionDialog';
import { useEditSettlementContext } from '../../../EditSettlement';

type Props = {
    setMinHeight?: boolean;
};

export default function TransactionsTablePro({ setMinHeight = false }: Props) {
    const { t } = useAppTranslation('modals');
    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const editTransactionMenu = useEditTransactionDialog();
    const createTransactionMenu = useCreateTransactionDialog();

    const [unassignTransaction] =
        SettlementTransactionsGrpcService.useSettlementTransactionUnassignMutation();

    const addTransaction = (event: MouseEvent<HTMLButtonElement>, type: 'credit' | 'debit') => {
        createTransactionMenu.open({
            settlement_id: settlement.settlementId,
            type,
            cycle_id     : selectedSettlementParams.cycle_id,
            period_id    : selectedSettlementParams.period_id
        });
    };

    const addDebit = (event: MouseEvent<HTMLButtonElement>) => addTransaction(event, 'debit');
    const addCredit = (event: MouseEvent<HTMLButtonElement>) => addTransaction(event, 'credit');

    const executeAction = (
        name: string,
        props: PropsForAction<SettlementsTypes.CycleSettlementDetails.Transaction>
    ) => {
        switch (name) {
        case 'edit':
            editTransactionMenu.open({
                settlement_id: settlement.settlementId,
                item         : props.row,
                cycle_id     : selectedSettlementParams.cycle_id,
                period_id    : selectedSettlementParams.period_id
            });

            break;
        case 'unassign':
            unassignTransaction({
                cycleId      : selectedSettlementParams.cycle_id,
                periodId     : selectedSettlementParams.period_id,
                settlementId : settlement.settlementId,
                transactionId: props.row.transactionId
            });
            break;
        default:
            break;
        }
    };

    return (
        <Stack
            direction="column"
            spacing={1}
            flex={!setMinHeight ? '1 1 0' : '1 1 200px'}
        >
            <EditSettlement.SectionHeader
                Icon={<EditSettlementIcons.Section.Transactions />}
                title="modals:settlements.edit_settlement.tabs.transactions.header.title"
            >
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="text"
                        startIcon={(
                            <EditSettlementIcons.Overview.Credits
                                disabled={isDisabledEdit}
                                isSelected={false}
                            />
                        )}
                        onClick={addCredit}
                        size="small"
                        disabled={isDisabledEdit}
                        sx={{
                            textTransform: 'uppercase',
                            color        : '#039855'
                        }}
                    >
                        {t(
                            'settlements.edit_settlement.tabs.transactions.header.buttons.add_credit'
                        )}
                    </Button>

                    <Button
                        variant="text"
                        disabled={isDisabledEdit}
                        startIcon={(
                            <EditSettlementIcons.Overview.Debits
                                disabled={isDisabledEdit}
                                isSelected={false}
                            />
                        )}
                        onClick={addDebit}
                        size="small"
                        sx={{
                            textTransform: 'uppercase',
                            color        : '#D92D20',
                            fontSize     : '12px',
                            lineHeight   : '18px',
                            fontWeight   : 600
                        }}
                    >
                        {t(
                            'settlements.edit_settlement.tabs.transactions.header.buttons.add_debit'
                        )}
                    </Button>
                </Stack>
            </EditSettlement.SectionHeader>

            <EditDialogTable
                sectionName="transactionsInfo"
                columnsConfig={columns}
                executeAction={executeAction}
                turnOffAssignInfo
            />
        </Stack>
    );
}
