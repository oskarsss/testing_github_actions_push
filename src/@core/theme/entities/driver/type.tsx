import { IChipColors } from '@/@core/theme/chip';
import {
    CompanyDriverIcon,
    LeaseDriverIcon,
    OwnerOperatorIcon,
    DefaultDriverIcon
} from '@/@core/theme/entities/driver/type_icons';

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PolicyIcon from '@mui/icons-material/Policy';
import CancelIcon from '@mui/icons-material/Cancel';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';

export const DRIVER_TYPE_ICONS: Record<DriverTypeModel_Icon, JSX.Element> = {
    [DriverTypeModel_Icon.DEFAULT]       : <DefaultDriverIcon />,
    [DriverTypeModel_Icon.OWNER_OPERATOR]: <OwnerOperatorIcon />,
    [DriverTypeModel_Icon.COMPANY]       : <CompanyDriverIcon />,
    [DriverTypeModel_Icon.LEASE]         : <LeaseDriverIcon />,
    [DriverTypeModel_Icon.LEASE_TO_OWN]  : <LeaseDriverIcon />,
    [DriverTypeModel_Icon.UNSPECIFIED]   : <OwnerOperatorIcon />
};

export const DRIVER_STATUS_ICONS = {
    onboarding: (
        <PendingActionsIcon
            style={{ color: '#d48b00' }}
            fontSize="small"
        />
    ),
    active: (
        <VerifiedUserIcon
            style={{ color: '#46a544' }}
            fontSize="small"
        />
    ),
    terminated: (
        <CancelIcon
            style={{ color: '#c70000' }}
            fontSize="small"
        />
    ),
    compliance_review: (
        <PolicyIcon
            style={{ color: '#e89800' }}
            fontSize="small"
        />
    )
};

export const DRIVER_TYPE_COLORS: Record<DriverTypeModel_Icon, IChipColors> = {
    [DriverTypeModel_Icon.COMPANY]       : 'gray',
    [DriverTypeModel_Icon.LEASE]         : 'gray',
    [DriverTypeModel_Icon.LEASE_TO_OWN]  : 'gray',
    [DriverTypeModel_Icon.OWNER_OPERATOR]: 'gray',
    [DriverTypeModel_Icon.DEFAULT]       : 'gray',
    [DriverTypeModel_Icon.UNSPECIFIED]   : 'gray'
};
