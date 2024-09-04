import { type MouseEvent, useCallback } from 'react';
import { default_trucks_filters, useMainTrucks } from '@/store/fleet/trucks/hooks';
import TrucksTypes from '@/store/fleet/trucks/types';
import Table from '@/@core/components/table/Table';
import { useDriverOptionsMenu } from '@/views/fleet/drivers/menus/DriverOptionsMenu';
import TableTypes from '@/@core/components/table/types';
import { useTruckOptionsMenu } from '@/views/fleet/trucks/menus/TruckOptionsMenu';
import { useTrailerOptionsMenu } from '@/views/fleet/trailers/menus/TrailerOptionsMenu';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useNotesMenu } from '@/@core/components/notes/Notes';
import Notes from '@/store/notes/types';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import openNewWindow from '@/utils/open-new-window';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import navigateToPage from '@/utils/navigateToPage';
import { CustomOrderConfigType } from '@/@core/components/table/TableHeadCell';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { useAssignDriverToTruckMenu } from '@/@core/components/assign/modals/AssignDriverToTruck';
import { useAssignTrailerToTruckMenu } from '@/@core/components/assign/modals/AssignTrailerToTruck';
import columns from './columns';
import { useAddTruckDialog } from '../../../dialogs/AddTruck/AddTruck';

type TablePropsType = TableTypes.TableProps<TrucksTypes.ConvertedTruckRow, true>;
type ExecuteActionProps = {
    document_type_id?: string;
    document_entity_type?: string;
    row: TrucksTypes.ConvertedTruckRow;
    event: MouseEvent<HTMLElement>;
    copy_value?: string;
    notes?: Notes.NoteType[];
};

const customOrderConfig: CustomOrderConfigType[] = [
    {
        columnId: 'driver',
        order   : 'driver.full_name'
    },
    {
        columnId: 'trailer_reference_id',
        order   : 'trailer.reference_id'
    },
    {
        columnId: 'plate_number',
        order   : 'plate.number'
    },
    {
        columnId: 'second_driver',
        order   : 'secondDriver.full_name'
    },
    {
        columnId: 'vendor_name',
        order   : 'vendor.name'
    }
];

export default function TrucksTable() {
    const createTruckDialog = useAddTruckDialog();
    const editTruckDialog = useEditTruckDialog();
    const editTrailerDialog = useEditTrailerDialog();
    const editDriverDialog = useEditDriverDialog();
    const assignDriverToTruckMenu = useAssignDriverToTruckMenu();
    const assignTrailerToTruckMenu = useAssignTrailerToTruckMenu();
    const notesMenu = useNotesMenu();

    /** OPTIONS MENU */
    const driverOptionsMenu = useDriverOptionsMenu();
    const truckOptionsMenu = useTruckOptionsMenu();
    const trailerOptionsMenu = useTrailerOptionsMenu();

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainTrucks();

    const updateFilters = useUpdateSearchFilters(default_trucks_filters);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const viewTruck = useCallback(
        (truck_id: string, e: MouseEvent) => navigateToPage(`/trucks/${truck_id}`, e),
        []
    );

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            const driverId = props.row.driver?.driverId || '';

            if (props.row.status === TrailerStatuses.DELETED) return;

            switch (name) {
            case 'document':
                switch (props.document_entity_type) {
                case 'trailer':
                    editTrailerDialog.open({
                        trailer_id : props.row.trailerId,
                        document_id: props.document_type_id
                    });
                    break;
                case 'driver':
                    editDriverDialog.open({
                        driver_id  : driverId,
                        document_id: props.document_type_id
                    });
                    break;
                default:
                    editTruckDialog.open({
                        truck_id   : props.row.truckId,
                        document_id: props.document_type_id
                    });
                    break;
                }

                break;
            case 'set_assign_driver':
                if (props.row.driver) {
                    driverOptionsMenu.open({
                        driver_id: driverId,
                        truck_id : props.row.truckId
                    })(props.event);
                } else {
                    assignDriverToTruckMenu.open({
                        truckId              : props.row.truckId,
                        referenceId          : props.row.referenceId,
                        isPrimaryDriverSelect: true
                    })(props.event);
                }
                break;
            case 'set_assign_second_driver':
                if (props.row.secondDriver) {
                    const secondDriverId = props.row.secondDriver.driverId;
                    driverOptionsMenu.open({
                        driver_id: secondDriverId,
                        truck_id : props.row.truckId
                    })(props.event);
                } else {
                    assignDriverToTruckMenu.open({
                        truckId    : props.row.truckId,
                        referenceId: props.row.referenceId
                    })(props.event);
                }
                break;
            case 'edit':
            case 'truck_options':
                switch (props.event.button) {
                case props.event.ctrlKey && 0:
                case props.event.metaKey && 0:
                    openNewWindow(`/trucks/${props.row.truckId}`, true);
                    break;
                case 0:
                    viewTruck(props.row.truckId, props.event);
                    break;
                case 2:
                    truckOptionsMenu.open({
                        truck_id  : props.row.truckId,
                        trailerId : props.row.trailerId,
                        copy_value: props.copy_value as string
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            case 'view_trailer_options':
                if (props.row.trailer) {
                    trailerOptionsMenu.open({
                        trailer_id: props.row.trailerId,
                        truck_id  : props.row.truckId
                    })(props.event);
                } else {
                    assignTrailerToTruckMenu.open({
                        truckId                : props.row.truckId,
                        titleTranslationOptions: {
                            referenceId: props.row.referenceId
                        }
                    })(props.event);
                }
                break;
            case 'set_view_notes_anchor':
                notesMenu.open({
                    entity_type: 'truck',
                    entity_id  : props.row.truckId,
                    size       : 'small',
                    variant    : 'menu'
                })(props.event);
                break;
            default:
                break;
            }
        },
        [
            assignDriverToTruckMenu,
            assignTrailerToTruckMenu,
            driverOptionsMenu,
            editDriverDialog,
            editTrailerDialog,
            editTruckDialog,
            notesMenu,
            trailerOptionsMenu,
            truckOptionsMenu,
            viewTruck
        ]
    );

    const onOpenAddTruckDialog = () => {
        createTruckDialog.open({
            onSuccessfulCreate: (truck_id) => {
                editTruckDialog.open({ truck_id });
            }
        });
    };

    return (
        <Table<TrucksTypes.ConvertedTruckRow, true>
            pageType="TRUCKS"
            onCreateItem={onOpenAddTruckDialog}
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.TRUCKS.defaultFilters}
            tableName="trucks"
            customOrderConfig={customOrderConfig}
            rows={rows}
            columns={columns}
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
            sticky_background_enabled={false}
            onUpdateWidth={updateColumnWidth}
            filter_id={filter_id}
        />
    );
}
