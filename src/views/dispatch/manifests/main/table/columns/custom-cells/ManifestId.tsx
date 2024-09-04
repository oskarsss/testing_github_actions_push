import { memo } from 'react';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';

type Props = {
    manifest: ManifestModel_Manifest;
};

function ManifestId({ manifest }: Props) {
    return (
        <OrdersTableTextCell
            title={`M-${manifest.friendlyId}` || '-'}
            description={manifest.title}
        />
    );
}

export default memo(ManifestId);
