import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { IntlMessageKey, type TFunction } from '@/@types/next-intl';

export interface IExecuteActionProps<Row> {
    event: React.MouseEvent<unknown>;
    row: Row;
}

export interface Columns<Row> {
    field: string;
    headerName: IntlMessageKey;
    minWidth: number;
    variant?: 'text' | 'button' | 'checkbox';
    align: 'center' | 'inherit' | 'right' | 'left' | 'justify' | undefined;
    style?: React.CSSProperties;
    sx?: SxProps<Theme>;
    renderCell: (row: Row, t: TFunction) => string | number | JSX.Element;
    getCellStyle?: (row: Row) => React.CSSProperties;
    onCellClick?: (
        row: Row,
        {
            event,
            executeAction
        }: {
            event: React.MouseEvent;
            executeAction: (name: string, {
                row,
                event
            }: IExecuteActionProps<Row>) => void;
        }
    ) => void;
}

export type ExecuteAction<Row> = (name: string, {
    row,
    event
}: IExecuteActionProps<Row>) => void;

export type RowClickAction<Row> = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row
) => void;
