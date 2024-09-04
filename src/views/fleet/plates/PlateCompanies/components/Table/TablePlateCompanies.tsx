import { default_plates_companies_filters, usePlatesCompanies } from '@/store/fleet/plates/hooks';
import PlatesTypes from '@/store/fleet/plates/types';
import { useCallback } from 'react';
import { useAddPlateCompanyDialog } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/AddPlateCompany';
import { useEditPlateCompanyDialog } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/EditPlateCompany';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import Table from '../../../../../../@core/components/table/Table';

export default function TablePlateCompanies() {
    const editPlateCompanyDialog = useEditPlateCompanyDialog();
    const AddPlateCompanyDialog = useAddPlateCompanyDialog();

    const {
        rows,
        rows_total,
        view,
        headers,
        isLoading,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = usePlatesCompanies();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const updateFilters = useUpdateSearchFilters(default_plates_companies_filters);

    const executeAction = useCallback(
        (
            name: string,
            props: {
                row: PlatesTypes.PlateCompanyRow;
            }
        ) => {
            editPlateCompanyDialog.open({ plateCompanyId: props.row.plateCompanyId });
        },
        [editPlateCompanyDialog]
    );

    const onCreateItem = useCallback(() => AddPlateCompanyDialog.open({}), [AddPlateCompanyDialog]);

    return (
        <Table<PlatesTypes.PlateCompanyRow>
            pageType="PLATE_COMPANIES"
            tableName="plate_companies"
            rows={rows}
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.PLATES_COMPANIES.defaultFilters}
            view={view}
            headers={headers}
            columns={{}}
            isLoading={isLoading}
            filter_id={filter_id}
            onCreateItem={onCreateItem}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            pagination
            onUpdateWidth={updateColumnWidth}
        />
    );
}
