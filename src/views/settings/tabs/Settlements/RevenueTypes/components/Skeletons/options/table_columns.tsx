type VariantType = 'text' | 'rectangular' | 'circular';
interface ColumnInterface {
    id: number;
    minWidth: number;
    headerTextWidth: number;
    textWidth: number;
    headerVariant: VariantType;
    variant: VariantType;
    textHeight?: number;
}

const table_columns: ColumnInterface[] = [
    {
        id             : 1,
        minWidth       : 270,
        headerTextWidth: 100,
        textWidth      : 80,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 2,
        minWidth       : 270,
        headerTextWidth: 80,
        textWidth      : 60,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 3,
        minWidth       : 50,
        headerTextWidth: 0,
        textWidth      : 26,
        textHeight     : 26,
        headerVariant  : 'text',
        variant        : 'circular'
    },
    {
        id             : 4,
        minWidth       : 50,
        headerTextWidth: 0,
        textWidth      : 26,
        textHeight     : 26,
        headerVariant  : 'text',
        variant        : 'circular'
    }
];

export default table_columns;
