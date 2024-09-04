import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status
} from '@proto/models/model_manifest';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { IChipColors } from '../../chip';
import {
    BookedIcon,
    CanceledIcon,
    DeliveredIcon,
    InTransitIcon,
    TonuIcon
} from '../load/load_status_icons';

export const MANIFEST_STOP_STATUS_COLORS: Record<ManifestModel_ManifestStop_Status, IChipColors> = {
    [ManifestModel_ManifestStop_Status.CANCELLED]  : 'gray',
    [ManifestModel_ManifestStop_Status.COMPLETED]  : 'success',
    [ManifestModel_ManifestStop_Status.EN_ROUTE]   : 'blue_dark',
    [ManifestModel_ManifestStop_Status.DELETED]    : 'error',
    [ManifestModel_ManifestStop_Status.PLANNING]   : 'warning',
    [ManifestModel_ManifestStop_Status.UNSPECIFIED]: 'gray',
    [ManifestModel_ManifestStop_Status.CHECKED_IN] : 'indigo',
    [ManifestModel_ManifestStop_Status.ON_LOCATION]: 'violet'
} as const;

export const MANIFEST_LOAD_STOP_STATUS_COLORS: Record<ManifestModel_LoadStop_Status, IChipColors> =
    {
        [ManifestModel_LoadStop_Status.CANCELLED]  : 'gray',
        [ManifestModel_LoadStop_Status.COMPLETED]  : 'success',
        [ManifestModel_LoadStop_Status.EN_ROUTE]   : 'blue_dark',
        [ManifestModel_LoadStop_Status.DELETED]    : 'error',
        [ManifestModel_LoadStop_Status.PLANNING]   : 'warning',
        [ManifestModel_LoadStop_Status.UNSPECIFIED]: 'gray',
        [ManifestModel_LoadStop_Status.CHECKED_IN] : 'indigo',
        [ManifestModel_LoadStop_Status.ON_LOCATION]: 'violet',
        [ManifestModel_LoadStop_Status.TONU]       : 'pink'
    };

export const MANIFEST_STOP_STATUS_ICONS: Record<
    ManifestModel_ManifestStop_Status,
    React.ReactElement
> = {
    [ManifestModel_ManifestStop_Status.PLANNING]   : <BookedIcon />,
    [ManifestModel_ManifestStop_Status.COMPLETED]  : <DeliveredIcon />,
    [ManifestModel_ManifestStop_Status.EN_ROUTE]   : <InTransitIcon />,
    [ManifestModel_ManifestStop_Status.ON_LOCATION]: <WhereToVoteIcon />,
    [ManifestModel_ManifestStop_Status.CHECKED_IN] : <VerifiedUserIcon />,
    [ManifestModel_ManifestStop_Status.CANCELLED]  : <CanceledIcon />,
    [ManifestModel_ManifestStop_Status.DELETED]    : <TonuIcon />,
    [ManifestModel_ManifestStop_Status.UNSPECIFIED]: <TonuIcon />
};

export const MANIFEST_LOAD_STOP_ICONS: Record<ManifestModel_LoadStop_Status, React.ReactElement> = {
    [ManifestModel_LoadStop_Status.CANCELLED]  : <CanceledIcon />,
    [ManifestModel_LoadStop_Status.COMPLETED]  : <DeliveredIcon />,
    [ManifestModel_LoadStop_Status.EN_ROUTE]   : <InTransitIcon />,
    [ManifestModel_LoadStop_Status.DELETED]    : <TonuIcon />,
    [ManifestModel_LoadStop_Status.PLANNING]   : <BookedIcon />,
    [ManifestModel_LoadStop_Status.UNSPECIFIED]: <TonuIcon />,
    [ManifestModel_LoadStop_Status.CHECKED_IN] : <VerifiedUserIcon />,
    [ManifestModel_LoadStop_Status.ON_LOCATION]: <WhereToVoteIcon />,
    [ManifestModel_LoadStop_Status.TONU]       : <TonuIcon />
};
