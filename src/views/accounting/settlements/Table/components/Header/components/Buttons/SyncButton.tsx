import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { StatusChipStyled } from '@/@core/theme/chip';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { SETTLEMENTS_STATUS_ICONS } from '@/@core/theme/entities/settlement/status';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import {
    useSettlementCycleId,
    useSettlementPeriodId
} from '@/store/accounting/settlements/hooks/settlements';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { PERIOD_STATUS_ENUM } from '@/models/settlements/settlement-period-status';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import HeaderButton from './HeaderButton';

const SyncConfirmBody = () => {
    const { t } = useAppTranslation();
    return (
        <Typography
            component="span"
            variant="body2"
            style={{
                display   : 'flex',
                alignItems: 'center'
            }}
        >
            {t('settlements:header.confirm.sync.body')} -&nbsp;
            <Box
                sx={{
                    display     : 'inline-flex',
                    overflow    : 'hidden',
                    alignItems  : 'center',
                    padding     : '3px',
                    borderRadius: '4px',
                    fontSize    : '12px',
                    fontWeight  : 500

                    // ...CHIP_COLORS[SETTLEMENT_STATUS.open]
                }}
            >
                {SETTLEMENTS_STATUS_ICONS.open}
                {t('state_info:settlements.status.open')}
            </Box>
            &nbsp; & &nbsp;
            <Box
                sx={{
                    display     : 'inline-flex',
                    overflow    : 'hidden',
                    alignItems  : 'center',
                    padding     : '3px',
                    borderRadius: '4px',
                    fontSize    : '12px',
                    fontWeight  : 500

                    // ...CHIP_COLORS[SETTLEMENT_STATUS.in_review]
                }}
            >
                {SETTLEMENTS_STATUS_ICONS.in_review}
                {t('state_info:settlements.status.in_review')}
            </Box>
        </Typography>
    );
};

const SyncConfirmTitle = ({
    selectedPeriodStatus
}: {
    selectedPeriodStatus?: Settlements_Cycle_Period_Status;
}) => {
    const { t } = useAppTranslation();
    return (
        <Typography
            component="span"
            variant="body1"
            whiteSpace="nowrap"
            style={{
                display : 'inline-flex',
                overflow: 'hidden'
            }}
        >
            {t('settlements:header.confirm.sync.title')}
            <StatusChipStyled
                sx={{
                    width        : 'min-content',
                    margin       : '0 5px',
                    textTransform: 'capitalize'
                }}
                color="error"
            >
                {selectedPeriodStatus
                    ? t(
                        `state_info:settlements.period.status.${PERIOD_STATUS_ENUM[selectedPeriodStatus]}`
                    ).toLowerCase()
                    : ''}
            </StatusChipStyled>
            {t('settlements:labels.period').toLowerCase()}?
        </Typography>
    );
};

export default function SyncButton() {
    const period_id = useSettlementPeriodId();
    const cycle_id = useSettlementCycleId();
    const periods = SettlementCyclePeriodsGrpcService.useGetPeriodsQuery(
        { cycleId: cycle_id },
        { skip: !cycle_id }
    );
    const [syncPeriod] = SettlementsGrpcService.useSyncPeriodMutation();
    const confirm = useConfirm();

    const selectedPeriodStatus = useMemo(
        () => periods.data?.periods.find((period) => period.periodId === period_id)?.status,
        [periods.data?.periods, period_id]
    );

    const syncHandler = () => {
        syncPeriod({
            cycleId : cycle_id,
            periodId: period_id
        });
    };

    const refresh = () => {
        if (selectedPeriodStatus === Settlements_Cycle_Period_Status.OPEN) {
            syncHandler();
        } else {
            confirm({
                body        : <SyncConfirmBody />,
                title       : <SyncConfirmTitle selectedPeriodStatus={selectedPeriodStatus} />,
                confirm_text: 'common:button.sync',
                onConfirm   : syncHandler
            });
        }
    };

    return (

    // <Tooltip
    //     placement="top"
    //     PopperProps={{
    //         sx: {
    //             '& .MuiTooltip-tooltip': {
    //                 padding        : '10px',
    //                 borderRadius   : '6px',
    //                 color          : (theme) => theme.palette.semantic.text.primary,
    //                 backgroundColor: (theme) => theme.palette.semantic.background.white,
    //                 boxShadow      : '0px 2px 10px 0px rgba(58, 53, 65, 0.1)'
    //             }
    //         }
    //     }}
    //     title={
    //         selectedPeriodStatus === 'closed' ? (
    //             <Stack
    //                 direction="row"
    //                 alignItems="center"
    //             >

        //                 Are you sure you want to SYNC
        //                 <StatusChipStyled
        // sx={{
        //     width : 'min-content',
        //     margin: '0 5px'
        // }}
        // color="red"
        //                 >
        //                     {selectedPeriodStatus}
        //                 </StatusChipStyled>
        //                 period? It will only sync - Open & In Review
        //             </Stack>
        //         ) : (
        //             ''
        //         )
        //     }
        // >
        //     <span>
        <HeaderButton
            title="common:button.sync"
            onClick={refresh}
            startIcon={<RefreshIcon />}
            disabled={!selectedPeriodStatus}
        />

    //     </span>
    // </Tooltip>
    );
}
