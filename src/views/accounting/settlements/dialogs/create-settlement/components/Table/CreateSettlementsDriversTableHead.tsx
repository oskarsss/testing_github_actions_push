/* eslint-disable max-len */

import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import { CreateSettlementsColumn } from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/generateColumns';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import VectorIcons from '@/@core/icons/vector_icons';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    selected: DriversTypes.ConvertedDriverRow[];
    drivers: DriversTypes.ConvertedDriverRow[];
    setSelected: React.Dispatch<React.SetStateAction<DriversTypes.ConvertedDriverRow[]>>;
    columns: CreateSettlementsColumn[];
};

export default function CreateSettlementsDriversTableHead({
    selected,
    drivers,
    setSelected,
    columns
}: Props) {
    const { t } = useAppTranslation();
    return (
        <MiniTableStyled.HeaderRow without_border>
            <TableRow sx={{ borderLeft: '0 !important', borderRight: '0 !important' }}>
                <MiniTableStyled.HeaderCell
                    align="left"
                    fontSize="large"
                    padding="checkbox"
                    min_width="40px"
                    max_width="40px"
                    height={33}
                    sx={{
                        padding        : '0px 12px !important',
                        backgroundColor: (theme) =>
                            selected.length > 0
                                ? theme.palette.semantic.foreground.brand.secondary
                                : undefined,
                        borderBottom: (theme) =>
                            `1px solid ${
                                selected.length > 0
                                    ? theme.palette.semantic.foreground.brand.primary
                                    : theme.palette.semantic.border.secondary
                            }`,
                        borderTop:
                            selected.length > 0
                                ? undefined
                                : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`
                    }}
                >
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < drivers.length}
                        checked={selected.length > 0 && selected.length === drivers.length}
                        onChange={(_, checked) => {
                            setSelected(checked ? drivers : []);
                        }}
                    />
                </MiniTableStyled.HeaderCell>

                {selected.length === 0 ? (
                    columns.map((column) => (
                        <MiniTableStyled.HeaderCell
                            fontSize="large"
                            style={column.styles ?? {}}
                            key={column.field}
                            size="small"
                            padding="normal"
                            min_width={column.minWidth}
                            max_width={column.maxWidth}
                            height={33}
                            is_text_align_left={column.flex_start}
                            sx={{
                                borderBottom: (theme) =>
                                    `1px solid ${theme.palette.semantic.border.secondary}`,
                                borderTop: (theme) =>
                                    `1px solid ${theme.palette.semantic.border.secondary}`
                            }}
                        >
                            {typeof column.headerName === 'string'
                                ? t(column.headerName)
                                : column.headerName}
                        </MiniTableStyled.HeaderCell>
                    ))
                ) : (
                    <MiniTableStyled.HeaderCell
                        align="right"
                        size="small"
                        padding="checkbox"
                        height={33}
                        colSpan={columns.length}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.semantic.foreground.brand.secondary,
                            borderBottom: (theme) =>
                                `1px solid ${theme.palette.semantic.foreground.brand.primary}`
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            height="100%"
                        >
                            <Typography
                                fontWeight={700}
                                fontSize="12px"
                                lineHeight={1}
                                textTransform="uppercase"
                                color="semantic.foreground.brand.primary"
                            >
                                {t('common:selected', {
                                    count: selected.length
                                })}
                            </Typography>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                    setSelected([]);
                                }}
                            >
                                <VectorIcons.TrashIcon
                                    color="primary"
                                    sx={{ fontSize: '16px' }}
                                />
                            </IconButton>
                        </Stack>
                    </MiniTableStyled.HeaderCell>
                )}
            </TableRow>
        </MiniTableStyled.HeaderRow>
    );
}
