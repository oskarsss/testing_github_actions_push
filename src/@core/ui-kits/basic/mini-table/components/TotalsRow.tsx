/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import CopyText from '@/@core/components/copy-text/CopyText';
import { Typography, useTheme } from '@mui/material';
import { ReactNode, useCallback, useMemo } from 'react';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { MiniTableColumnType, Cells } from '../MiniTable.types';

type Props = {
    columns: MiniTableColumnType[];
    info_config: Record<string, string | ReactNode>;
    without_border?: boolean;
    fontSize?: 'large' | 'medium';
    testID?: string;
};

export default function TotalsRow({
    columns,
    info_config,
    without_border,
    fontSize,
    testID = ''
}: Props) {
    const { palette } = useTheme();
    const { t } = useAppTranslation('core');
    const cells = useMemo(
        () =>
            columns.reduce((acc: Cells, column) => {
                if (info_config[column.field] && typeof info_config[column.field] === 'string') {
                    acc.push({
                        text   : `${info_config[column.field]}`,
                        colSpan: 1,
                        isCopy : true,
                        isTitle: false,
                        styles : column.styles
                    });
                } else if (
                    info_config[column.field] &&
                    typeof info_config[column.field] === 'object'
                ) {
                    acc.push({
                        text      : '',
                        colSpan   : 1,
                        isCopy    : false,
                        isTitle   : false,
                        flex_start: column.flex_start,
                        component : info_config[column.field]
                    });
                } else {
                    acc.push({
                        text   : '',
                        colSpan: 1,
                        isCopy : false,
                        isTitle: false
                    });
                }
                return acc;
            }, []),
        [columns, info_config]
    );

    const getSubstringAfterDollarSign = useCallback((string: string) => {
        const dollarIndex = string.indexOf('$');
        return string.substring(dollarIndex);
    }, []);

    return (
        <MiniTableStyled.Row
            tabIndex={-1}
            without_border={without_border}
            row_size="small"
            sx={{ height: 26 }}
        >
            {cells.length > 0 &&
                cells.map((cell, index) => (
                    <MiniTableStyled.Cell
                        key={index}
                        colSpan={cell.colSpan}
                        flex_start={cell.flex_start}
                        sx={{
                            ...(cell.styles && { ...cell.styles }),
                            borderBottom: 'none !important',
                            ...(cell.isCopy && {
                                background  : palette.semantic.border.primary,
                                borderBottom: `1px solid  ${palette.semantic.border.tertiary} !important`
                            })
                        }}
                        {...applyTestId(testID)}
                    >
                        {cell.isCopy ? (
                            <CopyText text={getSubstringAfterDollarSign(cell.text)}>
                                <Typography
                                    fontSize={fontSize === 'large' ? '14px' : '12px'}
                                    lineHeight="18px"
                                    fontWeight={500}
                                    color="semantic.text.secondary"
                                    sx={{ width: '100%' }}
                                >
                                    {`${t('basic.mini_table.total')}: `}
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        fontSize={fontSize === 'large' ? '14px' : '12px'}
                                        color="semantic.text.primary"
                                        width="min-content"
                                        fontWeight={500}
                                    >
                                        {cell.text}
                                    </Typography>
                                </Typography>
                            </CopyText>
                        ) : !cell.isCopy && cell.component ? (
                            cell.component
                        ) : (
                            <Typography
                                fontSize={fontSize === 'large' ? '14px' : '12px'}
                                fontWeight={600}
                                lineHeight="18px"
                                color="semantic.text.secondary"
                            >
                                {cell.text}
                            </Typography>
                        )}
                    </MiniTableStyled.Cell>
                ))}
        </MiniTableStyled.Row>
    );
}
