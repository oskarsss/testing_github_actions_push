import { useCallback } from 'react';
import {
    default_trailer_companies_filter,
    useTrailersCompanies
} from '@/store/fleet/trailers/hooks';
import TrailersTypes from '@/store/fleet/trailers/types';
import { useEditTrailerCompanyDialog } from '@/views/fleet/trailers/TrailerCompanies/dialogs/EditTrailerCompanyFullDialog/EditTrailerCompany';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import Table from '../../../../../../@core/components/table/Table';
import { useAddTrailerCompanyDialog } from '../../dialogs/TrailerCompany/AddTrailerCompany';

export default function TrailerCompaniesTable() {
    const editTrailerCompanyDialog = useEditTrailerCompanyDialog();
    const createTrailerCompanyDialog = useAddTrailerCompanyDialog();

    const handleCreateTrailerCompany = useCallback(() => {
        createTrailerCompanyDialog.open({});
    }, [createTrailerCompanyDialog]);

    const {
        rows,
        rows_total,
        view,
        headers,
        isLoading,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useTrailersCompanies();

    const updateFilters = useUpdateSearchFilters(default_trailer_companies_filter);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    // const updateFilters = useCallback(
    //     (filters: object) => {
    //         dispatch(_updateFilters(filter_id, filters));
    //     },
    //     [filter_id]
    // );

    const executeAction = useCallback(
        (
            name: string,
            props: {
                row: TrailersTypes.TrailerCompanyRow;
            }
        ) => {
            editTrailerCompanyDialog.open({
                trailerCompanyId: props.row.trailerCompanyId
            });
        },
        []
    );

    return (
        <Table<TrailersTypes.TrailerCompanyRow>
            pageType="TRAILER_COMPANIES"
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.TRAILER_COMPANIES.defaultFilters}
            tableName="trailer_companies"
            rows={rows}
            view={view}
            headers={headers}
            columns={{}}
            isLoading={isLoading}
            filter_id={filter_id}
            onCreateItem={handleCreateTrailerCompany}
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
