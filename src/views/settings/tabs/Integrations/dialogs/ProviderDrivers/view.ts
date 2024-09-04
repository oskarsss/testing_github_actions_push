import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import TableTypes from '@/@core/components/table/types';
import SYSTEM from '@/@system';
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

const PROVIDER_DRIVERS_VIEW = (t: TFunction) =>
    ({
        rowHeight: PAGE_ROW_HEIGHT_CONFIG.small,
        viewId   : '1',
        name     : 'Default',
        sequence : 0,
        columns  : [
            createColumn({
                columnId: 'referenceId',
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                name    : t('common:id'),
                sticky  : true,
                width   : 140
            }),
            createColumn({
                columnId: 'username',
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                name    : t('modals:settings.integrations.drivers.table.columns.username'),
                sticky  : true,
                width   : 140
            }),
            createColumn({
                columnId: 'name',
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                name    : t('modals:settings.integrations.drivers.table.columns.name'),
                width   : 220,
                sticky  : false
            }),
            createColumn({
                columnId: 'phone',
                name    : t('modals:settings.integrations.drivers.table.columns.phone'),
                width   : 160,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'licenseNumber',
                name    : t('modals:settings.integrations.drivers.table.columns.license_number'),
                width   : 200,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'licenseState',
                name    : t('modals:settings.integrations.drivers.table.columns.license_state'),
                width   : 130,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky  : false
            }),
            createColumn({
                columnId: 'status',
                name    : t('common:status'),
                width   : 100,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
                sticky  : false
            }),
            createColumn({
                columnId: 'connected_status',
                name    : '',
                width   : 140,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM,
                sticky  : true
            }),
            createColumn({
                columnId: 'connected',
                sticky  : true,
                name    : '',
                width   : 160,
                type    : PageModel_View_Column_Type.COLUMN_TYPE_CUSTOM
            }),
            createColumn({
                columnId: 'friendlyEntityId',
                name    : t('modals:settings.integrations.drivers.table.columns.driver_id', {
                    name: SYSTEM.TMS_FRIENDLY_NAME
                }),
                width : 150,
                type  : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky: false
            }),
            createColumn({
                columnId: 'vektorDriverName',
                name    : t('modals:settings.integrations.drivers.table.columns.driver_name', {
                    name: SYSTEM.TMS_FRIENDLY_NAME
                }),
                width : 260,
                type  : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky: false
            }),
            createColumn({
                columnId: 'vektorLicenseNumber',
                name    : t('modals:settings.integrations.drivers.table.columns.license_number_name', {
                    name: SYSTEM.TMS_FRIENDLY_NAME
                }),
                width : 200,
                type  : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky: false
            }),
            createColumn({
                columnId: 'vektorLicenseState',
                name    : t('modals:settings.integrations.drivers.table.columns.license_state_name', {
                    name: SYSTEM.TMS_FRIENDLY_NAME
                }),
                width : 208,
                type  : PageModel_View_Column_Type.COLUMN_TYPE_TEXT,
                sticky: false
            })
        ]
    } as TableTypes.View);

export default PROVIDER_DRIVERS_VIEW;
