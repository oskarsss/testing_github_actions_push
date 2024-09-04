import DeleteIcon from '@mui/icons-material/Delete';
import { VerifiedIcon, PaidIcon, OpenIcon, InReviewIcon, ClosedIcon, SentIcon } from './icons';
// eslint-disable-next-line import/prefer-default-export
export const SETTLEMENTS_STATUS_ICONS = {
    verified : <VerifiedIcon />,
    paid     : <PaidIcon />,
    open     : <OpenIcon />,
    in_review: <InReviewIcon />,
    closed   : <ClosedIcon />,
    sent     : <SentIcon />,
    deleted  : <DeleteIcon fontSize="small" />
};
