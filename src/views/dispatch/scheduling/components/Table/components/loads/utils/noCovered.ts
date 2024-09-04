import { Params } from '@/views/dispatch/scheduling/components/Table/types';

export const noCovered = (data: Params[][]) => {
    let left = 0;
    if (data.length === 0) return left;

    data.forEach((items) => {
        items.forEach((item) => {
            const positionLeft = item.width + Number(item.position.left);
            left = left > positionLeft ? left : positionLeft;
        });
    });
    return left;
};
