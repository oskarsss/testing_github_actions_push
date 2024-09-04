import { LoadGetTrackingLinkReply } from '@proto/loads';
import LoadTrackingLinkGrpcService from '@/@grpcServices/services/loads-service/loads-tracking-link.service';
import { useShareLinkDialog } from '@/views/dispatch/orders/menus/share-link/ShareLink';
import LOAD_SHARE_LINK_SWITCHERS_CONFIG from '@/views/dispatch/orders/menus/share-link/LOAD_SHARE_LINK_SWITCHERS_CONFIG';
import ShareLinkContentComponent from '@/@core/ui-kits/loads/share-link/ShareLinkContentComponent';

const SHARE_LINK_URL = process.env.NEXT_PUBLIC_TRACKING_LINK;

type Props = {
    loadId: string;
    data: LoadGetTrackingLinkReply;
};

export default function ShareLinkContent({
    loadId,
    data
}: Props) {
    const menu = useShareLinkDialog(true);
    const [updateTrackingLink] = LoadTrackingLinkGrpcService.useUpdateTrackingLinkMutation();
    const [revokeTrackingLink] = LoadTrackingLinkGrpcService.useRevokeTrackingLinkMutation();
    const onChangeSwitch = (field: keyof LoadGetTrackingLinkReply, checked: boolean) => {
        updateTrackingLink({
            ...data,
            loadId,
            [field]: checked
        });
    };

    const onRevoke = () => {
        revokeTrackingLink({ loadId }).unwrap().then(menu.close);
    };

    return (
        <ShareLinkContentComponent
            dataLinks={data}
            fullLink={`${SHARE_LINK_URL}${data.token}`}
            switchConfigs={LOAD_SHARE_LINK_SWITCHERS_CONFIG}
            onChange={onChangeSwitch}
            onRevoke={onRevoke}
        />
    );
}
