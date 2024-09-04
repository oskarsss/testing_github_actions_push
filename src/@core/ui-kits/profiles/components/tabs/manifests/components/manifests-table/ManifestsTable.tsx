import { memo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useEditManifestDialog } from '@/views/dispatch/manifests/modals/edit-manifest/EditManifest';
import {
    FilterType,
    PageType,
    useFleetManifestsQuery
} from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import TabTablePagination from '@/@core/ui-kits/profiles/components/tabs/reusable/TabTablePagination';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import columns from './columns';

type Props = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

function ManifestsTable({
    filterType,
    entityId,
    page
}: Props) {
    const editManifestDialog = useEditManifestDialog();
    const {
        manifests,
        isLoading,
        total,
        filter_id,
        selected_filters
    } = useFleetManifestsQuery({
        filterType,
        entityId,
        page
    });

    const executeAction: MiniTableExecuteActionType<ManifestModel_Manifest> = (name, props) => {
        switch (name) {
        case 'edit':
            editManifestDialog.open({ manifestId: props.row.manifestId || '' });
            break;
        default:
            break;
        }
    };

    if (isLoading) {
        return <Preloader sx={{ padding: '100px' }} />;
    }

    return (
        <>
            <MiniTable
                columns={columns}
                rows={manifests}
                elementKey="manifestId"
                executeAction={executeAction}
                emptyStateText="common:empty.no_manifest_assigned"
                stickyHeader
            />

            <TabTablePagination
                filter_id={filter_id}
                rows_total={total}
                page={selected_filters.page}
                per_page={selected_filters.per_page}
            />
        </>
    );
}

export default memo(ManifestsTable);
