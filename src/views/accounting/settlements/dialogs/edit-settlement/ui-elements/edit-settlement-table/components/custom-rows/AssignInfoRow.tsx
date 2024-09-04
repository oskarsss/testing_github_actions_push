/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { Stack, Typography, useTheme } from '@mui/material';
import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp';
import { useMemo, ReactNode } from 'react';
import TableRow from '@mui/material/TableRow';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { recurring_transaction_status_icon } from '@/@core/theme/entities/settlement/recurring_transactions_status';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { AssignedRow } from '../../EditSettlementTable.styled';
import { ColumnsConfig, GetInfoColumns } from '../../types';

export type AssignInfoProps = {
    isAssign: boolean;
    columns: ColumnsConfig['columns'];
    info_config: ReturnType<GetInfoColumns>;
    is_recurring_transaction?: boolean;
};

type TitleProps = {
    isAssign: boolean;
    assigned_icon: ReactNode;
    not_assigned_icon: ReactNode;
    assigned_text: string;
    not_assigned_text: string;
};

const Title = ({
    isAssign,
    assigned_icon,
    not_assigned_icon,
    assigned_text,
    not_assigned_text
}: TitleProps) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        height="23px"
    >
        {isAssign ? assigned_icon : not_assigned_icon}
        <Typography
            fontSize="12px"
            fontWeight={600}
            lineHeight="18px"
            color={isAssign ? '#039855' : 'semantic.text.secondary'}
        >
            {isAssign ? assigned_text : not_assigned_text}
        </Typography>
    </Stack>
);

export default function AssignInfoRow({
    isAssign,
    columns,
    info_config,
    is_recurring_transaction
}: AssignInfoProps) {
    const { t } = useAppTranslation('modals');
    const { palette } = useTheme();
    const cells = useMemo(
        () =>
            columns.map(() => ({
                text   : '',
                colSpan: 1,
                isCopy : false,
                isTitle: false
            })),
        [columns, info_config]
    );

    const renderedCells = useMemo(() => {
        if (cells.length === 0) {
            return [];
        }
        const lastExistedIndex = cells.findIndex((item) => item.text);
        if (lastExistedIndex === -1) {
            return [
                {
                    text   : isAssign ? t('assigned') : t('not_assigned'),
                    colSpan: cells.length,
                    isCopy : false,
                    isTitle: true
                }
            ];
        }
        return [
            {
                text   : isAssign ? t('assigned') : t('not_assigned'),
                colSpan: lastExistedIndex,
                isCopy : false,
                isTitle: true
            },
            ...cells.slice(lastExistedIndex)
        ];
    }, [cells, isAssign]);

    const assigned_icon = is_recurring_transaction ? (
        recurring_transaction_status_icon(16).active
    ) : (
        <CheckCircleSharpIcon
            sx={{
                color   : '#039855',
                fontSize: '16px'
            }}
        />
    );
    const not_assigned_icon = is_recurring_transaction ? (
        <WatchLaterSharpIcon
            sx={{
                color   : ({ palette }) => palette.semantic.foreground.primary,
                fontSize: '16px'
            }}
            fontSize="small"
        />
    ) : (
        <CancelSharpIcon
            sx={{
                color   : ({ palette }) => palette.semantic.foreground.primary,
                fontSize: '16px'
            }}
        />
    );
    const assigned_text = is_recurring_transaction
        ? t('settlements.edit_settlement.table.assign_info.active')
        : t('settlements.edit_settlement.table.assign_info.assigned');
    const not_assigned_text = is_recurring_transaction
        ? t('settlements.edit_settlement.table.assign_info.completed')
        : t('settlements.edit_settlement.table.assign_info.not_assigned');

    return (
        <AssignedRow>
            <TableRow>
                {renderedCells.map((cell, index) =>
                    cell.isTitle ? (
                        <MiniTableStyled.Cell
                            key={index}
                            colSpan={cell.colSpan}
                            sx={{
                                background: isAssign
                                    ? palette.utility.foreground.success.secondary
                                    : palette.semantic.foreground.secondary,
                                borderBottom: `1px solid ${
                                    isAssign
                                        ? palette.semantic.border.success.primary
                                        : palette.semantic.border.tertiary
                                } !important`
                            }}
                        >
                            <Title
                                isAssign={isAssign}
                                assigned_icon={assigned_icon}
                                not_assigned_icon={not_assigned_icon}
                                assigned_text={assigned_text}
                                not_assigned_text={not_assigned_text}
                            />
                        </MiniTableStyled.Cell>
                    ) : (
                        <MiniTableStyled.Cell
                            key={index}
                            colSpan={cell.colSpan}
                            flex_start
                            sx={{
                                borderBottom: `1px solid ${
                                    isAssign
                                        ? palette.semantic.border.success.primary
                                        : palette.semantic.border.tertiary
                                } !important`
                            }}
                        >
                            <Typography
                                fontSize="12px"
                                fontWeight={600}
                                lineHeight="18px"
                                color="semantic.text.secondary"
                            >
                                {cell.text}
                            </Typography>
                        </MiniTableStyled.Cell>
                    ))}
            </TableRow>
        </AssignedRow>
    );
}
