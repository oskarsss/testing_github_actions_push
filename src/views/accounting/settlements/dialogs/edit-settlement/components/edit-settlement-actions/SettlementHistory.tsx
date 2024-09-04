import { Button } from '@mui/material';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import { useSelectStatementMenu } from '../../menus/DriverSettlementHistory';
import EditSettlementIcons from '../../edit-settlement-icons';
import { EditSettlementContextProps } from '../../EditSettlement';

type Props = {
    selectedSettlementId: string;
    driverId: string;
    setSelectedSettlementParams: EditSettlementContextProps['setSelectedSettlementParams'];
};

export default function SettlementHistory({
    setSelectedSettlementParams,
    selectedSettlementId,
    driverId
}: Props) {
    const settlementHistoryMenu = useSelectStatementMenu();
    const { t } = useAppTranslation();

    const getSettlementsState = SettlementsGrpcService.useGetSettlementsQuery({
        driverId
    });

    const openMenu = settlementHistoryMenu.open({
        onSelect: (settlement_id: string, period_id: string, cycle_id: string) => {
            setSelectedSettlementParams({
                settlement_id,
                period_id,
                cycle_id
            });
            settlementHistoryMenu.close();
        },
        selectedSettlementId,
        driverId
    });

    return (
        <Button
            variant="text"
            startIcon={<EditSettlementIcons.DriverSettlementHistory />}
            disabled={!getSettlementsState.data?.settlements?.length}
            onClick={openMenu}
        >
            {t('modals:settlements.edit_settlement.actions.driver_settlement_history.label')}
        </Button>
    );
}
