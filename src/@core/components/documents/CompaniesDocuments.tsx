import React from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useAppSelector } from '@/store/hooks';
import { Stack, Typography } from '@mui/material';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Documents from './Documents';
import DialogComponents from '../../ui-kits/common-dialog';

export const useCompaniesDocuments = hookFabric(CompaniesDocuments, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        paperStyle={{
            width    : '100%',
            maxWidth : '50%',
            maxHeight: '80%',
            height   : '100%'
        }}
    />
));

function CompaniesDocuments() {
    const { t } = useAppTranslation();

    const company_id = useAppSelector((state) => state.app.company_id);

    return (
        <Stack
            direction="column"
            flex="1 1 100%"
            alignItems="center"
            justifyContent="center"
        >
            <Typography
                variant="h5"
                gutterBottom
            >
                {t('core:documents.company_documents')}
            </Typography>
            <Documents
                entityId={company_id}
                entityType={DocumentModel_DocumentEntityType.COMPANY}
                title={t('core:documents.title')}

                // documents={data?.documents || []}
                // location="company"
                // refresh={refetch}
            />
        </Stack>
    );
}

export default CompaniesDocuments;
