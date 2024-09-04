import { COLORS, IChipColors } from '@/@core/theme/chip';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';

export const TRAILER_STATUS_COLORS: Record<string, IChipColors> = {
    active : COLORS.success,
    offline: COLORS.gray,
    deleted: COLORS.error
};

export const TRAILER_STATUS_ICONS = {
    active: (
        <VerifiedUserIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    offline: (
        <PendingActionsIcon
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
