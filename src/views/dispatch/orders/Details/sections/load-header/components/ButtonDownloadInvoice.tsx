import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadHeaderStyled from '@/views/dispatch/orders/Details/sections/load-header/LoadHeader.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

type Props = {
    loadId: LoadsTypes.Load.Load['loadId'];
    loadFriendlyId?: string | number;
};

export default function ButtonDownloadInvoice({
    loadId,
    loadFriendlyId
}: Props) {
    const { t } = useAppTranslation();
    const [download, { isLoading }] = LoadsGrpcService.useDownloadLoadInvoiceMutation();

    const downloadFile = useDownloadFile();

    const downloadInvoice = () => {
        download({ loadId })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath, `load_#${loadFriendlyId || loadId}_invoice`);
            });
    };

    return (
        <LoadHeaderStyled.Button
            loading={isLoading}
            startIcon={(
                <VectorIcons.LoadIcons.Download
                    sx={{
                        width : '20px',
                        height: '20px'
                    }}
                />
            )}
            variant="outlined"
            onClick={downloadInvoice}
            sx={{
                svg: {
                    path: {
                        fill: (theme) => theme.palette.semantic.foreground.brand.primary
                    }
                }
            }}
        >
            {t('loads:details.header.buttons.download_invoice')}
        </LoadHeaderStyled.Button>
    );
}
