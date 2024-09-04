import React, { memo, useCallback } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import BillingLoadPanelIcons from '@/views/billing/BillingLoadPanel/Icons';
import CopyText from '@/@core/components/copy-text/CopyText';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import TabIcon from '@mui/icons-material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import openNewWindow from '@/utils/open-new-window';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { LoadModel_InvoiceStatus } from '@proto/models/model_load';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    loadId: string;
    loadFriendlyId: number | string;
    invoiceStatus: LoadModel_InvoiceStatus;
    onClickEditLoad: (loadId?: string) => void;
};

function BillingLoadPanelHeader({
    loadId,
    loadFriendlyId,
    invoiceStatus,
    onClickEditLoad
}: Props) {
    const { t } = useAppTranslation();
    const [download, { isLoading: isDownloadLoading }] =
        LoadsGrpcService.useDownloadLoadInvoiceMutation();

    const downloadFile = useDownloadFile();

    const openNewTab = () => {
        if (!loadId) return;
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(loadId));
    };

    const downloadInvoice = useCallback(() => {
        if (!loadId) return;
        download({ loadId })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath, `load_#${loadFriendlyId || loadId}_invoice`);
            });
    }, [download, downloadFile, loadFriendlyId, loadId]);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <BillingLoadPanelIcons.PrimaryLoad />

                <CopyText text={loadFriendlyId}>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        fontSize="24px"
                    >
                        {t('billing:panel.header.title', { friendlyId: loadFriendlyId })}
                    </Typography>
                </CopyText>

                <LoadInvoiceStatusChipSelect
                    invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[invoiceStatus]}
                    load_id={loadId}
                />
            </Stack>

            <Stack
                direction="row"
                spacing={2}
            >
                <Tooltip title={t('billing:panel.header.buttons.download_invoice.tooltip')}>
                    <IconButton
                        onClick={downloadInvoice}
                        disabled={isDownloadLoading}
                        aria-label="Download Invoice"
                    >
                        <DownloadIcon color="primary" />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t('common:tooltips.open_in_new_tab')}>
                    <IconButton
                        onClick={openNewTab}
                        aria-label="Open in new tab"
                    >
                        <TabIcon color="primary" />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t('billing:panel.header.buttons.edit_load.tooltip')}>
                    <IconButton
                        onClick={() => onClickEditLoad(loadId)}
                        aria-label="Edit Load"
                    >
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}

export default memo(BillingLoadPanelHeader);
