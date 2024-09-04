import { Button, Stack } from '@mui/material';
import SettlementsTypes from '@/store/accounting/settlements/types';
import AddIcon from '@mui/icons-material/Add';
import { useCreateTollTransactionDialog } from '@/views/accounting/tolls/dialogs/CreateTollTransaction';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditTollTransactionDialog } from '@/views/accounting/tolls/dialogs/EditTollTransaction/EditTollTransactionDialog';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import EditDialogTable from '../../../ui-elements/edit-settlement-table/EditSettlementTable';
import columns from './columns';
import EditSettlementIcons from '../../../edit-settlement-icons';
import EditSettlement from '../../../styled';
import { useEditSettlementContext } from '../../../EditSettlement';
import SwitchMode, { ChangeType } from '../../edit-settlement-actions/SwitchMode';
import { useDriverTollsDeductDialog } from './dialogs/DriverTollslDeductDialog';

type Props = {
    setMaxHeight?: boolean;
};

export default function EditSettlementTolls({ setMaxHeight = false }: Props) {
    const { t } = useAppTranslation();
    const {
        settlement,
        selectedSettlementParams,
        refetch,
        isDisabledEdit
    } =
        useEditSettlementContext();

    const driverTollsDeductDialog = useDriverTollsDeductDialog();
    const createTollTransactionDialog = useCreateTollTransactionDialog();
    const editTollTransactionDialog = useEditTollTransactionDialog();

    const [syncSettlement] = SettlementsGrpcService.useLazySyncSettlementTurnOffToastQuery();

    const onSyncSettlement = () => {
        if (isDisabledEdit) return;
        syncSettlement({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId
        });
    };

    const onChangeDriverTollsDeduct: ChangeType = (_, checked) => {
        driverTollsDeductDialog.open({
            checked,
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: selectedSettlementParams.settlement_id,
            refetch
        });
    };

    const executeAction = (
        name: string,
        props: { row: SettlementsTypes.CycleSettlementDetails.TollsTransaction }
    ) => {
        switch (name) {
        case 'edit':
            editTollTransactionDialog.open({
                tollId          : props.row.tollTransactionId,
                onSuccessfulEdit: onSyncSettlement
            });
            break;
        default:
            break;
        }
    };

    const addTollTransaction = () => {
        createTollTransactionDialog.open({
            truckId           : settlement.truckId,
            onSuccessfulCreate: refetch
        });
    };

    return (
        <Stack
            direction="column"
            spacing={1}
            flex={!setMaxHeight ? '1 1 0' : '1 1 200px'}
            gap={1}
        >
            <EditSettlement.SectionHeader
                Icon={<EditSettlementIcons.Section.Toll />}
                title="modals:settlements.edit_settlement.tabs.tolls.header.title"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <SwitchMode
                        checked={settlement.driverPayDeductTolls}
                        onChange={onChangeDriverTollsDeduct}
                        label="common:deduct"
                        disabled={isDisabledEdit}
                    />
                    <Button
                        onClick={addTollTransaction}
                        startIcon={<AddIcon />}
                        disabled={isDisabledEdit}
                    >
                        {t('common:button.add')}
                    </Button>
                </Stack>
            </EditSettlement.SectionHeader>

            <EditDialogTable
                sectionName="tollsInfo"
                columnsConfig={columns}
                executeAction={executeAction}
            />
        </Stack>
    );
}
