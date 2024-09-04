import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import LoadTabsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/LoadTabs.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMissingLoadDocuments } from '@/@core/ui-kits/loads/load-documents/LoadDocuments';
import { LoadData_Load } from '@proto/loads';

type Props = {
    load: LoadData_Load;
    selected: boolean;
};
export default function LoadDocumentsCountLabel({
    load,
    selected
}: Props) {
    const { t } = useAppTranslation();
    const { documents } = useGetDocumentsByEntityType({
        entityId  : load.loadId,
        entityType: DocumentModel_DocumentEntityType.LOAD
    });

    const missingDocuments = useMissingLoadDocuments(documents);
    const documentsCount = documents.length;
    const uploadDocumentsCount = documents.filter((doc) => doc.fileId).length;

    return (
        <LoadTabsStyled.Label
            selected={selected}
            count={documentsCount ? `${uploadDocumentsCount}/${documentsCount}` : null}
            {...(missingDocuments.length > 0 && { color: 'error' })}
        >
            {t('loads:details.tabs.labels.documents')}
        </LoadTabsStyled.Label>
    );
}
