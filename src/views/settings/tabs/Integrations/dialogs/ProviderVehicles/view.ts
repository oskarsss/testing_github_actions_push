import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import TableTypes from '@/@core/components/table/types';
import type { TFunction } from '@/@types/next-intl';
import { PageModel_View_Column_Type } from '@proto/models/model_page';

const createColumn = (
    view: {
        columnId: string;
        type: PageModel_View_Column_Type;
        name: string;
        width: number;
    } & Partial<TableTypes.ViewColumn>
): TableTypes.ViewColumn => ({
    sticky      : true,
    borderLeft  : false,
    borderRight : false,
    footerTotal : false,
    headerId    : '0',
    sequence    : 0,
    friendlyName: '',
    ...view
});

const PROVIDER_VEHICLES_VIEW = (t: TFunction) =>
    ({
        viewId   : '2',
        name     : 'Default',
        sequence : 0,
        rowHeight: PAGE_ROW_HEIGHT_CONFIG.small,
        columns  : [
            createColumn({
                columnId: 'referenceId',
                name    : t('common:id'),
                width   : 200,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : true
            }),
            createColumn({
                columnId: 'connected_status',
                name    : '',
                width   : 130,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
                sticky  : true
            }),
            createColumn({
                columnId: 'connected',
                name    : '',
                width   : 160,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
                sticky  : true
            }),
            createColumn({
                columnId: 'friendlyEntityId',
                name    : t('modals:settings.integrations.vehicles.dialog.table.columns.equipment_id'),
                width   : 160,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'entityType',
                name    : t('modals:settings.integrations.vehicles.dialog.table.columns.entity_type'),
                width   : 140,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
                sticky  : false
            }),
            createColumn({
                columnId: 'make',
                name    : t('common:make'),
                width   : 160,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'year',
                name    : t('common:year'),
                width   : 100,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'model',
                name    : t('common:model'),
                width   : 140,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'name',
                name    : t('modals:settings.integrations.vehicles.dialog.table.columns.name'),
                width   : 200,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'vin',
                name    : t('common:vin'),
                width   : 230,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'deviceSerial',
                name    : t('modals:settings.integrations.vehicles.dialog.table.columns.device_serial'),
                width   : 230,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            })
        ]
    } as TableTypes.View);

export default PROVIDER_VEHICLES_VIEW;
