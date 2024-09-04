import { type MouseEvent, useCallback } from 'react';
import { default_drivers_filters, useMainDrivers } from '@/store/fleet/drivers/hooks';
import { useTrailerOptionsMenu } from '@/views/fleet/trailers/menus/TrailerOptionsMenu';

import { useDriverOptionsMenu } from '@/views/fleet/drivers/menus/DriverOptionsMenu';
import { useTruckOptionsMenu } from '@/views/fleet/trucks/menus/TruckOptionsMenu';
import DriversTypes from '@/store/fleet/drivers/types';
import TableTypes from '@/@core/components/table/types';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import openNewWindow from '@/utils/open-new-window';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import navigateToPage from '@/utils/navigateToPage';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { CustomOrderConfigType } from '@/@core/components/table/TableHeadCell';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { prepareFilters } from '@/@core/components/query-string-cover';
import { useAssignTrailerToTruckMenu } from '@/@core/components/assign/modals/AssignTrailerToTruck';
import { useAssignTruckToDriverMenu } from '@/@core/components/assign/modals/AssignTruckToDriver';
import Table from '../../../../../../@core/components/table/Table';
import columns from './columns';
import { useEditDriverDialog } from '../../../dialogs/EditDriver/EditDriver';
import { useCreateDriverDialog } from '../../../dialogs/CreateDriver';

type TablePropsType = TableTypes.TableProps<DriversTypes.ConvertedDriverRow, true>;
type ExecuteActionProps = {
    document_type_id?: string;
    document_entity_type?: string;
    row: DriversTypes.ConvertedDriverRow;
    event: MouseEvent<HTMLElement>;
    copy_value?: string;
};

const customOrderConfig: CustomOrderConfigType[] = [
    {
        columnId: 'selfie_and_name',
        order   : 'full_name'
    },
    {
        columnId: 'truck_reference_id',
        order   : 'truck.reference_id'
    },
    {
        columnId: 'trailer',
        order   : 'trailer.reference_id'
    },
    {
        columnId: 'plate_number',
        order   : 'plate.number'
    },
    {
        columnId: 'type',
        order   : 'driverType.name'
    },
    {
        columnId: 'selfie',
        order   : 'selfie_thumb_url'
    },
    {
        columnId: 'settlement_revenue_type_name',
        order   : 'revenueType.name'
    },
    {
        columnId: 'settlement_cycle_name',
        order   : 'cycle.name'
    }
];

export default function DriversTable() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const editDriverDialog = useEditDriverDialog();
    const editTruckDialog = useEditTruckDialog();
    const editTrailerDialog = useEditTrailerDialog();

    const createDriverDialog = useCreateDriverDialog();

    const driverOptionsMenu = useDriverOptionsMenu();
    const truckOptionsMenu = useTruckOptionsMenu();
    const trailerOptionsMenu = useTrailerOptionsMenu();
    const assignTrailerToTruckMenu = useAssignTrailerToTruckMenu();
    const assignTruckToDriverMenu = useAssignTruckToDriverMenu();

    const handleCreateDriver = useCallback(() => {
        createDriverDialog.open({
            onSuccessfulCreate: (driver_id) => {
                router.push(`/drivers/${driver_id}`);
                dispatch(DriverActions.isShowEditDriverDialog(true));
            }
        });
    }, [createDriverDialog, dispatch, router]);

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainDrivers();

    const updateFilters = useUpdateSearchFilters(default_drivers_filters);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const handleViewDriver = (driver_id: string, e: MouseEvent) =>
        navigateToPage(`/drivers/${driver_id}`, e);

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            if (props.row.status === 'deleted') {
                switch (name) {
                case 'edit':
                case 'options':
                    switch (props.event.button) {
                    case props.event.ctrlKey && 0:
                    case props.event.metaKey && 0:
                        openNewWindow(`/drivers/${props.row.driverId}`, true);
                        break;
                    case 0:
                        handleViewDriver(props.row.driverId, props.event);
                        break;
                    default:
                        editDriverDialog.open({
                            driver_id  : props.row.driverId,
                            document_id: props.document_type_id
                        });
                        break;
                    }
                    break;
                default:
                    break;
                }
                return;
            }

            switch (name) {
            case 'document':
                switch (props.document_entity_type) {
                case 'truck':
                    editTruckDialog.open({
                        truck_id   : props.row.truckId || '',
                        document_id: props.document_type_id
                    });
                    break;
                case 'trailer':
                    editTrailerDialog.open({
                        trailer_id : props.row.trailer?.trailerId || '',
                        document_id: props.document_type_id
                    });
                    break;
                default:
                    editDriverDialog.open({
                        driver_id  : props.row.driverId,
                        document_id: props.document_type_id
                    });
                    break;
                }
                break;
            case 'assign_truck_to_driver':
                if (props.row.truck) {
                    truckOptionsMenu.open({
                        truck_id  : props.row.truckId || '',
                        driver_id : props.row.driverId,
                        copy_value: props.row.truck?.referenceId || ''
                    })(props.event);
                } else {
                    assignTruckToDriverMenu.open({
                        driverId : props.row.driverId,
                        firstName: props.row.firstName
                    })(props.event);
                }
                break;
            case 'assign_trailer_to_truck':
                if (props.row.trailer) {
                    trailerOptionsMenu.open({
                        trailer_id: props.row.trailer.trailerId,
                        truck_id  : props.row.truckId || ''
                    })(props.event);
                } else {
                    assignTrailerToTruckMenu.open({
                        truckId                : props.row.truckId,
                        title                  : 'core:assign_menu.trailer_to_driver.title',
                        titleTranslationOptions: {
                            firstName: props.row.firstName
                        }
                    })(props.event);
                }
                break;
            case 'edit':
            case 'options':
                switch (props.event.button) {
                case props.event.ctrlKey && 0:
                case props.event.metaKey && 0:
                    openNewWindow(`/drivers/${props.row.driverId}`, true);
                    break;
                case 0:
                    handleViewDriver(props.row.driverId, props.event);
                    break;
                case 2:
                    driverOptionsMenu.open({
                        driver_id: props.row.driverId
                    })(props.event);

                    break;
                default:
                    break;
                }
                break;
            default:
                break;
            }
        },
        []
    );

    return (
        <Table<DriversTypes.ConvertedDriverRow, true>
            pageType="DRIVERS"
            filter_id={filter_id}
            onCreateItem={handleCreateDriver}
            tableName="drivers"
            rows={rows}
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.DRIVERS.defaultFilters}
            headers={headers}
            columns={columns}
            view={view}
            customOrderConfig={customOrderConfig}
            isLoading={isLoading}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            executeAction={executeAction}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            sticky_background_enabled={false}
            pagination
            onUpdateWidth={updateColumnWidth}
        />
    );
}
