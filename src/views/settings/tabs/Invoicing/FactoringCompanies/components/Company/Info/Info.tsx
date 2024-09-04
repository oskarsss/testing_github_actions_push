/* eslint-disable max-len */
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { dateFormatter, timeFormatter } from '@/views/settings/utils';
import { TotalFactoringCompanyBox } from '@/views/settings/tabs/Invoicing/styled';
import {
    SecondSubtitle,
    SecondTitle,
    StyledPaper,
    TotalSubtitle
} from '@/views/settings/components/styled';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadModel_InvoiceStatus } from '@proto/models/model_load';
import { StatsFactoringCompaniesGetReply_FactoringCompany_Stats } from '@proto/stats';
import { memo } from 'react';

const StatsTypeTitle = {
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_UNSPECIFIED]        : 'not_invoiced',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NOT_INVOICED]       : 'not_invoiced',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_DETENTION_REQUESTED]: 'detention_requested',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_INVOICED]           : 'invoiced',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_PAID]               : 'paid',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_NEED_REVIEW]        : 'need_review',
    [LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_REJECTED]           : 'rejected'
} as const;

type Props = {
    company: FactoringCompanyModel;
    stats?: StatsFactoringCompaniesGetReply_FactoringCompany_Stats[];
};

function Info({
    company,
    stats
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            paddingTop="25px"
            spacing={3}
            direction="row"
        >
            <StyledPaper>
                <Stack
                    spacing={2}
                    direction="column"
                    padding="8px 16px"
                >
                    <SecondSubtitle>
                        {t('settings:factoring_companies.company.content.cut_off_time')}
                    </SecondSubtitle>
                    <SecondTitle>
                        {company.cutoffTime ? timeFormatter(company.cutoffTime) : ''}
                    </SecondTitle>
                    <SecondSubtitle>
                        {t('settings:factoring_companies.company.content.contract_ending_on')}
                    </SecondSubtitle>
                    <SecondTitle>
                        {company.contractEndAt ? dateFormatter(company.contractEndAt, t) : '-'}
                    </SecondTitle>
                </Stack>
            </StyledPaper>

            <TotalFactoringCompanyBox
                option={LoadModel_InvoiceStatus.LOAD_INVOICE_STATUS_UNSPECIFIED}
            >
                <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        fontSize="32px"
                        variant="h5"
                        fontWeight={600}
                    >
                        {company.feePercentage}%
                    </Typography>
                    <TotalSubtitle>
                        {t('settings:factoring_companies.company.content.factoring_fee')}
                    </TotalSubtitle>
                </Stack>
            </TotalFactoringCompanyBox>
            {stats?.map((stat) => (
                <TotalFactoringCompanyBox
                    key={stat.invoiceStatus}
                    option={stat.invoiceStatus}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            className="total-text"
                            fontSize="32px"
                            variant="h5"
                            fontWeight={600}
                        >
                            {stat.count}
                        </Typography>
                        <Typography
                            className="total-text"
                            textAlign="center"
                            fontSize="14px"
                            variant="subtitle2"
                            fontWeight={600}
                        >
                            {stat.brokerAmountFormatted}
                        </Typography>
                        <TotalSubtitle>
                            {t(
                                `state_info:loads.invoice_status.${
                                    StatsTypeTitle[stat.invoiceStatus]
                                }`
                            )}
                        </TotalSubtitle>
                    </Stack>
                </TotalFactoringCompanyBox>
            ))}
        </Stack>
    );
}

export default memo(Info);
