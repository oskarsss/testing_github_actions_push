import React, { memo } from 'react';
import { columnType } from '@/views/dispatch/scheduling/components/Table/types';
import NowIndicator from './NowIndicator';
import { Container } from './styled';

const SchedulingLoadsColumn = ({
    columns,
    widthOneMin
}: {
    columns: columnType[];
    widthOneMin: number;
}) => (
    <>
        {columns.map((col, index) => (
            <Container
                key={col.id ?? index}
                width={col.minWidth}
            >
                {col.today && <NowIndicator widthOneMin={widthOneMin} />}
            </Container>
        ))}
    </>
);

export default memo(SchedulingLoadsColumn);
