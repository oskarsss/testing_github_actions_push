import { memo } from 'react';
import {
    FilterType,
    PageType
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import TabContentWrapper from '@/@core/ui-kits/profiles/components/tabs/reusable/TabContentWrapper';
import LoadsHeader from './components/loads-header/LoadsHeader';
import LoadsTable from './components/loads-table/LoadsTable';

type Props = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

function Loads({
    filterType,
    entityId,
    page
}: Props) {
    return (
        <TabContentWrapper>
            <LoadsHeader />

            <LoadsTable
                filterType={filterType}
                entityId={entityId}
                page={page}
            />
        </TabContentWrapper>
    );
}

export default memo(Loads);
