type VariantType = 'text' | 'rectangular' | 'circular';
interface ColumnInterface {
    id: number;
    minWidth: number;
    headerTextWidth: number;
    textWidth: number;
    headerVariant: VariantType;
    variant: VariantType;
}

const table_columns: ColumnInterface[] = [
    {
        id             : 1,
        minWidth       : 220,
        headerTextWidth: 100,
        textWidth      : 80,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 2,
        minWidth       : 85,
        headerTextWidth: 60,
        textWidth      : 60,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 3,
        minWidth       : 100,
        headerTextWidth: 60,
        textWidth      : 60,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 4,
        minWidth       : 140,
        headerTextWidth: 100,
        textWidth      : 100,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 5,
        minWidth       : 100,
        headerTextWidth: 80,
        textWidth      : 60,
        headerVariant  : 'text',
        variant        : 'text'
    },
    {
        id             : 6,
        minWidth       : 140,
        headerTextWidth: 0,
        textWidth      : 100,
        headerVariant  : 'text',
        variant        : 'text'
    }
];

export default table_columns;
