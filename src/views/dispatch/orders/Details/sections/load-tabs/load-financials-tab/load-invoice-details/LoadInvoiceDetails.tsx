import Tooltip from '@mui/material/Tooltip';
import VectorIcons from '@/@core/icons/vector_icons';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import * as React from 'react';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import InvoiceItemsTable from '@/@core/ui-kits/loads/invoice-items-table/InvoiceItemsTable';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { checkLoadForDownloadInvoice } from '@/@grpcServices/services/loads-service/service-utils/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadData_Load } from '@proto/loads';
import useOrderActiveManifest from '@/store/storage/orders/hooks/useOrderActiveManifest';
import LoadDetailsViewStyled from '../../../../LoadDetailsView.styled';

type Props = { load: LoadData_Load };

export default function LoadInvoiceDetails({ load }: Props) {
    const [download] = LoadsGrpcService.useDownloadLoadInvoiceMutation();
    const downloadFile = useDownloadFile();
    const { t } = useAppTranslation();

    const { truckId } = useOrderActiveManifest(load);

    const onDownloadInvoice = () => {
        download({ loadId: load.loadId })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath, `load_#${load.friendlyId || load.loadId}_invoice`);
            });
    };

    return (
        <div>
            <LoadDetailsViewStyled.FlexContainer
                style={{
                    justifyContent: 'space-between',
                    marginBottom  : '16px',
                    padding       : '0 8px',
                    minHeight     : '32px'
                }}
            >
                <LoadDetailsViewStyled.FlexContainer style={{ gap: '4px' }}>
                    <VectorIcons.FullDialogIcons.Invoice size={24} />
                    <LoadDetailsViewStyled.Title style={{ fontSize: '16px' }}>
                        {t('loads:details.tabs.financials.titles.invoicing_details')}
                    </LoadDetailsViewStyled.Title>
                    {checkLoadForDownloadInvoice(load.status, truckId) && (
                        <Tooltip
                            title={t('common:button.download')}
                            disableInteractive
                        >
                            <LoadDetailsViewStyled.IconButtonStyled
                                primary
                                onClick={onDownloadInvoice}
                            >
                                <DownloadOutlinedIcon />
                            </LoadDetailsViewStyled.IconButtonStyled>
                        </Tooltip>
                    )}
                </LoadDetailsViewStyled.FlexContainer>

                {/* === STATUSES INPUTS === */}
                <LoadInvoiceStatusChipSelect
                    invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[load?.invoiceStatus]}
                    load_id={load.loadId}
                />
            </LoadDetailsViewStyled.FlexContainer>

            <InvoiceItemsTable
                loadId={load.loadId}
                invoiceAmount={load.invoiceAmount}
                enableAddItem
            />
        </div>
    );
}
