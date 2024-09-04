import { memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import checkbox_icons from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Fuel/checkbox_icons';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import { useAppDispatch } from '@/store/hooks';
import grpcAPI from '@/@grpcServices/api';
import { useTheme } from '@mui/material';

type Props = {
    verified: SettlementsTypes.CycleSettlementDetails.FuelTransaction['verified'];
    fuelTransactionId: SettlementsTypes.CycleSettlementDetails.FuelTransaction['fuelTransactionId'];
};

function VerifiedItem({
    verified,
    fuelTransactionId
}: Props) {
    const [changeVerified] = FuelGrpcService.useChangeVerifiedMutation();
    const dispatch = useAppDispatch();
    const { selectedSettlementParams } = useEditSettlementContext();
    const { palette } = useTheme();

    const change_status = () => {
        changeVerified({
            fuelTransactionId,
            verified: !verified
        }).then(() => {
            dispatch(
                grpcAPI.util.invalidateTags([
                    { type: 'settlement', id: selectedSettlementParams.settlement_id }
                ])
            );

            // invalidateRetrieveSettlement({
            //     cycleId     : selectedSettlementParams.cycle_id,
            //     periodId    : selectedSettlementParams.period_id,
            //     settlementId: selectedSettlementParams.settlement_id
            // });
        });
    };

    return (
        <Checkbox
            checked={verified}
            size="small"
            icon={checkbox_icons.unchecked(palette)}
            checkedIcon={checkbox_icons.checked(palette)}
            sx={{ padding: 0 }}
            onClick={change_status}
        />
    );
}

export default memo(VerifiedItem);
