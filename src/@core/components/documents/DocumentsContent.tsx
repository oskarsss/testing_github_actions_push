import { memo, useEffect, useMemo, useState } from 'react';
import { TabContext } from '@mui/lab';
import DocumentTabs from './components/document-tabs/DocumentTabs';
import DocumentsComponents from './components/document-content/styled';
import DocumentContent from './components/document-content/DocumentContent';
import { useDocumentsContext } from './Documents';
import { useGetDocumentVersionsQuery } from './components/document-content/versions-select/VersionsSelect';

type Props = {
    handleTabChange: (document_id: string) => void;
    selectedDocumentTypeId: string;
};

function DocumentsView({
    handleTabChange,
    selectedDocumentTypeId
}: Props) {
    const {
        documentsList,
        title,
        selectedDocument,
        entityId,
        entityType
    } = useDocumentsContext();

    const {
        versions,
        isFetching
    } = useGetDocumentVersionsQuery({
        documentTypeId: selectedDocument?.documentTypeId,
        entityId,
        entityType
    });

    const [selectedVersion, setSelectedVersion] = useState(
        versions.length ? versions[0] : undefined
    );
    const onChangeTab = (newValue: string) => {
        handleTabChange(newValue);
        setSelectedVersion(undefined);
    };

    const isCurrentVersion = useMemo(
        () => selectedVersion?.version === versions[0]?.version,
        [selectedVersion?.version, versions]
    );

    useEffect(() => {
        if (versions.length) {
            setSelectedVersion(versions[0]);
        } else {
            setSelectedVersion(undefined);
        }
    }, [versions]);

    return (
        <TabContext value={selectedDocumentTypeId}>
            <DocumentTabs onTabChange={onChangeTab} />
            <DocumentsComponents.Wrapper>
                {documentsList.map((document) => (
                    <DocumentsComponents.TabPanel
                        key={document.documentTypeId}
                        value={document.documentTypeId}
                    >
                        <DocumentContent
                            isVersionsFetching={isFetching}
                            versions={versions}
                            isCurrentVersion={isCurrentVersion}
                            setSelectedVersion={setSelectedVersion}
                            document={document}
                            selectedVersion={selectedVersion}
                            fileName={`${title}_${document.documentType?.title || ''}`}
                        />
                    </DocumentsComponents.TabPanel>
                ))}
            </DocumentsComponents.Wrapper>
        </TabContext>
    );
}

export default memo(DocumentsView);
