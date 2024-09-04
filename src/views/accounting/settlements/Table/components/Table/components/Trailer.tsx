import TableTypes from '@/@core/components/table/types';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    row: TableTypes.Row<SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow>;
};

const NoTrailer = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
    >
        <path
            d="M5.5 1.44338C7.04701 0.550212 8.95299 0.550212 10.5 1.44338L13.2942 3.05662C14.8412 3.94979 15.7942 5.60042 15.7942 7.38675V10.6132C15.7942 12.3996 14.8412 14.0502 13.2942 14.9434L10.5 16.5566C8.95299 17.4498 7.04701 17.4498 5.5 16.5566L2.70577 14.9434C1.15877 14.0502 0.205771 12.3996 0.205771 10.6132V7.38675C0.205771 5.60042 1.15877 3.94979 2.70577 3.05662L5.5 1.44338Z"
            fill="#D0D5DD"
        />
    </svg>
);

function Trailer({ row }: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            flexGrow={1}
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{
                borderRadius: '6px'
            }}
        >
            {row.trailerType ? getTrailerTypeIcon(row.trailerType?.icon) : NoTrailer}
            <Typography
                fontSize="14px"
                variant="body1"
                fontWeight={500}
            >
                {row.trailer?.referenceId || t('common:empty.no_trailer')}
            </Typography>
        </Stack>
    );
}

export default memo(Trailer);
