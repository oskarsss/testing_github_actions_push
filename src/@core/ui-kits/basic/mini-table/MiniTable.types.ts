import { MouseEvent, ReactNode, CSSProperties, ReactElement } from 'react';
import { Theme, SxProps } from '@mui/material';
import type { IntlMessageKey, TFunction } from '@/@types/next-intl';

type Props<RowType extends object = any> = {
    event: MouseEvent<HTMLElement>;
    row: RowType;
    executeAction?: (name: string, row: RowType) => void;
};

export type MiniTableExecuteActionType<RowType extends object = any> = (
    name: string,
    props: Props<RowType>
) => void;

export type Cells = {
    text: string;
    colSpan: number;
    isCopy: boolean;
    isTitle: boolean;
    flex_start?: boolean;
    component?: ReactNode;
    styles?: CSSProperties;
}[];

export type MiniTableClickHandler<RowType extends object = any> = (
    row: RowType,
    props: {
        executeAction: (name: string, props: Props<RowType>) => void;
        event: MouseEvent<HTMLTableCellElement>;
    }
) => void;

export interface MiniTableColumnType<RowType extends object = any> {
    field: string;
    headerName: IntlMessageKey | ReactElement | string;
    flex_start?: boolean;
    color?: string;
    minWidth: CSSProperties['minWidth'];
    maxWidth?: CSSProperties['maxWidth'];
    colSpan?: number;
    styles?: CSSProperties;

    // TODO: if isAmount remove from styled it will remove from here
    isAmount?: boolean;
    hasMaxWidth?: boolean;
    onClick?: MiniTableClickHandler<RowType>;
    getCellStyle?: (row: RowType) => SxProps<Theme>;
    renderCell: (row: RowType, t: TFunction) => ReactNode;
}
