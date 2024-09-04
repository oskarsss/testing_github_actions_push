/* eslint-disable max-len */
import { useAppDispatch } from '@/store/hooks';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import SettlementsTypes from '@/store/accounting/settlements/types';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { SETTLEMENTS_STATUS_ICONS } from '@/@core/theme/entities/settlement/status';
import { SettlementsStatuses, SettlementStatus } from '@/models/settlements/settlement-status';
import { useTheme } from '@mui/material/styles';
import { api } from '@/store/api';
import { PaletteMode } from '@mui/material';
import {
    useSettlementCycleId,
    useSettlementPeriodId
} from '@/store/accounting/settlements/hooks/settlements';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { COLORS, IChipColors } from '@/@core/theme/chip';
import { SETTLEMENT_STATUS_TO_GRPC_ENUM } from '@/models/settlements/settlements-mappings';

export const SETTLEMENT_STATUS: Record<SettlementStatus, IChipColors> = {
    closed   : COLORS.purple,
    open     : COLORS.warning,
    paid     : COLORS.success,
    sent     : COLORS.pink,
    verified : COLORS.success,
    in_review: COLORS.blue_dark
};

export const custom_colors: Record<
    PaletteMode,
    Record<SettlementStatus, ChipSelectTypes.CustomColors>
> = {
    light: {
        verified: {
            background: '#D1FADF',
            color     : '#039855'
        },
        paid: {
            background: '#D1FADF',
            color     : '#039855'
        },
        open: {
            background: '#FEF0C7',
            color     : '#F79009'
        },
        in_review: {
            background: '#D1E0FF',
            color     : '#2970FF'
        },
        closed: {
            background: '#DCD6FF',
            color     : '#433694'
        },
        sent: {
            background: '#FFD6FF',
            color     : '#A500A7'
        }
    },
    dark: {
        verified: {
            background: '#01311b',
            color     : '#D1FADF'
        },
        paid: {
            background: '#00542b',
            color     : '#C6FFE4'
        },
        open: {
            background: '#764404',
            color     : '#FEF0C7'
        },
        in_review: {
            background: '#102550',
            color     : '#D1E0FF'
        },
        closed: {
            background: '#231a5e',
            color     : '#DCD6FF'
        },
        sent: {
            background: '#230523',
            color     : '#e779e9'
        }
    }
};

type Props = {
    settlement_status: SettlementStatus;
    settlement_id: SettlementsTypes.CycleSettlementDetails.Settlement['settlementId'];
    invalidateTags?: ChipSelectTypes.InvalidateTags;
    cycle_id?: SettlementsTypes.Cycles.Cycle['cycleId'];
    period_id?: SettlementsTypes.Cycles.Periods.Period['periodId'];
    onUpdate?: (status: SettlementStatus) => void;
} & ChipSelectTypes.OtherProps;

export default function SettlementStatusChipSelect({
    settlement_status,
    settlement_id,
    cycle_id,
    period_id,
    invalidateTags = [],
    onUpdate,
    ...other_props
}: Props) {
    const selected_cycle_id = useSettlementCycleId();
    const selected_period_id = useSettlementPeriodId();
    const { mode } = useTheme().palette;
    const dispatch = useAppDispatch();

    const [updateSettlementStatus] = SettlementsGrpcService.useUpdateSettlementStatusMutation();

    const onChange: ChipSelectTypes.OnChange<SettlementStatus> = (status) => {
        updateSettlementStatus({
            cycleId     : cycle_id || selected_cycle_id,
            periodId    : period_id || selected_period_id,
            settlementId: settlement_id,
            status      : SETTLEMENT_STATUS_TO_GRPC_ENUM[status]
        })
            .unwrap()
            .then(() => {
                onUpdate?.(status);
                if (invalidateTags?.length > 0) {
                    dispatch(api.util.invalidateTags(invalidateTags));
                }
            });
    };

    return (
        <ChipSelect<SettlementStatus>
            status={settlement_status}
            onChange={onChange}
            options={Object.values(SettlementsStatuses)}
            status_prefix="state_info:settlements.status"
            custom_icons={SETTLEMENTS_STATUS_ICONS}
            custom_colors_without_theme={custom_colors[mode]}
            {...other_props}
        />
    );
}
