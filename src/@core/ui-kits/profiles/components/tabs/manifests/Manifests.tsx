import { memo } from 'react';
import {
    FilterType,
    PageType
} from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import TabContentWrapper from '@/@core/ui-kits/profiles/components/tabs/reusable/TabContentWrapper';
import ManifestsHeader from './components/manifests-header/ManifestsHeader';
import ManifestsTable from './components/manifests-table/ManifestsTable';

type Props = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

function Manifests({
    filterType,
    entityId,
    page
}: Props) {
    return (
        <TabContentWrapper>
            <ManifestsHeader />

            <ManifestsTable
                filterType={filterType}
                entityId={entityId}
                page={page}
            />
        </TabContentWrapper>
    );
}

export default memo(Manifests);
