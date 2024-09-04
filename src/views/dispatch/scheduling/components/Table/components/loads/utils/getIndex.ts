import { Params } from '@/views/dispatch/scheduling/components/Table/types';

export const getIndex = (itemsRows: Params[][], params: Params) => {
    let rowIndex = 0;
    itemsRows.forEach((itemRows, indexRow) => {
        const { left } = params.position;
        const right = left + params.width;
        itemRows.forEach((prevItem) => {
            const { left: prevItemLeft } = prevItem.position;
            const prevItemRight = prevItemLeft + prevItem.width;
            if (left < prevItemRight && right > prevItemLeft) {
                rowIndex = indexRow + 1;
            }
        });
    });
    return rowIndex;
};
