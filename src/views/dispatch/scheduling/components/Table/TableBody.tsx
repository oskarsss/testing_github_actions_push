import { memo, useMemo } from 'react';
import Scheduling from '@/store/dispatch/scheduling/types';
import { columnType } from './types';
import { ContainerBody } from './styled';
import Row from './TableBodyRow';

type Props = {
    columns: columnType[];
    rows: Scheduling.TruckManifestRow[];
};

const SchedulingTableBody = ({
    columns,
    rows
}: Props) => {
    const withData = useMemo(() => {
        let totalFixedWidth = 0;
        let totalWidthRowOfWeek = 0;
        const days = [];
        columns.forEach((col) => {
            if (col.sticky) {
                totalFixedWidth += col.minWidth;
            } else {
                totalWidthRowOfWeek += col.minWidth;
                days.push(col.day);
            }
        });
        const quantityMinutesInPeriod = days.length * 24 * 60;
        const widthOneMin = totalWidthRowOfWeek / quantityMinutesInPeriod;

        return {
            widthOneMin,
            totalFixedWidth,
            totalWidthRowOfWeek
        };
    }, [columns]);

    return (
        <ContainerBody>
            {rows.map((row) => (
                <Row
                    key={row.truckId}
                    row={row}
                    totalFixedWidth={withData.totalFixedWidth}
                    totalWidthRowOfWeek={withData.totalWidthRowOfWeek}
                    columns={columns}
                    widthOneMin={withData.widthOneMin}
                />
            ))}
        </ContainerBody>
    );
};

export default memo(SchedulingTableBody);
