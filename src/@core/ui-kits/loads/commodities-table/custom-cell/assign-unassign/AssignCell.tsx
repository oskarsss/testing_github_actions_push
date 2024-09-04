import AssignUnassignButtons from '@/@core/ui-kits/loads/commodities-table/custom-cell/assign-unassign/Buttons';

type Props = {
    onAssign: (commodityId: string) => void;
    commodityId: string;
    disabled?: boolean;
};

export default function AssignCell({
    onAssign,
    commodityId,
    disabled = false
}: Props) {
    const assignCommodity = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;

        onAssign(commodityId);
    };

    return (
        <AssignUnassignButtons.AssignButton
            onClick={assignCommodity}
            disabled={disabled}
            isLoading={false}
        />
    );
}
