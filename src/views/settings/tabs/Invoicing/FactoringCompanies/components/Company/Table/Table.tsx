import { TableWrapper } from '@/views/settings/components/styled';
import columns from '@/views/settings/tabs/Invoicing/FactoringCompanies/components/Company/Table/columns';
import { memo, useMemo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import { StatsFactoringCompaniesGetReply_FactoringCompany_Last30DaysStats } from '@proto/stats';

export type StatsWithId = StatsFactoringCompaniesGetReply_FactoringCompany_Last30DaysStats & {
    id: string;
};

interface CompanyTableProps {
    company: FactoringCompanyModel;
    lastThirtyDaysStats?: StatsFactoringCompaniesGetReply_FactoringCompany_Last30DaysStats;
}

function FactoringCompaniesTable({
    company,
    lastThirtyDaysStats
}: CompanyTableProps) {
    const statsWithId = useMemo(
        () => ({
            id: `${company.factoringCompanyId}_broker_amount`,
            ...(lastThirtyDaysStats || {})
        }),
        [company.factoringCompanyId, lastThirtyDaysStats]
    );

    return (
        <TableWrapper>
            <MiniTable
                columns={columns}
                rows={[statsWithId]}
                elementKey="id"
                executeAction={() => {}}
                turnOffBorder
            />
        </TableWrapper>
    );
}

export default memo(FactoringCompaniesTable);
