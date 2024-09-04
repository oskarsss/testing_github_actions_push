import { COLORS, IChipColors } from '@/@core/theme/chip';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';

export const PLATE_STATUS_COLORS: Record<string, IChipColors> = {
    active              : COLORS.success,
    pending_cancellation: COLORS.error,
    cancelled           : COLORS.error
};

export const PLATE_STATUS_ICONS = {
    active: (
        <VerifiedUserIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    pending_cancellation: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    cancelled: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    deleted: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    )
};
