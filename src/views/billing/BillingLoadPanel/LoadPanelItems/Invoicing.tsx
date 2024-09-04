import { Avatar, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import InvoiceItemsTable from '@/@core/ui-kits/loads/invoice-items-table/InvoiceItemsTable';
import { getPublicURL } from '@/configs/storage';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';

type Props = {
    loadId: string;
    invoiceAmount: string;
    invoiceFactoringCompanyId: string;
};

function Invoicing({
    loadId,
    invoiceAmount,
    invoiceFactoringCompanyId
}: Props) {
    const { factoringCompanies } =
        FactoringCompaniesGrpcService.endpoints.getFactoringCompanies.useQuery(
            {},
            {
                selectFromResult: (result) => ({
                    ...result,
                    factoringCompanies: result.data?.factoringCompanies || []
                })
            }
        );
    const { t } = useAppTranslation();

    const company = factoringCompanies.find(
        (company) => company.factoringCompanyId === invoiceFactoringCompanyId
    );

    return (
        <BillingLoadPanelComponents.Card.Container>
            <BillingLoadPanelComponents.Card.Row>
                <BillingLoadPanelComponents.Card.Title
                    title={t('billing:panel.title.invoicing')}
                    icon={<VectorIcons.FullDialogIcons.Invoice />}
                />
                {company && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Avatar
                            sx={{
                                fontSize: '12px',
                                width   : '28px',
                                height  : '28px'
                            }}
                            src={getPublicURL(company.logoFileId)}
                        />

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="16px"
                        >
                            {company.name || t('common:not_provided')}
                        </Typography>
                    </Stack>
                )}
            </BillingLoadPanelComponents.Card.Row>

            <InvoiceItemsTable
                loadId={loadId}
                invoiceAmount={invoiceAmount}
            />
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(Invoicing);
