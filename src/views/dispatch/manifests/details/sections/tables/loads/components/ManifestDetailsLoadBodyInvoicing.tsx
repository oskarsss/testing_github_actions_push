/* eslint-disable max-len */

import ManifestDetailsLoadComponents from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadComponents';
import VectorIcons from '@/@core/icons/vector_icons';
import * as React from 'react';
import { checkLoadForDownloadInvoice } from '@/@grpcServices/services/loads-service/service-utils/utils';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LOAD_INVOICE_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import InvoiceItemsTable from '@/@core/ui-kits/loads/invoice-items-table/InvoiceItemsTable';
import { ManifestModel_Load } from '@proto/models/model_manifest';
import { useMemo } from 'react';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { CURRENCY_SIGN } from '@/models/currency/currency';

type Props = {
    load: ManifestModel_Load;
};

export default function ManifestDetailsLoadBodyInvoicing({ load }: Props) {
    const [download] = LoadsGrpcService.useDownloadLoadInvoiceMutation();
    const downloadFile = useDownloadFile();
    const { t } = useAppTranslation();

    const onDownloadInvoice = () => {
        download({ loadId: load.loadId })
            .unwrap()
            .then(({ filePath }) => {
                downloadFile(filePath, `load_#${load.friendlyId}_invoice`);
            });
    };

    const { invoiceAmount } = useMemo(() => {
        const invoiceAmount = load.invoiceItems.reduce(
            (acc, item) => acc + (item.total?.amount || 0),
            0
        );

        const currency = load.invoiceItems?.[0]?.total?.currency;

        return {
            invoiceAmount: `${CURRENCY_SIGN[currency || '0']}${invoiceAmount.toFixed(2)}`
        };
    }, [load.invoiceItems]);

    return (
        <ManifestDetailsLoadComponents.Body.Wrapper sx={{ pb: '16px' }}>
            <ManifestDetailsLoadComponents.Body.HeaderContainer>
                <ManifestDetailsLoadComponents.Body.HeaderWrapper>
                    <VectorIcons.FullDialogIcons.InvoicingIcon
                        sx={{ fontSize: '24px' }}
                        color="primary"
                    />
                    <ManifestDetailsLoadComponents.Body.Title>
                        {t('common:invoicing')}
                    </ManifestDetailsLoadComponents.Body.Title>
                    {checkLoadForDownloadInvoice(load.status, 'load.truckId') && (
                        <IconButtonWithTooltip
                            tooltip="common:button.download"
                            onClick={onDownloadInvoice}
                            icon={(
                                <VectorIcons.DownloadIcon
                                    sx={{ fontSize: '16px' }}
                                    color="primary"
                                />
                            )}
                            padding="2px"
                            sx={{ ml: '4px' }}
                        />
                    )}
                </ManifestDetailsLoadComponents.Body.HeaderWrapper>
                <LoadInvoiceStatusChipSelect
                    invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[load?.invoiceStatus]}
                    load_id={load.loadId}
                    size="small"
                    invalidateTags={['manifests', 'manifest']}
                />
            </ManifestDetailsLoadComponents.Body.HeaderContainer>
            <InvoiceItemsTable
                loadId={load.loadId}
                invoiceAmount={invoiceAmount}
                enableAddItem
                stickyHeader
            />
        </ManifestDetailsLoadComponents.Body.Wrapper>
    );
}
