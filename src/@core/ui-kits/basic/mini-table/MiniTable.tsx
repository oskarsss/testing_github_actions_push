/* eslint-disable react/no-array-index-key */
import { ReactElement, ReactNode } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import type { MiniTableColumnType, MiniTableExecuteActionType } from './MiniTable.types';
import MiniTableStyled, { type FontSize } from './MiniTable.styled';
import MiniTableHeader from './components/MiniTableHeader';
import MiniTableBody from './components/MiniTableBody';

type Props<Row extends Record<string, any>> = {
    rows: Row[];
    elementKey: keyof Row;
    columns: MiniTableColumnType[];
    executeAction: MiniTableExecuteActionType<Row>;
    ComponentAfterContent?: ReactNode;
    turnOffBorder?: boolean;
    fontSize?: FontSize;
    emptyStateText?: IntlMessageKey | ReactElement;
    stickyHeader?: boolean;
    emptyStateContent?: ReactNode;
};

export default function MiniTable<Row extends Record<string, any>>({
    rows,
    elementKey,
    columns,
    executeAction,
    ComponentAfterContent,
    turnOffBorder,
    fontSize = 'medium',
    emptyStateText,
    emptyStateContent,
    stickyHeader = false
}: Props<Row>) {
    return (
        <MiniTableStyled.Container sx={{ overflow: stickyHeader ? 'auto' : 'initial' }}>
            <MiniTableStyled.CommonTable
                stickyHeader={stickyHeader}
                size="small"
                width="100%"
            >
                <MiniTableHeader
                    turnOffBorder={turnOffBorder}
                    columns={columns}
                    fontSize={fontSize}
                />

                <MiniTableBody
                    rows={rows}
                    elementKey={elementKey}
                    columns={columns}
                    executeAction={executeAction}
                    ComponentAfterContent={ComponentAfterContent}
                    turnOffBorder={turnOffBorder}
                    fontSize={fontSize}
                    emptyStateText={emptyStateText}
                    emptyStateContent={emptyStateContent}
                />
            </MiniTableStyled.CommonTable>
        </MiniTableStyled.Container>
    );
}
