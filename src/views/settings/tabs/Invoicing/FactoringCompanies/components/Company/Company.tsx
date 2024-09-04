import { Fade } from '@mui/material';
import { CyclePaper } from '@/views/settings/components/styled';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { useMemo } from 'react';
import FactoringCompaniesStatsGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies-stats.service';
import CompanyHeader from './Header/Header';
import Info from './Info/Info';
import Table from './Table/Table';

type Props = {
    company: FactoringCompanyModel;
};

export default function Company({ company }: Props) {
    const { data } = FactoringCompaniesStatsGrpcService.endpoints.getFactoringCompanyStats.useQuery(
        {}
    );

    const findCompanyStats = useMemo(
        () =>
            data?.factoringCompanies.find(
                (factoringCompany) =>
                    factoringCompany.factoringCompanyId === company.factoringCompanyId
            ),
        [data, company]
    );

    return (
        <Fade
            in
            timeout={1000}
        >
            <CyclePaper
                elevation={0}
                sx={{
                    border: (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
                    '&+&' : {
                        marginTop: '40px !important'
                    }
                }}
            >
                <CompanyHeader company={company} />
                <Info
                    company={company}
                    stats={findCompanyStats?.stats}
                />
                <Table
                    company={company}
                    lastThirtyDaysStats={findCompanyStats?.last30DaysStats}
                />
            </CyclePaper>
        </Fade>
    );
}
