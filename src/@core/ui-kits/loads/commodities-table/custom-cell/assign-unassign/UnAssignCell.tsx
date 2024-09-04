import AssignUnassignButtons from '@/@core/ui-kits/loads/commodities-table/custom-cell/assign-unassign/Buttons';
import React from 'react';

type Props = {
    onUnassign: (commodityId: string) => void;
    commodityId: string;
    disabled?: boolean;
};

export default function UnAssignCell({
    onUnassign,
    commodityId,
    disabled = false
}: Props) {
    const assignCommodity = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;

        onUnassign(commodityId);
    };

    return (
        <AssignUnassignButtons.UnassignButton
            onClick={assignCommodity}
            disabled={disabled}
            isLoading={disabled}
        />
    );
}
