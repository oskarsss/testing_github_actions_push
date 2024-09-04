import ShareIcon from '@mui/icons-material/Share';
import LoadHeaderStyled from '@/views/dispatch/orders/Details/sections/load-header/LoadHeader.styled';
import { MouseEvent } from 'react';
import { useShareLinkDialog } from '@/views/dispatch/orders/menus/share-link/ShareLink';

type Props = {
    load_id: string;
};

export default function ButtonShare({ load_id }: Props) {
    const shareMenu = useShareLinkDialog();

    const openShareMenu = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        shareMenu.open({ loadId: load_id });
    };

    return (
        <LoadHeaderStyled.Button
            variant="outlined"
            sx={{ pl: '8px', pr: '8px' }}
            onClick={openShareMenu}
        >
            <ShareIcon sx={{ fontSize: '20px' }} />
        </LoadHeaderStyled.Button>
    );
}
