import { default_plates_filters, useMainPlates } from '@/store/fleet/plates/hooks';
import { useAppDispatch } from '@/store/hooks';
import PlatesTypes from '@/store/fleet/plates/types';
import Table from '@/@core/components/table/Table';
import { useCallback, MouseEvent } from 'react';
import { usePlateOptionsMenu } from '@/views/fleet/plates/menus/PlateOptionsMenu';
import TableTypes from '@/@core/components/table/types';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { prepareFilters } from '@/@core/components/query-string-cover';
import { useEditPlateDialog } from '../../../dialogs/EditPlate/EditPlate';
import columns from './columns';
import { useAddPlateDialog } from '../../../dialogs/AddPlate/AddPlate';

type TablePropsType = TableTypes.TableProps<PlatesTypes.Row, true>;
type ExecuteActionProps = {
    row: PlatesTypes.Row;
    event: MouseEvent<HTMLElement>;
    document_type_id?: string;
    document_entity_type?: string;
};

export default function PlatesTable() {
    const dispatch = useAppDispatch();
    const editPlateDialog = useEditPlateDialog();
    const createPlateDialog = useAddPlateDialog();
    const plateOptionsMenu = usePlateOptionsMenu();

    const handleCreatePlate = useCallback(() => {
        createPlateDialog.open({});
    }, [createPlateDialog]);

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainPlates();

    const updateFilters = useUpdateSearchFilters(default_plates_filters);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            switch (name) {
            case 'document':
                editPlateDialog.open({
                    plate_id   : props.row.plateId,
                    document_id: props.document_type_id
                });
                break;
            default:
                switch (props.event.button) {
                case 0:
                    editPlateDialog.open({
                        plate_id: props.row.plateId
                    });
                    break;
                case 2:
                    plateOptionsMenu.open({
                        id    : props.row.plateId,
                        number: props.row.number
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            }
        },
        []
    );

    return (
        <Table<PlatesTypes.Row, true>
            pageType="PLATES"
            rows={rows}
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.PLATES.defaultFilters}
            columns={columns}
            filter_id={filter_id}
            tableName="plates"
            onCreateItem={handleCreatePlate}
            headers={headers}
            view={view}
            isLoading={isLoading}
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
