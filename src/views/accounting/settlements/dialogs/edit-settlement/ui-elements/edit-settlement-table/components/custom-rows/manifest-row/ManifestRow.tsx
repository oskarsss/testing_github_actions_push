/* eslint-disable no-nested-ternary */
import SettlementsTypes from '@/store/accounting/settlements/types';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IconButton, Stack } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { useTheme } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import { SettlementsActions } from '@/store/accounting/settlements/slice';
import { MANIFEST_STATUS_GRPC_ENUM } from '@/models/manifests/mapping';
import ManifestDetailsTable from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/components/custom-rows/manifest-row/manifest-details-table/ManifestDetailsTable';
import { Column } from '../../../types';
import EditButton from '../../EditButton';

type Props = {
    row: SettlementsTypes.CycleSettlementDetails.Manifests;
    columns: Column[];
    onClickCell: (event: MouseEvent<HTMLTableCellElement>, column: Column, row: unknown) => void;
    executeAction: any;
    isDisabledEdit: boolean;
};

export default function ManifestRow({
    row,
    columns,
    onClickCell,
    executeAction,
    isDisabledEdit
}: Props) {
    const dispatch = useAppDispatch();
    const colorText = useTheme().palette.semantic.text;
    const isShowDriverPayItems = useAppSelector((state) =>
        state.settlements.edit_dialog.expand_driver_pay_columns.includes(row.manifestId));
    const handleShowDriverPayItems = () => {
        dispatch(SettlementsActions.SetEditDialogExpandDriverPayColumn(row.manifestId));
    };

    return (
        <>
            <MiniTableStyled.Row
                sx={{
                    height         : '34px',
                    backgroundColor: (theme) =>
                        MANIFEST_STATUS_GRPC_ENUM[row.status] === 'assigned' && row.settlementId
                            ? theme.palette.utility.foreground.warning.tertiary
                            : undefined
                }}
                key={row.manifestId}
                hover={!(MANIFEST_STATUS_GRPC_ENUM[row.status] === 'assigned' && row.settlementId)}
            >
                {columns.map((column) => {
                    if (column.field !== 'driver_pay') {
                        return (
                            <MiniTableStyled.Cell
                                key={column.field}
                                flex_start={column.flex_start}
                                padding="none"
                                sx={{
                                    ...(column?.cellStyles || {}),
                                    position    : 'relative',
                                    borderBottom: 0,
                                    '&:hover'   : {
                                        '& .EditSettlementEditButton': {
                                            display        : 'flex',
                                            justifyContent : 'center',
                                            visibility     : 'visible',
                                            transition     : '0.3s',
                                            justifyItems   : 'center',
                                            backgroundColor: (theme) =>
                                                theme.palette.semantic.background.white,
                                            padding: '4px'
                                        }
                                    }
                                }}
                                color={column.color ? colorText[column.color] : undefined}
                                onClick={(event) => onClickCell(event, column, row)}
                            >
                                {column.renderCell(row)}
                                {column.withEditButton && (
                                    <EditButton
                                        isDisabledEdit={isDisabledEdit}
                                        onClick={(event) =>
                                            executeAction('edit', {
                                                row,
                                                event
                                            })}
                                    />
                                )}
                            </MiniTableStyled.Cell>
                        );
                    }
                    return (
                        <MiniTableStyled.Cell
                            key={column.field}
                            flex_start={column.flex_start}
                            padding="none"
                            sx={{
                                ...(column?.cellStyles || {}),
                                borderBottom: 0
                            }}
                            color={column.color ? colorText[column.color] : undefined}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                gap="7px"
                            >
                                {column.renderCell(row)}
                                <IconButton
                                    onClick={handleShowDriverPayItems}
                                    sx={{ padding: 0 }}
                                >
                                    <KeyboardArrowUpIcon
                                        sx={{
                                            transition: 'transform 0.3s',
                                            transform : !isShowDriverPayItems
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)'
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                        </MiniTableStyled.Cell>
                    );
                })}
            </MiniTableStyled.Row>

            <MiniTableStyled.Row sx={{ height: 'auto !important' }}>
                <TableCell
                    sx={{ padding: '0px !important', borderBottom: 'none !important' }}
                    colSpan={columns.length}
                >
                    <Collapse
                        in={isShowDriverPayItems}
                        unmountOnExit
                    >
                        <ManifestDetailsTable row={row} />
                    </Collapse>
                </TableCell>
            </MiniTableStyled.Row>
        </>
    );
}
