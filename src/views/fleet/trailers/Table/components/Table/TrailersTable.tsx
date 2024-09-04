import { type MouseEvent, useCallback } from 'react';
import { default_trailers_filter, useMainTrailers } from '@/store/fleet/trailers/hooks';
import { useAppDispatch } from '@/store/hooks';
import Table from '@/@core/components/table/Table';
import { useDriverOptionsMenu } from '@/views/fleet/drivers/menus/DriverOptionsMenu';
import TableTypes from '@/@core/components/table/types';
import { useTruckOptionsMenu } from '@/views/fleet/trucks/menus/TruckOptionsMenu';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import Notes from '@/store/notes/types';
import TrailersTypes from '@/store/fleet/trailers/types';
import { useNotesMenu } from '@/@core/components/notes/Notes';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useTrailerOptionsMenu } from '@/views/fleet/trailers/menus/TrailerOptionsMenu';
import openNewWindow from '@/utils/open-new-window';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import navigateToPage from '@/utils/navigateToPage';
import { CustomOrderConfigType } from '@/@core/components/table/TableHeadCell';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { useAssignDriverToTruckMenu } from '@/@core/components/assign/modals/AssignDriverToTruck';
import { useAssignTruckToTrailerMenu } from '@/@core/components/assign/modals/AssignTruckToTrailer';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import columns from './columns';
import { useAddTrailerDialog } from '../../../dialogs/AddTrailer/AddTrailer';

type TablePropsType = TableTypes.TableProps<TrailersTypes.ConvertedTrailerRow, true>;
type ExecuteActionProps = {
    row: TrailersTypes.ConvertedTrailerRow;
    event: MouseEvent<HTMLElement>;
    document_type_id?: string;
    document_entity_type?: string;
    notes?: Notes.NoteType[];
};

const customOrderConfig: CustomOrderConfigType[] = [
    {
        columnId: 'driver',
        order   : 'driver.full_name'
    },
    {
        columnId: 'truck',
        order   : 'truck.reference_id'
    },
    {
        columnId: 'plate_number',
        order   : 'plate.number'
    },
    {
        columnId: 'type',
        order   : 'trailerType.name'
    }
];

export default function TrailersTable() {
    const createTrailerDialog = useAddTrailerDialog();

    const editTrailerDialog = useEditTrailerDialog();
    const editTruckDialog = useEditTruckDialog();
    const editDriverDialog = useEditDriverDialog();

    const driverOptionsMenu = useDriverOptionsMenu();
    const truckOptionsMenu = useTruckOptionsMenu();
    const trailerOptionsMenu = useTrailerOptionsMenu();

    const assignDriverToTruckMenu = useAssignDriverToTruckMenu();
    const assignTruckToTrailerMenu = useAssignTruckToTrailerMenu();
    const notesMenu = useNotesMenu();
    const dispatch = useAppDispatch();

    const handleCreateTrailer = useCallback(() => {
        createTrailerDialog.open({
            onSuccessfulCreate: (trailer_id) => {
                editTrailerDialog.open({ trailer_id });
            }
        });
    }, [createTrailerDialog, editTrailerDialog]);

    const {
        rows,
        view,
        headers,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainTrailers();

    const copy = useCopyToClipboard();

    const updateFilters = useUpdateSearchFilters(default_trailers_filter);

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const viewTrailer = useCallback(
        (id: string, e: MouseEvent) => navigateToPage(`/trailers/${id}`, e),
        []
    );

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            // if (name === 'copy') {
            //     copy(props., undefined, props.value);
            // }
            if (props.row.status === TrailerStatuses.DELETED) return;
            switch (name) {
            case 'view_driver_options':
                if (props.row.driver) {
                    driverOptionsMenu.open({
                        driver_id: props.row.driverId,
                        truck_id : props.row.truckId
                    })(props.event);
                } else {
                    assignDriverToTruckMenu.open({
                        truckId        : props.row.truckId,
                        referenceId    : props.row.referenceId,
                        title          : 'core:assign_menu.driver_to_trailer.title',
                        requestMessages: {
                            loading: 'core:assign_menu.driver_to_trailer.message.loading',
                            success: 'core:assign_menu.driver_to_trailer.message.success'
                        },
                        isPrimaryDriverSelect: true
                    })(props.event);
                }
                break;
            case 'view_truck_options':
                if (props.row.truck) {
                    truckOptionsMenu.open({
                        truck_id  : props.row.truckId,
                        trailerId : props.row.trailerId,
                        copy_value: props.row.truck?.referenceId || ''
                    })(props.event);
                } else {
                    assignTruckToTrailerMenu.open({
                        trailerId  : props.row.trailerId,
                        referenceId: props.row.referenceId
                    })(props.event);
                }
                break;
            case 'edit':
            case 'options':
                switch (props.event.button) {
                case props.event.ctrlKey && 0:
                case props.event.metaKey && 0:
                    openNewWindow(`/trailers/${props.row.trailerId}`, true);
                    break;
                case 0:
                    viewTrailer(props.row.trailerId, props.event);
                    break;
                case 2:
                    trailerOptionsMenu.open({
                        trailer_id: props.row.trailerId
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            case 'document':
                switch (props.document_entity_type) {
                case 'truck':
                    editTruckDialog.open({
                        truck_id   : props.row.truckId,
                        document_id: props.document_type_id
                    });
                    break;
                case 'driver':
                    editDriverDialog.open({
                        driver_id  : props.row.driverId,
                        document_id: props.document_type_id
                    });
                    break;
                default:
                    editTrailerDialog.open({
                        trailer_id : props.row.trailerId,
                        document_id: props.document_type_id
                    });
                    break;
                }

                break;
            case 'set_view_notes_anchor':
                notesMenu.open({
                    entity_id  : props.row.trailerId,
                    entity_type: 'trailer',
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
            assignTruckToTrailerMenu,
            driverOptionsMenu,
            editDriverDialog,
            editTrailerDialog,
            editTruckDialog,
            notesMenu,
            trailerOptionsMenu,
            truckOptionsMenu,
            viewTrailer
        ]
    );

    return (
        <Table<TrailersTypes.ConvertedTrailerRow, true>
            pageType="TRAILERS"
            filter_id={filter_id}
            onCreateItem={handleCreateTrailer}
            defaultFilters={PAGES_FILTERS_CONFIG.FLEET.TRAILERS.defaultFilters}
            tableName="trailers"
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
        />
    );
}
