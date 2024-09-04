import ShareLinkLink from '@/@core/ui-kits/loads/share-link/components/ShareLinkLink';
import ShareLinkRevoke from '@/@core/ui-kits/loads/share-link/components/ShareLinkRevoke';
import { Divider, Fade } from '@mui/material';
import ShareLinkItemsList, {
    ShareLinkItemsListProps
} from '@/@core/ui-kits/loads/share-link/components/ShareLinkItemsList';

type Props<T extends object> = {
    onRevoke: () => void;
    fullLink: string;
} & ShareLinkItemsListProps<T>;

export default function ShareLinkContentComponent<T extends object>({
    dataLinks,
    fullLink,
    switchConfigs,
    onChange,
    onRevoke
}: Props<T>) {
    return (
        <Fade in>
            <div>
                <ShareLinkLink link={fullLink} />
                <ShareLinkRevoke onRevoke={onRevoke} />

                <Divider sx={{ margin: '12px 0' }} />

                <ShareLinkItemsList
                    dataLinks={dataLinks}
                    switchConfigs={switchConfigs}
                    onChange={onChange}
                />
            </div>
        </Fade>
    );
}
