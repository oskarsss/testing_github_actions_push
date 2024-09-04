import { memo, useCallback, useState } from 'react';
import Scheduling from '@/store/dispatch/scheduling/types';
import RowOfWeek from './components/loads/RowOfWeek';
import Truck from './components/truck/Truck';
import { columnType } from './types';
import { ContainerRow, RowFixed, RowRegular } from './styled';

const MIN_HEIGHT = 190;

export type Props = {
    columns: columnType[];
    row: Scheduling.TruckManifestRow;
    totalFixedWidth: number;
    widthOneMin: number;
    totalWidthRowOfWeek: number;
};

const SchedulingTableBodyRow = ({
    row,
    totalFixedWidth,
    columns,
    widthOneMin,
    totalWidthRowOfWeek
}: Props) => {
    const [height, setHeight] = useState(MIN_HEIGHT);

    const changeHeight = useCallback((newHeight: number) => {
        setHeight(() => {
            if (newHeight < MIN_HEIGHT) return MIN_HEIGHT;
            return newHeight;
        });
    }, []);

    return (
        <ContainerRow
            key={row.truckId}
            data-truck-id={row.truckId}
        >
            {/* --------------- DRIVER INFO --------------- */}
            <RowFixed
                minHeight={height}
                width={totalFixedWidth}
            >
                <Truck truck={row} />
            </RowFixed>

            {/* --------------- ROW OF WEEK --------------- */}
            <RowRegular totalFixedWidth={totalFixedWidth}>
                <RowOfWeek
                    columns={columns.filter((col) => !col.sticky)}
                    row={row}
                    totalWidthRowOfWeek={totalWidthRowOfWeek}
                    changeHeight={changeHeight}
                    widthOneMin={widthOneMin}
                />
            </RowRegular>
        </ContainerRow>
    );
};

export default memo(SchedulingTableBodyRow);
