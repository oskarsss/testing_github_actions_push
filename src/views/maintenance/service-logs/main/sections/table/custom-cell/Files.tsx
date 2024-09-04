import { memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { IconButton, Tooltip } from '@mui/material';
import { useDownloadDocumentsDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentsDialog';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    serviceLogId: string;
};

function Files({ serviceLogId }: Props) {
    const { t } = useAppTranslation();

    // TODO: Downloading attached files should be added after the backend implementation

    return (
        <Tooltip title={t('maintenance:service_logs.table.tooltips.download_documents')}>
            <IconButton
                disabled
                onClick={() => {}}
                aria-label="download_documents"
            >
                <VectorIcons.SaveFile
                    size={16}
                    fill="currentColor"
                />
            </IconButton>
        </Tooltip>
    );
}

export default memo(Files);
