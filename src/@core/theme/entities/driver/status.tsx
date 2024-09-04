import { COLORS, IChipColors } from '@/@core/theme/chip';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CancelIcon from '@mui/icons-material/Cancel';
import { DriverModel_Status } from '@proto/models/model_driver';

export const DRIVER_STATUS_COLORS: Record<DriverModel_Status, IChipColors> = {
    [DriverModel_Status.ONBOARDING]         : COLORS.yellow,
    [DriverModel_Status.COMPLIANCE_REVIEW]  : COLORS.indigo,
    [DriverModel_Status.ACTIVE]             : COLORS.success,
    [DriverModel_Status.PENDING_TERMINATION]: COLORS.error,
    [DriverModel_Status.TERMINATED]         : COLORS.error,
    [DriverModel_Status.DELETED]            : COLORS.error,
    [DriverModel_Status.UNSPECIFIED]        : COLORS.error
};

export const DRIVER_STATUS_ICONS = {
    [DriverModel_Status.ONBOARDING]: (
        <PendingActionsIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.COMPLIANCE_REVIEW]: (
        <PolicyIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.ACTIVE]: (
        <VerifiedUserIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.PENDING_TERMINATION]: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.TERMINATED]: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.DELETED]: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    ),
    [DriverModel_Status.UNSPECIFIED]: (
        <CancelIcon
            style={{ marginRight: '6px' }}
            fontSize="small"
        />
    )
};
