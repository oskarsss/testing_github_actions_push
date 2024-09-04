import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { MenuItem, MenuList } from '@mui/material';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import {
    useSettlementCycleId,
    useSettlementPeriodId,
    useSettlementsViews
} from '@/store/accounting/settlements/hooks/settlements';
import { useSelectedTableIds } from '@/store/table/hooks';
import { SETTLEMENT_STATUS_TO_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { SETTLEMENT_STATUS } from '@/models/settlements/settlement-status';
import EditSettlementConfig from '../../dialogs/edit-settlement/options';

export const useChangeStatusMenu = menuHookFabric(ChangeStatusMenu);

function ChangeStatusMenu() {
    const { tableName } = useSettlementsViews();
    const totalSelectedSettlements = useSelectedTableIds(tableName);
    const cycleId = useSettlementCycleId();
    const periodId = useSettlementPeriodId();

    const { t } = useAppTranslation();
    const [trigger] = SettlementsGrpcService.useBatchUpdateStatusMutation();

    const onClick = (value: SETTLEMENT_STATUS) => {
        trigger({
            settlements: totalSelectedSettlements.map((id) => ({
                cycleId,
                periodId,
                settlementId: id
            })),
            status: SETTLEMENT_STATUS_TO_GRPC_ENUM[value]
        });
    };
    return (
        <MenuList disablePadding>
            {EditSettlementConfig.statuses_options(t).map((status) => (
                <MenuItem
                    onClick={() => onClick(status.value)}
                    sx={{
                        padding: 3,
                        width  : 200
                    }}
                    key={status.value}
                    value={status.value}
                >
                    {status.label()}
                </MenuItem>
            ))}
        </MenuList>
    );
}
