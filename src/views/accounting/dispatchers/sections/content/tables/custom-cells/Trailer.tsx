import { Stack, Typography } from '@mui/material';
import Dispatch from '@/store/accounting/dispatchers/types';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    truck: Dispatch.Truck;
};

function Trailer({ truck }: Props) {
    const { t } = useAppTranslation();
    const trailerIcon = getTrailerTypeIcon(truck?.trailer?.type_icon);

    return truck?.trailer ? (
        <Stack
            direction="row"
            gap="4px"
            alignItems="center"
        >
            {trailerIcon}

            <Typography
                variant="body1"
                color="semantic.text.secondary"
                fontSize="12px"
                fontWeight={500}
            >
                #{truck?.trailer?.referenceId}
            </Typography>
        </Stack>
    ) : (
        <Typography
            variant="body1"
            color="semantic.text.secondary"
            fontSize="12px"
            fontWeight={500}
        >
            {t('common:empty.no_trailer')}
        </Typography>
    );
}

export default memo(Trailer);
