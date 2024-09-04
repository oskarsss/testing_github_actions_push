import DialogComponents from '@/@core/ui-kits/common-dialog';
import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ManifestStopsTableActionsStyled from '@/views/dispatch/manifests/details/sections/tables/stops/actions/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { CommodityModel } from '@proto/models/model_commodity';
import CommoditiesTable from '@/@core/ui-kits/loads/commodities-table';
import { useCreateCommodityDialog } from '@/@core/ui-kits/loads/commodities-table/modals/CreateCommodity';
import columns from '@/@core/ui-kits/loads/commodities-table/columns';
import AssignCell from '@/@core/ui-kits/loads/commodities-table/custom-cell/assign-unassign/AssignCell';
import UnAssignCell from '@/@core/ui-kits/loads/commodities-table/custom-cell/assign-unassign/UnAssignCell';
import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

const TableIndicator = styled(Stack)<{ type: 'assigned' | 'not_assigned' }>(({
    theme,
    type
}) => ({
    flexDirection    : 'row',
    alignItems       : 'center',
    gap              : '6px',
    width            : '100%',
    height           : '23px',
    padding          : '0px 10px',
    fontSize         : '12px',
    fontWeight       : 500,
    lineHeight       : 1.33,
    letterSpacing    : '0.12px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor:
        type === 'assigned'
            ? theme.palette.semantic.border.success.primary
            : theme.palette.semantic.border.tertiary,
    color:
        type === 'assigned' ? theme.palette.semantic.text.success : theme.palette.utility.text.gray,
    background:
        type === 'assigned'
            ? theme.palette.utility.foreground.success.secondary
            : theme.palette.semantic.foreground.secondary,

    svg: {
        width : '16px',
        height: '16px',
        color:
            type === 'assigned'
                ? theme.palette.utility.foreground.success.primary
                : theme.palette.utility.foreground.gray.primary
    }
}));

type Props = {
    onAssign: (commodityId: string) => void;
    onUnassign: (commodityId: string) => void;
    assignedCommodities: CommodityModel[];
    assignableCommodities: CommodityModel[];
    disabled?: boolean;
    loadId: string;
};

export default function Commodity({
    assignedCommodities,
    assignableCommodities,
    onAssign,
    onUnassign,
    disabled = false,
    loadId
}: Props) {
    const { t } = useAppTranslation();
    const createDialog = useCreateCommodityDialog();

    const createCommodity = () => {
        createDialog.open({ loadId });
    };

    const assignedColumns = useMemo(
        () => [
            {
                field     : 'assignedColumns',
                headerName: '',
                minWidth  : 30,
                flex_start: true,
                styles    : { padding: 0 },
                renderCell: (row) => (
                    <UnAssignCell
                        onUnassign={onUnassign}
                        commodityId={row.commodityId}
                        disabled={disabled}
                    />
                )
            } as MiniTableColumnType<CommodityModel>,
            ...columns
        ],
        [onUnassign, disabled]
    );

    const assignableColumns = useMemo(
        () => [
            {
                field     : 'assignableColumns',
                headerName: '',
                minWidth  : 30,
                flex_start: true,
                styles    : { padding: 0 },
                renderCell: (row) => (
                    <AssignCell
                        onAssign={onAssign}
                        commodityId={row.commodityId}
                        disabled={disabled}
                    />
                )
            } as MiniTableColumnType<CommodityModel>,
            ...columns
        ],
        [onAssign, disabled]
    );

    return (
        <Stack width="100%">
            <DialogComponents.SectionTitle
                startIcon={<VectorIcons.CubeTransparentIcon color="primary" />}
                title="entity:commodity"
                sx={{ mt: '12px' }}
            >
                <ManifestStopsTableActionsStyled.Button
                    startIcon={<VectorIcons.PlusIcon />}
                    variant="contained"
                    onClick={createCommodity}
                >
                    {t('common:button.add_item')}
                </ManifestStopsTableActionsStyled.Button>
            </DialogComponents.SectionTitle>

            <TableIndicator
                type="assigned"
                mt="12px"
                sx={{
                    textTransform: 'capitalize'
                }}
            >
                <VectorIcons.CircleArrowUpIcon />
                {t('state_info:stop.type.pickup')}
            </TableIndicator>
            <CommoditiesTable
                loadId={loadId}
                commodities={assignedCommodities}
                customColumns={assignedColumns}
                hideAddButton
            />

            <TableIndicator
                type="not_assigned"
                mt="8px"
            >
                <VectorIcons.CircleCrossIcon />
                {t('modals:manifests.stop.titles.not_assigned')}
            </TableIndicator>
            <CommoditiesTable
                loadId={loadId}
                commodities={assignableCommodities}
                customColumns={assignableColumns}
                emptyStateText="modals:manifests.stop.titles.no_unassigned_items"
                hideAddButton
            />
        </Stack>
    );
}
