import { COLORS, IChipColors } from '@/@core/theme/chip';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';

export const USER_STATUS_COLORS: Record<string, IChipColors> = {
    active  : COLORS.success,
    disabled: COLORS.error,
    invited : COLORS.indigo
} as const;

export const USER_STATUS_ICONS = {
    active: (
        <VerifiedUserIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    disabled: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    )
};
