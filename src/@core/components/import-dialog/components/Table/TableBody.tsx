import React, { useState } from 'react';
import Import from '@/store/import/types';
import { ExtractData } from '@/store/import/hooks';
import BodyCell from './BodyCell';
import { WrapStickyBody, Row } from './styled';

type Props = {
    rows: Import.RowType[];
    columns: ExtractData['data']['columns'];
};
export default function TableBody({
    rows,
    columns
}: Props) {
    const [select, setSelect] = useState<number | null>(null);
    const onSelect = (index: number) => setSelect((prev) => (prev === index ? null : index));

    return (
        <>
            {rows.map((row, index) => {
                const arraySticky: React.ReactNode[] = [];
                const arrayDefault: React.ReactNode[] = [];
                let width_sticky_array = 0;

                Object.entries(row.cells).forEach(([key, cell]) => {
                    const column = columns[key];
                    if (!column) return;

                    const body_cell = (
                        <BodyCell
                            key={key}
                            width={column.width}
                            cell={cell}
                            column_name={key}
                        />
                    );

                    if (column.sticky) {
                        width_sticky_array += column.width + 24;
                        arraySticky[column.position] = body_cell;
                    } else {
                        arrayDefault[column.position] = body_cell;
                    }
                });

                return (
                    <Row
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={`row-hover ${select === index && ' row-selected'}`}
                        onClick={() => onSelect(index)}
                    >
                        {arraySticky.length > 0 && (
                            <WrapStickyBody width={width_sticky_array}>
                                {...arraySticky}
                            </WrapStickyBody>
                        )}
                        <div style={{ display: 'flex', minWidth: '100%' }}>{...arrayDefault}</div>
                    </Row>
                );
            })}
        </>
    );
}
