import { COLORS } from '@/@core/theme/chip';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';

export const TRUCK_STATUS_COLORS = {
    active             : COLORS.success,
    inactive           : COLORS.gray,
    onboarding         : COLORS.yellow,
    compliance_review  : COLORS.warning,
    pending_termination: COLORS.error,
    terminated         : COLORS.error,
    available          : COLORS.success,
    deleted            : COLORS.error
};

export const TRUCK_STATUS_ICONS = {
    active: (
        <VerifiedUserIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    inactive: (
        <PendingActionsIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    onboarding: (
        <PendingActionsIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    compliance_review: (
        <PolicyIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    pending_termination: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    terminated: (
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
