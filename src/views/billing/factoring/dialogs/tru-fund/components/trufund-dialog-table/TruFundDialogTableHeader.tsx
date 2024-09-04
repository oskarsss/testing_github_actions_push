import TableRow from '@mui/material/TableRow';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import { Typography } from '@mui/material';
import React from 'react';
import { TruFundInvoice } from '@/views/billing/factoring/dialogs/tru-fund/helpers';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import columns from './columns';

type Props = {
    selected: TruFundInvoice[];
    setSelected: (selected: TruFundInvoice[]) => void;
    invoices: TruFundInvoice[];
};

export default function TruFundDialogTableHeader({
    selected,
    invoices,
    setSelected
}: Props) {
    const { t } = useAppTranslation();
    const headerCheckboxIndeterminate = selected.length > 0 && selected.length < invoices.length;
    const headerCheckboxChecked = selected.length > 0 && selected.length === invoices.length;

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
                        disabled={invoices.length === 0}
                        indeterminate={headerCheckboxIndeterminate}
                        checked={headerCheckboxChecked}
                        onChange={(_, checked) => {
                            setSelected(checked ? invoices : []);
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
                        <Typography
                            fontWeight={700}
                            fontSize="12px"
                            lineHeight={1}
                            textTransform="uppercase"
                            color="semantic.text.brand.primary"
                        >
                            {t('billing:dialogs.selected', { count: selected.length })}
                        </Typography>
                    </MiniTableStyled.HeaderCell>
                )}
            </TableRow>
        </MiniTableStyled.HeaderRow>
    );
}
