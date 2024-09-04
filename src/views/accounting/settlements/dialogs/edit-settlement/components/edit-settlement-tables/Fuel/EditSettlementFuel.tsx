import { Button, Stack } from '@mui/material';
import SettlementsTypes from '@/store/accounting/settlements/types';
import AddIcon from '@mui/icons-material/Add';
import { useCreateFuelTransactionDialog } from '@/views/accounting/fuel/Table/dialogs/CreateFuelTransaction/CreateFuelTransaction';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditFuelTransactionDialog } from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/EditFuelTransaction';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import EditDialogTable from '../../../ui-elements/edit-settlement-table/EditSettlementTable';
import columns from './columns';
import EditSettlementIcons from '../../../edit-settlement-icons';
import EditSettlement from '../../../styled';
import SwitchMode, { ChangeType } from '../../edit-settlement-actions/SwitchMode';
import { useFuelDiscountsDialog } from './dialogs/FuelDiscountsDialog';
import { useEditSettlementContext } from '../../../EditSettlement';
import { useDriverFuelDeductDialog } from './dialogs/DriverFuelDeductDialog';

type Props = {
    setMinHeight?: boolean;
};

export default function EditSettlementFuel({ setMinHeight = false }: Props) {
    const { t } = useAppTranslation();
    const {
        settlement,
        refetch,
        isDisabledEdit,
        selectedSettlementParams
    } =
        useEditSettlementContext();

    const fuelDiscountsDialog = useFuelDiscountsDialog();
    const driverFuelDeductDialog = useDriverFuelDeductDialog();
    const editFuelTransactionDialog = useEditFuelTransactionDialog();

    const createFuelTransaction = useCreateFuelTransactionDialog();
    const [syncSettlement] = SettlementsGrpcService.useLazySyncSettlementTurnOffToastQuery();

    const onSyncSettlement = () => {
        if (isDisabledEdit) return;
        syncSettlement({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId
        });
    };

    const onChangeFuelDiscount: ChangeType = (_, checked) => {
        fuelDiscountsDialog.open({
            checked,
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: selectedSettlementParams.settlement_id,
            refetch
        });
    };

    const onChangeDriverFuelDeduct: ChangeType = (_, checked) => {
        driverFuelDeductDialog.open({
            checked,
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: selectedSettlementParams.settlement_id,
            refetch
        });
    };

    const executeAction = (
        name: string,
        props: { row: SettlementsTypes.CycleSettlementDetails.FuelTransaction }
    ) => {
        switch (name) {
        case 'edit':
            editFuelTransactionDialog.open({
                fuelTransactionId: props.row.fuelTransactionId,
                onSuccessfulEdit : onSyncSettlement
            });
            break;
        default:
            break;
        }
    };

    const addFuelTransaction = () => {
        createFuelTransaction.open({
            truck_id       : settlement.truckId,
            onSuccessfulAdd: refetch
        });
    };

    return (
        <Stack
            direction="column"
            spacing={1}
            flex={!setMinHeight ? '1 1 0' : '1 1 200px'}
            gap={1}
        >
            <EditSettlement.SectionHeader
                Icon={<EditSettlementIcons.Section.Fuel />}
                title="modals:settlements.edit_settlement.tabs.fuel.header.title"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    width="fit-content"
                    spacing={2}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={5}
                    >
                        <SwitchMode
                            checked={settlement.fuelDiscountsEnabled}
                            onChange={onChangeFuelDiscount}
                            label="modals:settlements.edit_settlement.tabs.fuel.header.switch.discount"
                            disabled={isDisabledEdit}
                        />
                        <SwitchMode
                            checked={settlement.driverPayDeductFuel}
                            onChange={onChangeDriverFuelDeduct}
                            label="common:deduct"
                            disabled={isDisabledEdit}
                        />
                    </Stack>
                    <Button
                        onClick={addFuelTransaction}
                        startIcon={<AddIcon />}
                        disabled={isDisabledEdit}
                    >
                        {t('common:button.add')}
                    </Button>
                </Stack>
            </EditSettlement.SectionHeader>
            <EditDialogTable
                sectionName="fuelInfo"
                columnsConfig={columns}
                executeAction={executeAction}
            />
        </Stack>
    );
}
