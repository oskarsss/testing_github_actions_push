import React from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {
    DocumentUploaded,
    DocumentUploadedIcon,
    Loading,
    Text
} from '@/views/new-loads/views/Draft/styled';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const DocumentUploadProcess = () => {
    const { t } = useAppTranslation();
    return (
        <DocumentUploaded>
            <DocumentUploadedIcon>
                <Loading>
                    <ArrowUpwardOutlinedIcon color="primary" />
                    <ArrowUpwardOutlinedIcon color="primary" />
                </Loading>
            </DocumentUploadedIcon>
            <Text sx={{ marginTop: 3 }}>{t('new_loads:draft.document.uploading')}</Text>
            <Box sx={{ width: '50%', marginTop: 3 }}>
                <LinearProgress />
            </Box>
        </DocumentUploaded>
    );
};

export default DocumentUploadProcess;
