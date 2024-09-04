import Box from '@mui/material/Box';
import { StatusChip } from '@/@core/theme/chip';
import { TRAILER_STATUS_COLORS } from '@/@core/theme/entities/trailer/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRAILER_STATUS_GRPC } from '@/models/fleet/trailers/trailers-mappings';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';

type Props = {
    status: TrailerModel_Trailer['status'];
};

export default function TrailerStatus({ status }: Props) {
    const { t } = useAppTranslation();

    return (
        <Box ml="auto">
            <StatusChip
                color={TRAILER_STATUS_COLORS[TRAILER_STATUS_GRPC[status]]}
                status={t(`state_info:trailers.status.${TRAILER_STATUS_GRPC[status]}`)}
            />
        </Box>
    );
}
