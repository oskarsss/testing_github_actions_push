import React, { MouseEvent, memo, useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { DocumentModel_Status } from '@proto/models/model_document';
import clsx from 'clsx';
import { useDownloadDocumentsDialog } from '../../dialogs/DownloadDocuments/DownloadDocumentsDialog';
import DocTabsComponents from './styled';
import StatusIcon from './StatusIcon';
import { useDocumentsContext } from '../../Documents';
import { useChooseDocumentTypeMenu } from '../../menus/ChooseDocumentType';

type Props = {

    // addDocument: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onTabChange: (newValue: string) => void;
};

function DocumentTabs({
    // addDocument,
    onTabChange
}: Props) {
    const {
        entityId,
        entityType,
        title,
        documentsList
    } = useDocumentsContext();

    const exclude_document_types = useMemo(
        () => documentsList.map((doc) => doc.documentTypeId),
        [documentsList]
    );

    const chooseDocumentTypeMenu = useChooseDocumentTypeMenu();

    const addDocument = (event: MouseEvent<HTMLButtonElement>) => {
        chooseDocumentTypeMenu.open({
            entity_id  : entityId,
            entity_type: entityType,
            onAdded    : ({ documentTypeId }) => onTabChange(documentTypeId),
            exclude_document_types
        })(event);
    };

    const { t } = useAppTranslation('core');

    const files = useMemo(() => documentsList.filter(({ fileId }) => fileId), [documentsList]);

    const downloadDocumentDialog = useDownloadDocumentsDialog();

    const openDownloadDialog = () => {
        downloadDocumentDialog.open({
            documents  : files,
            title,
            entity_id  : entityId,
            entity_type: entityType
        });
    };

    return (
        <DocTabsComponents.Container>
            <DocTabsComponents.Wrapper>
                <Button
                    variant="text"
                    size="large"
                    onClick={addDocument}
                >
                    <AddIcon sx={{ marginRight: '10px' }} />
                    {t('documents.buttons.add')}
                </Button>
                <IconButtonWithTooltip
                    tooltip={`core:documents.tooltips.${
                        files.length ? 'download_all' : 'no_files'
                    }`}
                    disabled={!files.length}
                    onClick={openDownloadDialog}
                    icon={<DownloadIcon />}
                />
            </DocTabsComponents.Wrapper>
            <DocTabsComponents.TabList
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                onChange={(e, value) => onTabChange(value)}
            >
                {documentsList.map((document) => (
                    <DocTabsComponents.Tab
                        key={document.documentTypeId}
                        value={document.documentTypeId}
                        label={`${document.documentType?.title} `}
                        className={clsx({
                            valid: document.status === DocumentModel_Status.DOCUMENT_STATUS_VALID,
                            pending:
                                document.status === DocumentModel_Status.DOCUMENT_STATUS_PENDING,
                            invalid:
                                document.status === DocumentModel_Status.DOCUMENT_STATUS_INVALID
                        })}
                        icon={(
                            <StatusIcon
                                expires_at={document.expiresAt}
                                status={document.status}
                                doc_type_expirable={!!document.documentType?.expirable}
                                margin_right={16}
                            />
                        )}
                    />
                ))}
            </DocTabsComponents.TabList>
        </DocTabsComponents.Container>
    );
}

export default memo(DocumentTabs);
