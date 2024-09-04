import React from 'react';
import LocationCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/LocationCapListCell';
import NoteCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/NoteCapListCell';
import TruckCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/TruckCapListCell';
import { filterTruckI } from '@/views/dispatch/scheduling/dialogs/CapList/helpers';
import TrailerTypeCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/TrailerTypeCapListCell';
import TruckTypeCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/TruckTypeCapListCell';
import EmptyAtCapListCell from '@/views/dispatch/scheduling/dialogs/CapList/components/caplist-table/custom-cell/EmptyAtCapListCell';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

const columns: MiniTableColumnType<filterTruckI>[] = [
    {
        headerName: 'schedule:dialogs.cap_list.table.header.titles.empty_at',
        field     : 'loads',
        minWidth  : 100,
        renderCell: (row) => <EmptyAtCapListCell emptyAt={row.empty_at} />
    },
    {
        headerName: 'entity:truck',
        field     : 'reference_id',
        minWidth  : 170,
        renderCell: (row) => (
            <TruckCapListCell
                truckReferenceId={row.truck_reference_id}
                driverId={row.driver_id}
            />
        )
    },
    {
        headerName: 'schedule:dialogs.cap_list.table.header.titles.truck_type',
        field     : 'truck_type',
        minWidth  : 160,
        renderCell: (row) => <TruckTypeCapListCell truckType={row.truck_type} />
    },
    {
        headerName: 'common:location',
        field     : 'location',
        minWidth  : 180,
        renderCell: (row) => <LocationCapListCell row={row} />
    },

    {
        headerName: 'schedule:dialogs.cap_list.table.header.titles.trailer_type',
        field     : 'trailer_type',
        minWidth  : 160,
        renderCell: (row) => <TrailerTypeCapListCell trailerTypeId={row.trailer_type_id} />
    },
    {
        headerName: 'schedule:dialogs.cap_list.table.header.titles.note',
        field     : 'note',
        minWidth  : 250,
        styles    : {
            paddingLeft: '5px !important'
        },
        renderCell: (row) => (
            <NoteCapListCell
                truckId={row.truckId}
                note={row.note}
            />
        )
    }
];

export default columns;
