import edit_loads_columns from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Loads/columns';

const { columns } = edit_loads_columns;

const manifestDetailsColumns = Object.freeze({
    first        : columns[0].minWidth - 1,
    second       : columns[1].minWidth,
    emptyMi      : columns[2].minWidth,
    loadedMi     : columns[3].minWidth,
    loadAndStops : (columns[4]?.minWidth || 0) + (columns[5]?.minWidth || 0),
    payItem      : columns[6].minWidth,
    units        : columns[7].minWidth,
    rateAndAmount: (columns[8]?.minWidth || 50) - 1
});

export default manifestDetailsColumns;
