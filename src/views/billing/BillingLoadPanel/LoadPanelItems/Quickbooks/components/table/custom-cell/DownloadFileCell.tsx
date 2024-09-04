import { useDownloadFile } from '@/hooks/useDownloadFile';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    file_url: string;
    file_name: string;
};

const DownloadFileCell = ({
    file_url,
    file_name
}: Props) => {
    const downloadFile = useDownloadFile();
    const { t } = useAppTranslation();

    if (!file_url) return '-';

    const downloadInvoice = () => {
        downloadFile(file_url, file_name);
    };

    return (
        <Tooltip title={t('common:button.download')}>
            <IconButton
                onClick={downloadInvoice}
                sx={{ padding: '2px' }}
            >
                <DownloadIcon
                    color="primary"
                    sx={{ width: '16px', height: '16px' }}
                />
            </IconButton>
        </Tooltip>
    );
};

export default DownloadFileCell;
