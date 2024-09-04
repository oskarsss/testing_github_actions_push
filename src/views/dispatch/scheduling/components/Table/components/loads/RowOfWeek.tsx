import React, { memo, useCallback, useRef } from 'react';

import {
    changeHeightType,
    changeLeftNoCoveredType,
    columnType
} from '@/views/dispatch/scheduling/components/Table/types';
import Scheduling from '@/store/dispatch/scheduling/types';
import { useEditTimeOffDialog } from '@/views/dispatch/scheduling/dialogs/TimeOff/EditTimeOffDialog';
import { noCovered } from '@/views/dispatch/scheduling/components/Table/components/loads/utils/noCovered';
import Columns from './columns/Columns';
import NoCovered from './noCovered/NoCovered';
import RenderItems from './renderItems/RenderItems';
import { Container } from './styled';

export type Props = {
    columns: columnType[];
    row: Scheduling.TruckManifestRow;
    changeHeight: changeHeightType;
    widthOneMin: number;
    totalWidthRowOfWeek: number;
};

const RowOfWeek = ({
    columns,
    row,
    changeHeight,
    totalWidthRowOfWeek,
    widthOneMin
}: Props) => {
    const leftNoCovered = useRef(0);
    const editTimeOffDialog = useEditTimeOffDialog();

    const openEditTimeOffDialog = useCallback(
        (event: React.MouseEvent, time_off: Scheduling.TimeOffType) => {
            editTimeOffDialog.open({
                time_off,
                truck_id: row.truckId
            });
        },
        [editTimeOffDialog, row.truckId]
    );

    const changeLeftNoCovered: changeLeftNoCoveredType = useCallback((itemsRows) => {
        leftNoCovered.current = noCovered(itemsRows);
    }, []);

    return (
        <Container key={row.truckId}>
            <Columns
                columns={columns}
                widthOneMin={widthOneMin}
            />
            <RenderItems
                widthOneMin={widthOneMin}
                changeHeight={changeHeight}
                manifests={row.manifests}
                timeOffs={row.timeOffs}
                covered={row.covered}
                changeLeftNoCovered={changeLeftNoCovered}
                openEditTimeOffDialog={openEditTimeOffDialog}
            />
            <NoCovered
                covered={row.covered}
                timeUncovered={row.timeUncovered}
                totalWidthRowOfWeek={totalWidthRowOfWeek}
                leftNoCovered={leftNoCovered}
            />
        </Container>
    );
};

export default memo(RowOfWeek);
