import TableTypes from '@/@core/components/table/types';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    row: TableTypes.Row<SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow>;
};

function Truck({ row }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexGrow={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            padding="7px"
        >
            {row.truck?.type ? (
                TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truck.type]]
            ) : (
                <DangerousOutlinedIcon color="disabled" />
            )}

            <Typography
                fontSize="14px"
                variant="body2"
                fontWeight={500}
            >
                {row.truck?.referenceId ? (
                    <>
                        {row.truck.referenceId} /{' '}
                        {t(
                            `state_info:trucks.type.${
                                TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truck.type]
                            }`
                        )}
                    </>
                ) : (
                    t('common:empty.no_truck')
                )}
            </Typography>
        </Stack>
    );
}

export default memo(Truck);
