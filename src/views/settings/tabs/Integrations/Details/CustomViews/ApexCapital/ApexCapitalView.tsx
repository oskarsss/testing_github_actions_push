import { useState } from 'react';
import TableViews from '@/@core/components/table-views/TableViews';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { useInvoiceApexCapitalItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/Invoicing/hook';
import InvoiceItemCategoriesTable from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/Invoicing/InvoiceItemCategoriesTable';
import { useEquipmentsTypesApexCapital } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/equipments/hook';
import EquipmentTypesTable from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/tabs/equipments/EquipmentTypesTable';
import { Fade } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Keys = 'invoicing' | 'equipment';

const titles: Record<Keys, IntlMessageKey | string> = {
    invoicing: 'Order Invoice Item Categories',
    equipment: 'Equipment Types'
};

const VIEWS: { viewId: Keys; name: IntlMessageKey | string }[] = [
    {
        viewId: 'invoicing',
        name  : 'Invoicing'
    },
    {
        viewId: 'equipment',
        name  : 'Equipments'
    }
];

export default function ApexCapitalView() {
    const { t } = useAppTranslation();
    const [selected_viewId, selectView] = useState(VIEWS[0].viewId);

    const invoice_data = useInvoiceApexCapitalItems();
    const equipment_data = useEquipmentsTypesApexCapital();

    const counts: Record<Keys, number> = {
        invoicing: invoice_data.data.filter((item) => !item.apex_capital_id).length,
        equipment: equipment_data.data.filter((item) => !item.apex_capital_id).length
    };

    const loadings = invoice_data.loading || equipment_data.loading;

    const views = VIEWS.map((view) => {
        if (counts[view.viewId] > 0 && !loadings) {
            return {
                ...view,
                name: t(view.name),
                icon: (
                    <Fade in>
                        <IntegrationDetailsComponents.TabBadge>
                            {counts[view.viewId]}
                        </IntegrationDetailsComponents.TabBadge>
                    </Fade>
                )
            };
        }
        return view;
    });

    return (
        <IntegrationDetailsComponents.Right.CustomContainer>
            <IntegrationDetailsComponents.Right.ViewsWrapper>
                <TableViews
                    selectedViewId={selected_viewId}
                    views={views}
                    selectView={selectView as (viewId: string) => void}
                    iconPosition="end"
                />
            </IntegrationDetailsComponents.Right.ViewsWrapper>
            {titles[selected_viewId as Keys] && (
                <IntegrationDetailsComponents.Right.Title>
                    {titles[selected_viewId as Keys]}
                </IntegrationDetailsComponents.Right.Title>
            )}
            {selected_viewId === 'invoicing' && <InvoiceItemCategoriesTable {...invoice_data} />}
            {selected_viewId === 'equipment' && <EquipmentTypesTable {...equipment_data} />}
        </IntegrationDetailsComponents.Right.CustomContainer>
    );
}
