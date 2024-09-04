import FullDialog from '@/@core/ui-kits/full-dialog';
import { IconButton, Stack, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettlementStatusChipSelect from '@/@core/fields/chip-select/SettlementStatusChipSelect';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SettlementHistory from './edit-settlement-actions/SettlementHistory';
import SwitchMode, { ChangeType } from './edit-settlement-actions/SwitchMode';
import { useEditSettlementContext, useEditSettlementDialog } from '../EditSettlement';
import { useMoreActionsMenu } from '../menus/MoreActions';

const HeaderWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    justifyContent : 'space-between',
    alignItems     : 'center',
    padding        : '10px 16px',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

export default function Header() {
    const dialog = useEditSettlementDialog(true);
    const { t } = useAppTranslation();
    const {
        isDisabledEdit,
        setSelectedSettlementParams,
        settlement,
        selectedSettlementParams
    } =
        useEditSettlementContext();
    const dispatch = useAppDispatch();
    const isProMode = useAppSelector((state) => state.settlements.edit_dialog.is_pro_mode);
    const moreActionsMenu = useMoreActionsMenu();
    const onSwitchMode: ChangeType = (_, checked) => {
        dispatch(SettlementsActions.SetEditDialogProMode(checked));
    };

    return (
        <HeaderWrapper>
            <Stack
                direction="row"
                spacing={3}
                alignItems="center"
            >
                <FullDialog.HeaderTitle
                    title="modals:settlements.edit_settlement.title"
                    translationOptions={{
                        id    : settlement.settlementFriendlyId || '',
                        status: isDisabledEdit ? `(${t('common:read_only')})` : ''
                    }}
                />
                <SettlementStatusChipSelect
                    settlement_status={SETTLEMENT_STATUS_GRPC_ENUM[settlement.status]}
                    settlement_id={selectedSettlementParams.settlement_id}
                    cycle_id={selectedSettlementParams.cycle_id}
                    period_id={selectedSettlementParams.period_id}
                />
                <SettlementHistory
                    selectedSettlementId={settlement.settlementId}
                    driverId={settlement.driverId}
                    setSelectedSettlementParams={setSelectedSettlementParams}
                />
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
            >
                <SwitchMode
                    checked={isProMode}
                    onChange={onSwitchMode}
                    label="modals:settlements.edit_settlement.pro_mode"
                />
                <IconButton
                    onClick={moreActionsMenu.open({
                        settlementId : selectedSettlementParams.settlement_id,
                        onCloseDialog: dialog.forceClose,
                        cycleId      : selectedSettlementParams.cycle_id,
                        periodId     : selectedSettlementParams.period_id
                    })}
                >
                    <MoreVertIcon />
                </IconButton>
            </Stack>
        </HeaderWrapper>
    );
}
