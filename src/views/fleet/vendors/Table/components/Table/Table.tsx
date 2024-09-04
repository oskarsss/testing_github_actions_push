import { default_vendors_filters, useMainVendors } from '@/store/fleet/vendors/hooks';
import { useCallback, MouseEvent } from 'react';
import Table from '@/@core/components/table/Table';
import VendorsTypes from '@/store/fleet/vendors/types';
import TableTypes from '@/@core/components/table/types';
import { useVendorOptionsMenu } from '@/views/fleet/vendors/menus/VendorOptionsMenu';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { useEditVendorDialog } from '../../../dialogs/EditVendor/EditVendor';
import { useAddVendorDialog } from '../../../dialogs/AddVendor/AddVendor';

type TablePropsType = TableTypes.TableProps<VendorsTypes.VendorRow, true>;
type ExecuteActionProps = {
    document_type_id?: string;
    document_entity_type?: string;
    row: VendorsTypes.VendorRow;
    event: MouseEvent<HTMLElement>;
    copy_value?: string;
};

export default function VendorsTable() {
    const editVendorDialog = useEditVendorDialog();
    const createVendorDialog = useAddVendorDialog();
    const vendorOptionsMenu = useVendorOptionsMenu();

    const handleCreateVendor = useCallback(() => {
        createVendorDialog.open({
            onAdded: (vendor_id) => {
                editVendorDialog.open({ vendor_id });
            }
        });
    }, [createVendorDialog, editVendorDialog]);

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainVendors();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const updateFilters = useUpdateSearchFilters(default_vendors_filters);

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            switch (name) {
            case 'document':
                editVendorDialog.open({
                    vendor_id  : props.row.vendorId,
                    document_id: props.document_type_id
                });
                break;
            default:
                switch (props.event.button) {
                case 0:
                    editVendorDialog.open({
                        vendor_id: props.row.vendorId
                    });
                    break;
                case 2:
                    vendorOptionsMenu.open({
                        id  : props.row.vendorId,
                        name: props.row.name
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            }
        },
        [editVendorDialog, vendorOptionsMenu]
    );

    return (
        <Table<VendorsTypes.VendorRow, true>
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.VENDORS.defaultFilters}
            filter_id={filter_id}
            tableName="vendors"
            pageType="VENDORS"
            onCreateItem={handleCreateVendor}
            rows={rows}
            view={view}
            headers={headers}
            columns={{}}
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
